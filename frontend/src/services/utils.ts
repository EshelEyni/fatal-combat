interface AttackBox {
  position: { x: number; y: number };
  width: number;
  height: number;
}

interface FighterLike {
  position: { x: number; y: number };
  width: number;
  height: number;
  attackBox: AttackBox;
  health: number;
}

export function rectangularCollision({
  rectangle1,
  rectangle2,
}: {
  rectangle1: FighterLike;
  rectangle2: FighterLike;
}): boolean {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

export function determineWinner({
  player,
  enemy,
  timerId,
}: {
  player: FighterLike;
  enemy: FighterLike;
  timerId: number;
}) {
  clearTimeout(timerId);

  const displayText = document.querySelector("#displayText") as HTMLElement;
  if (!displayText) return;

  displayText.style.display = "flex";

  if (player.health === enemy.health) {
    displayText.innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    displayText.innerHTML = "Player 1 Wins";
  } else {
    displayText.innerHTML = "Player 2 Wins";
  }
}

let timer = 60;
let timerId: number;

export function decreaseTimer(player: FighterLike, enemy: FighterLike) {
  const timerEl = document.querySelector("#timer") as HTMLElement;
  if (!timerEl) return;

  if (timer > 0) {
    timerId = window.setTimeout(() => decreaseTimer(player, enemy), 1000);
    timer--;
    timerEl.innerHTML = String(timer);
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId });
  }
}
