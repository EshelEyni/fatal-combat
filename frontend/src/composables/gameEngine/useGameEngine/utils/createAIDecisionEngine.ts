import type { Fighter } from "../../../../classes/Fighter";

const reaction = 30;

type CreateAIDecisionEngineParams = { userFighter: Fighter; cpuFighter: Fighter };

export const createAIDecisionEngine = ({
   userFighter,
   cpuFighter,
}: CreateAIDecisionEngineParams) => {
   let frame = 0;

   function update(frame: number) {
      const attackChance = Math.random() < 0.1;
      const isTakingHit =
         cpuFighter.image === cpuFighter.sprites.takeHit.image && cpuFighter.framesCurrent <= 2;

      const playerIsLeft = userFighter.position.x < cpuFighter.position.x;
      const distance = Math.abs(userFighter.position.x - cpuFighter.position.x);
      const deadzone = cpuFighter.attackBox.width * 0.8;
      const enemyIsInAttackRange = deadzone - distance >= 0;

      if (frame % reaction !== 0 || cpuFighter.dead) return;

      if (!enemyIsInAttackRange) {
         cpuFighter.velocity.x = playerIsLeft ? -8 : 8;
         cpuFighter.switchSprite("run");
      } else {
         cpuFighter.velocity.x = 0;
         cpuFighter.switchSprite("idle");
      }

      if (enemyIsInAttackRange && attackChance && !isTakingHit) {
         cpuFighter.attack();
         cpuFighter.velocity.x = 0;
      }
   }

   return { update, frame };
};
