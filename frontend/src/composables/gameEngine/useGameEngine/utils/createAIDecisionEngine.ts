import type { Fighter } from "../../../../classes/Fighter";

export const createAIDecisionEngine = (player: Fighter, enemy: Fighter) => {
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
};
