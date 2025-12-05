import type { AnimateConfig } from "../types/AnimateConfig";
import { handleAttackCollision } from "./attack";
import { handlePlayerMovement } from "./movement";

export const animateLocalMultiplayer = (config: AnimateConfig) => {
   const canvasContext = config.canvas.getContext("2d")!;

   config.animationId = requestAnimationFrame(() => animateLocalMultiplayer(config));

   const { keysState, background, shop, player_1, player_2 } = config;
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
