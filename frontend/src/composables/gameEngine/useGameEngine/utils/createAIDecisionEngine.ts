import type { Fighter } from "../../../../classes/Fighter";
import { isHitDetected } from "./attack";

// const jumpChance = 0.75;
const reaction = 12;

export const createAIDecisionEngine = (player: Fighter, enemy: Fighter) => {
   let frame = 0;

   function update(frame: number) {
      const playerIsLeft = player.position.x < enemy.position.x;
      const attackChance = Math.random() < 0.1;
      const isTakingHit = enemy.image === enemy.sprites.takeHit.image && enemy.framesCurrent <= 3;

      const isAttackWouldHit = isHitDetected({
         rectangle1: enemy.attackBox,
         rectangle2: {
            position: player.position,
            width: player.width,
            height: player.height,
         },
      });

      if (frame % reaction !== 0 || enemy.dead) return;

      if (!isAttackWouldHit) {
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

      //   if (Math.random() < jumpChance) {
      //      enemy.velocity.y = -20;
      //   }

      if (isAttackWouldHit && attackChance && !isTakingHit) {
         enemy.attack();
         enemy.velocity.x = 0;
      }
   }

   return { update, frame };
};
