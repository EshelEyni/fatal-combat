import type { Fighter } from "../../../../classes/Fighter";

interface AttackBox {
   position: { x: number; y: number };
   width: number;
   height: number;
}

export const handleAttackCollision = ({
   attacker,
   defender,
   hitFrame,
}: {
   attacker: Fighter;
   defender: Fighter;
   hitFrame: number;
}) => {
   const hit = isHitDetected({
      rectangle1: attacker.attackBox,
      rectangle2: {
         position: defender.position,
         width: defender.width,
         height: defender.height,
      },
   });

   if (hit && attacker.isAttacking && attacker.framesCurrent === hitFrame) {
      defender.takeHit();
      attacker.isAttacking = false;
   }

   // reset miss
   if (attacker.isAttacking && attacker.framesCurrent === hitFrame) {
      attacker.isAttacking = false;
   }
};

export function isHitDetected({
   rectangle1,
   rectangle2,
}: {
   rectangle1: AttackBox;
   rectangle2: AttackBox;
}): boolean {
   const isRightSideTouching = rectangle1.position.x + rectangle1.width >= rectangle2.position.x;

   const isLeftSideTouching = rectangle1.position.x <= rectangle2.position.x + rectangle2.width;

   const isBottomSideTouching = rectangle1.position.y + rectangle1.height >= rectangle2.position.y;

   const isTopSideTouching = rectangle1.position.y <= rectangle2.position.y + rectangle2.height;

   return isRightSideTouching && isLeftSideTouching && isBottomSideTouching && isTopSideTouching;
}
