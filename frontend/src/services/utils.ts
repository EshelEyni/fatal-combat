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
export let timerId: number;

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
