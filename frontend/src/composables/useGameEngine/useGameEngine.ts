import { onBeforeUnmount, onMounted, reactive, ref, watch, type Ref } from "vue";
import { Sprite } from "../../classes/Sprite";
import { canvasBackgroundConfig } from "../../config/canvasBackground";
import { shopCofnig } from "../../config/shop";
import { Fighter } from "../../classes/Fighter";
import { getPlayerConfig } from "../../config/player";
import { getEnemyConfig } from "../../config/enemy";
import { canvasConfig } from "../../config/canvas";
import type { KeyState } from "./types/KeyState";
import { GameMode } from "./types/GameMode";
import { handleAttackCollision } from "./utils/attack";
import { handlePlayerMovement } from "./utils/movement";
import { createAIDecisionEngine } from "./utils/createAIDecisionEngine";
import { useWebSocketStore } from "../../store/websocket";
import type { RoomDetails } from "../../type/roomDetails";

export function useGameEngine(
   gameMode: GameMode,
   roomDetails?: Ref<RoomDetails | null, RoomDetails | null>,
) {
   const webSocketStore = useWebSocketStore();

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
      const handleMovements = () => {
         if (gameMode === GameMode.ONLINE_MULTIPLAYER) {
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
         }

         if (gameMode === GameMode.LOCAL_MULTIPLAYER) {
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
         }

         if (gameMode === GameMode.SINGLE_PLAYER) {
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

            frame++;
            update(frame);
         }
      };

      const handleAttacks = () => {
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

      const canvasContext = canvas.getContext("2d")!;

      animationId = requestAnimationFrame(() => animate({ canvas }));

      background.update(canvasContext);
      shop.update(canvasContext);
      player_1.update(canvasContext);
      player_2.update(canvasContext);

      handleMovements();
      handleAttacks();
   };

   const isKeyDisabled = (code: string): boolean => {
      if (gameMode !== GameMode.ONLINE_MULTIPLAYER) return false;
      if (!roomDetails?.value) return false;

      const { fighter } = roomDetails.value;

      const player1Keys = ["KeyA", "KeyD", "KeyW", "KeyS", "Space"];
      const player2Keys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter"];

      if (fighter === "player_2" && player1Keys.includes(code)) return true;
      if (fighter === "player_1" && player2Keys.includes(code)) return true;

      return false;
   };

   const onKeyDown = (event: KeyboardEvent) => {
      const disabled = isKeyDisabled(event.code);
      if (disabled) return;

      handleKeyDownEvent(event.code);

      if (!roomDetails?.value) return;

      webSocketStore.send({
         type: "key_event",
         key: event.code,
         room_id: roomDetails.value.roomId,
         user_id: roomDetails.value.userId,
         pressed: true,
      });
   };

   const onKeyUp = (event: KeyboardEvent) => {
      const disabled = isKeyDisabled(event.code);
      if (disabled) return;

      handleKeyUpEvent(event.code);

      if (!roomDetails?.value) return;

      webSocketStore.send({
         type: "key_event",
         key: event.code,
         room_id: roomDetails.value.roomId,
         user_id: roomDetails.value.userId,
         pressed: false,
      });
   };

   const handleKeyDownEvent = (keyCode: string) => {
      const handlePlayer1KeyDownEvent = (keyCode: string) => {
         if (player_1.dead) return;

         switch (keyCode) {
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
      };

      const handlePlayer2KeyDownEvent = (keyCode: string) => {
         if (player_2.dead) return;

         switch (keyCode) {
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
      };

      handlePlayer1KeyDownEvent(keyCode);
      handlePlayer2KeyDownEvent(keyCode);
   };

   const handleKeyUpEvent = (keyCode: string) => {
      const handlePlayer1KeyUpEvent = (keyCode: string) => {
         switch (keyCode) {
            case "KeyD":
               keysState.d.pressed = false;
               break;
            case "KeyA":
               keysState.a.pressed = false;
               break;
         }
      };

      const handlePlayer2KeyUpEvent = (keyCode: string) => {
         switch (keyCode) {
            case "ArrowRight":
               keysState.ArrowRight.pressed = false;
               break;
            case "ArrowLeft":
               keysState.ArrowLeft.pressed = false;
               break;
         }
      };

      handlePlayer1KeyUpEvent(keyCode);
      handlePlayer2KeyUpEvent(keyCode);
   };

   const handleSocketKeyEventMessage = (event: MessageEvent<any>) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "opponent_key_event") {
         if (msg.pressed) {
            handleKeyDownEvent(msg.key);
         } else {
            handleKeyUpEvent(msg.key);
         }
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

   onMounted(() => {
      if (gameMode !== GameMode.ONLINE_MULTIPLAYER) return;

      webSocketStore.socket?.addEventListener("message", event => {
         handleSocketKeyEventMessage(event);
      });
   });

   onBeforeUnmount(() => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);

      if (gameMode !== GameMode.ONLINE_MULTIPLAYER) return;

      webSocketStore.socket?.removeEventListener("message", event => {
         handleSocketKeyEventMessage(event);
      });
   });

   return { canvasEl, background, shop, player_1, player_2, keysState };
}
