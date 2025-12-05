import type { Fighter } from "../../../../classes/Fighter";
import type { AnimateConfig } from "../types/AnimateConfig";
import { handleAttackCollision } from "./attack";
import { handlePlayerMovement } from "./movement";

const animate = (config: AnimateConfig) => {
   const canvasContext = config.canvas.getContext("2d")!;

   config.animationId = requestAnimationFrame(() => animate(config));

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

function useAIController(player: Fighter, enemy: Fighter) {
   let frame = 0;
   let lastDecisionFrame = 0;

   // settings (tweak later)
   const attackDistance = 80;
   const retreatChance = 0.1;
   const jumpChance = 0.02;
   const attackChance = 0.15;

   function update(frame: number, keysState: any) {
      // Make a decision every X frames (AI reaction speed)
      const reaction = 6;
      if (frame - lastDecisionFrame < reaction) return;
      lastDecisionFrame = frame;

      // Reset keys
      keysState.ArrowLeft.pressed = false;
      keysState.ArrowRight.pressed = false;

      const distance = Math.abs(player.position.x - enemy.position.x);
      const playerIsLeft = player.position.x < enemy.position.x;

      // 1) movement: approach until near
      if (distance > attackDistance) {
         if (playerIsLeft) {
            enemy.velocity.x = -2;
         } else {
            enemy.velocity.x = 2;
         }
      }

      // 2) sometimes retreat
      if (Math.random() < retreatChance) {
         if (playerIsLeft) keysState.ArrowRight.pressed = true;
         else keysState.ArrowLeft.pressed = true;
         return; // retreat overrides attack
      }

      // 3) sometimes jump
      if (Math.random() < jumpChance) {
         enemy.velocity.y = -20;
      }

      // 4) if close enough, maybe attack
      if (distance <= attackDistance && Math.random() < attackChance) {
         enemy.attack();
      }
   }

   return { update, frame };
}

// let frame = 0;
// const ai = useAIController(player_1, player_2);

// const animateWithAI = ({ canvas }: { canvas: HTMLCanvasElement }) => {
//    const ctx = canvas.getContext("2d")!;
//    frame++;

//    animationId = requestAnimationFrame(() => animateWithAI({ canvas }));

//    background.update(ctx);
//    shop.update(ctx);
//    player_1.update(ctx);
//    player_2.update(ctx);

//    // HUMAN movement

//    handlePlayerMovement(player_1, {
//       left: {
//          pressed: keysState.a.pressed,
//          keyCode: "KeyA",
//       },
//       right: {
//          pressed: keysState.d.pressed,
//          keyCode: "KeyD",
//       },
//    });

//    // AI replaces human input for player_2
//    ai.update(frame, keysState);

//    // handlePlayerMovement(player_2, {
//    //   left: {
//    //     pressed: keysState.ArrowLeft.pressed,
//    //     keyCode: "ArrowLeft",
//    //   },
//    //   right: {
//    //     pressed: keysState.ArrowRight.pressed,
//    //     keyCode: "ArrowRight",
//    //   },
//    // });

//    // attacks
//    handleAttackCollision({ attacker: player_1, defender: player_2, hitFrame: 4 });
//    handleAttackCollision({ attacker: player_2, defender: player_1, hitFrame: 2 });
// };
