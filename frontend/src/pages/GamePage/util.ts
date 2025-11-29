// src/game/pureUtils.ts
export type Winner = "player" | "enemy" | "tie";

interface AttackBox {
  position: { x: number; y: number };
  width: number;
  height: number;
}

export function pickWinner(playerHealth: number, enemyHealth: number): Winner {
  if (playerHealth === enemyHealth) return "tie";
  return playerHealth > enemyHealth ? "player" : "enemy";
}

export function createTimer(
  seconds: number,
  onTick: (s: number) => void,
  onDone: () => void
) {
  let current = seconds;
  let id: number | null = null;

  const tick = () => {
    if (current > 0) {
      id = window.setTimeout(tick, 1000);
      current -= 1;
      onTick(current);
      if (current === 0) onDone();
    }
  };

  return {
    start() {
      if (id != null) return;
      onTick(current);
      id = window.setTimeout(tick, 1000);
    },
    stop() {
      if (id != null) clearTimeout(id);
      id = null;
    },
    get value() {
      return current;
    },
  };
}

export function didAttackHit({
  rectangle1,
  rectangle2,
}: {
  rectangle1: AttackBox;
  rectangle2: AttackBox;
}): boolean {
  const isRightSideTouching =
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x;

  const isLeftSideTouching =
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width;

  const isBottomSideTouching =
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y;

  const isTopSideTouching =
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height;

  return (
    isRightSideTouching &&
    isLeftSideTouching &&
    isBottomSideTouching &&
    isTopSideTouching
  );
}
