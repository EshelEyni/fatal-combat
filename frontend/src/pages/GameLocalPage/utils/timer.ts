// src/game/pureUtils.ts
export type Winner = "player_1" | "player_2" | "tie";

export function pickWinner(playerHealth: number, enemyHealth: number): Winner {
  if (playerHealth === enemyHealth) return "tie";
  return playerHealth > enemyHealth ? "player_1" : "player_2";
}

export function createTimer({
  seconds,
  onTick,
  onDone,
}: {
  seconds: number;
  onTick: (s: number) => void;
  onDone: () => void;
}) {
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
