import type { Fighter } from "../../../../classes/Fighter";

type KeyState = { pressed: boolean; keyCode: string };

const handleHorizontalMovement = (
  player: Fighter,
  keys: { left: KeyState; right: KeyState }
) => {
  if (keys.left.pressed && player.lastKey === keys.left.keyCode) {
    player.velocity.x = -8;
    player.switchSprite("run");
  } else if (keys.right.pressed && player.lastKey === keys.right.keyCode) {
    player.velocity.x = 8;
    player.switchSprite("run");
  } else {
    player.velocity.x = 0;
    player.switchSprite("idle");
  }
};

const handleVerticalMovement = (player: Fighter) => {
  if (player.velocity.y < 0) player.switchSprite("jump");
  else if (player.velocity.y > 0) player.switchSprite("fall");
};

export const handlePlayerMovement = (
  player: Fighter,
  keys: { left: KeyState; right: KeyState }
) => {
  handleHorizontalMovement(player, keys);
  handleVerticalMovement(player);
};
