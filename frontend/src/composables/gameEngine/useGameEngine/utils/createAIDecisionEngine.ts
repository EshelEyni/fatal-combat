import type { Fighter } from "../../../../classes/Fighter";

const attackDistance = 80;
const jumpChance = 0.1;
const reaction = 12;

export const createAIDecisionEngine = (player: Fighter, enemy: Fighter) => {
   let frame = 0;

   function update(frame: number) {
      const distance = Math.abs(player.position.x - enemy.position.x);
      const playerIsLeft = player.position.x < enemy.position.x;

      const shouldMove = distance > attackDistance;

      if (frame % reaction !== 0) return;

      if (shouldMove) {
         if (playerIsLeft) {
            enemy.velocity.x = -8;
            enemy.switchSprite("run");
         } else {
            enemy.velocity.x = 8;
            enemy.switchSprite("run");
         }
      } else {
         enemy.velocity.x = 0;
         enemy.switchSprite("idle");
      }

      if (Math.random() < jumpChance) {
         enemy.velocity.y = -20;
      }

      if (!shouldMove) {
         enemy.attack();
         enemy.velocity.x = 0;
      }
   }

   return { update, frame };
};
