import { onBeforeUnmount, ref, watch } from "vue";
import { didAttackHit } from "./util";
import { Sprite } from "../../classes/Sprite";
import { canvasBackgroundConfig } from "../../config/canvasBackground";
import { shopCofnig } from "../../config/shop";
import { Fighter } from "../../classes/Fighter";
import { playerConfig } from "../../config/player";
import { enemyConfig } from "../../config/enemy";
import { canvasConfig } from "../../config/canvas";

type KeyState = { pressed: boolean };

export function useGameEngine() {
  const canvasEl = ref<HTMLCanvasElement | null>(null);
  let animationId = 0;

  const keysState = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
  };

  const background = new Sprite(canvasBackgroundConfig);
  const shop = new Sprite(shopCofnig);
  const player_1 = new Fighter(playerConfig);
  const player_2 = new Fighter(enemyConfig);

  const animate = ({ canvas }: { canvas: HTMLCanvasElement }) => {
    const canvasContext = canvas.getContext("2d")!;

    animationId = requestAnimationFrame(() => animate({ canvas }));

    background.update(canvasContext);
    shop.update(canvasContext);
    player_1.update(canvasContext);
    player_2.update(canvasContext);

    // movement
    handleHorizontalMovement(
      player_1,
      { left: keysState.a, right: keysState.d },
      "KeyA",
      "KeyD"
    );
    handleVerticalMovement(player_1);

    handleHorizontalMovement(
      player_2,
      { left: keysState.ArrowLeft, right: keysState.ArrowRight },
      "ArrowLeft",
      "ArrowRight"
    );
    handleVerticalMovement(player_2);

    // attacks
    handleAttackCollision(player_1, player_2, 4);
    handleAttackCollision(player_2, player_1, 2);
  };

  const handleHorizontalMovement = (
    player: Fighter,
    keys: { left: KeyState; right: KeyState },
    lastLeft: string,
    lastRight: string
  ) => {
    if (keys.left.pressed && player.lastKey === lastLeft) {
      player.velocity.x = -8;
      player.switchSprite("run");
    } else if (keys.right.pressed && player.lastKey === lastRight) {
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

  const handleAttackCollision = (
    attacker: Fighter,
    defender: Fighter,
    hitFrame: number
  ) => {
    const hit = didAttackHit({
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

  const onKeyDown = (event: KeyboardEvent) => {
    console.log(event.code);

    if (!player_1.dead) {
      switch (event.code) {
        case "KeyD":
          keysState.d.pressed = true;
          player_1.lastKey = "KeyD";
          break;
        case "KeyA":
          keysState.a.pressed = true;
          player_1.lastKey = "KeyA";
          break;
        case "KeyW":
          player_1.velocity.y = -20;
          break;
        case "Space":
          player_1.attack();
          break;
      }
    }

    if (!player_2.dead) {
      switch (event.code) {
        case "ArrowRight":
          keysState.ArrowRight.pressed = true;
          player_2.lastKey = "ArrowRight";
          break;
        case "ArrowLeft":
          keysState.ArrowLeft.pressed = true;
          player_2.lastKey = "ArrowLeft";
          break;
        case "ArrowUp":
          player_2.velocity.y = -20;
          break;
        case "Enter":
          player_2.attack();

          break;
      }
    }
  };

  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "d":
        keysState.d.pressed = false;
        break;
      case "a":
        keysState.a.pressed = false;
        break;
    }

    // enemy keys
    switch (event.key) {
      case "ArrowRight":
        keysState.ArrowRight.pressed = false;
        break;
      case "ArrowLeft":
        keysState.ArrowLeft.pressed = false;
        break;
    }
  };

  watch(canvasEl, (canvas) => {
    if (!canvas) return;
    canvas.width = canvasConfig.width;
    canvas.height = canvasConfig.height;

    console.log("Canvas assigned, starting animation");
    animate({ canvas });
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
  });

  onBeforeUnmount(() => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  });

  return { canvasEl, background, shop, player_1, player_2, keysState };
}
