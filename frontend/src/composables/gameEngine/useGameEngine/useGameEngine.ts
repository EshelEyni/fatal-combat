import { onBeforeUnmount, reactive, ref, watch } from "vue";
import { Sprite } from "../../../classes/Sprite";
import { canvasBackgroundConfig } from "../../../config/canvasBackground";
import { shopCofnig } from "../../../config/shop";
import { Fighter } from "../../../classes/Fighter";
import { getPlayerConfig } from "../../../config/player";
import { getEnemyConfig } from "../../../config/enemy";
import { canvasConfig } from "../../../config/canvas";
import type { KeyState } from "./types/KeyState";
import { GameMode } from "./types/GameMode";
import { handleAttackCollision } from "./utils/attack";
import { handlePlayerMovement } from "./utils/movement";
import { createAIDecisionEngine } from "./utils/createAIDecisionEngine";

export function useGameEngine(gameMode: GameMode) {
   const canvasEl = ref<HTMLCanvasElement | null>(null);
   let animationId = 0;

   const keysState: KeyState = reactive({
      a: { pressed: false },
      d: { pressed: false },
      ArrowRight: { pressed: false },
      ArrowLeft: { pressed: false },
   });

   const background = new Sprite(canvasBackgroundConfig);
   const shop = new Sprite(shopCofnig);
   const player_1 = reactive(new Fighter(getPlayerConfig()));
   const player_2 = reactive(new Fighter(getEnemyConfig()));

   let frame = 0;
   const { update } = createAIDecisionEngine({
      userFighter: player_1,
      cpuFighter: player_2,
   });

   const animate = ({ canvas }: { canvas: HTMLCanvasElement }) => {
      const canvasContext = canvas.getContext("2d")!;

      animationId = requestAnimationFrame(() => animate({ canvas }));

      background.update(canvasContext);
      shop.update(canvasContext);
      player_1.update(canvasContext);
      player_2.update(canvasContext);

      handlePlayerMovement(player_1, {
         left: {
            pressed: keysState.a.pressed,
            keyCode: "KeyA",
         },
         right: {
            pressed: keysState.d.pressed,
            keyCode: "KeyD",
         },
      });

      if (gameMode === GameMode.LOCAL_MULTIPLAYER) {
         handlePlayerMovement(player_2, {
            left: {
               pressed: keysState.ArrowLeft.pressed,
               keyCode: "ArrowLeft",
            },
            right: {
               pressed: keysState.ArrowRight.pressed,
               keyCode: "ArrowRight",
            },
         });
      } else if (gameMode === GameMode.SINGLE_PLAYER) {
         frame++;
         update(frame);
      }

      // attacks
      handleAttackCollision({
         attacker: player_1,
         defender: player_2,
         hitFrame: 4,
      });

      handleAttackCollision({
         attacker: player_2,
         defender: player_1,
         hitFrame: 2,
      });
   };

   const onKeyDown = (event: KeyboardEvent) => {
      if (!player_1.dead) {
         switch (event.code) {
            case "KeyD":
               keysState.d.pressed = true;
               player_1.lastKey = "KeyD";
               break;
            case "KeyA":
               keysState.a.pressed = true;
               player_1.lastKey = "KeyA";
               break;
            case "KeyW":
               player_1.velocity.y = -20;
               break;
            case "KeyS":
               player_1.velocity.y = 20;
               break;
            case "Space":
               player_1.attack();
               break;
         }
      }

      if (!player_2.dead) {
         switch (event.code) {
            case "ArrowRight":
               keysState.ArrowRight.pressed = true;
               player_2.lastKey = "ArrowRight";
               break;
            case "ArrowLeft":
               keysState.ArrowLeft.pressed = true;
               player_2.lastKey = "ArrowLeft";
               break;
            case "ArrowUp":
               player_2.velocity.y = -20;
               break;
            case "ArrowDown":
               player_2.velocity.y = 20;
               break;
            case "Enter":
               player_2.attack();

               break;
         }
      }
   };

   const onKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
         case "KeyD":
            keysState.d.pressed = false;
            break;
         case "KeyA":
            keysState.a.pressed = false;
            break;
      }

      // enemy keys
      switch (event.code) {
         case "ArrowRight":
            keysState.ArrowRight.pressed = false;
            break;
         case "ArrowLeft":
            keysState.ArrowLeft.pressed = false;
            break;
      }
   };

   watch(canvasEl, canvas => {
      if (!canvas) return;
      canvas.width = canvasConfig.width;
      canvas.height = canvasConfig.height;

      animate({ canvas });
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("keyup", onKeyUp);
   });

   onBeforeUnmount(() => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
   });

   return { canvasEl, background, shop, player_1, player_2, keysState };
}
