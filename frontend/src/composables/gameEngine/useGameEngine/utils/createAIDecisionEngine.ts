import type { Fighter } from "../../../../classes/Fighter";
import { isHitDetected } from "./attack";

// const jumpChance = 0.75;
const reaction = 12;

type CreateAIDecisionEngineParams = { userFighter: Fighter; cpuFighter: Fighter };

export const createAIDecisionEngine = ({
   userFighter,
   cpuFighter,
}: CreateAIDecisionEngineParams) => {
   let frame = 0;

   function update(frame: number) {
      const playerIsLeft = userFighter.position.x < cpuFighter.position.x;
      const attackChance = Math.random() < 0.1;
      const isTakingHit =
         cpuFighter.image === cpuFighter.sprites.takeHit.image && cpuFighter.framesCurrent <= 2;

      const isAttackWouldHit = isHitDetected({
         rectangle1: cpuFighter.attackBox,
         rectangle2: {
            position: userFighter.position,
            width: userFighter.width,
            height: userFighter.height,
         },
      });

      if (frame % reaction !== 0 || cpuFighter.dead) return;

      if (!isAttackWouldHit) {
         if (playerIsLeft) {
            cpuFighter.velocity.x = -8;
            cpuFighter.switchSprite("run");
         } else {
            cpuFighter.velocity.x = 8;
            cpuFighter.switchSprite("run");
         }
      } else {
         cpuFighter.velocity.x = 0;
         cpuFighter.switchSprite("idle");
      }

      //   if (Math.random() < jumpChance) {
      //      enemy.velocity.y = -20;
      //   }

      if (isAttackWouldHit && attackChance && !isTakingHit) {
         cpuFighter.attack();
         cpuFighter.velocity.x = 0;
      }
   }

   return { update, frame };
};
