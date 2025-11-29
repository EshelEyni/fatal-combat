// src/game/useGameEngine.ts
import { onBeforeUnmount, ref, watch } from "vue";
import { didAttackHit } from "./util"; // re-export or point to your utils
import { Sprite } from "../../classes/Sprite";
import { canvasBackgroundConfig } from "../../config/canvasBackground";
import { shopCofnig } from "../../config/shop";
import { Fighter } from "../../classes/Fighter";
import { playerConfig } from "../../config/player";
import { enemyConfig } from "../../config/enemy";
import { canvasConfig } from "../../config/canvas";
// import your Sprite/Fighter/configs exactly like in game.ts

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

    // player movement

    if (keysState.a.pressed && player_1.lastKey === "a") {
      player_1.velocity.x = -5;
      player_1.switchSprite("run");
    } else if (keysState.d.pressed && player_1.lastKey === "d") {
      player_1.velocity.x = 5;
      player_1.switchSprite("run");
    } else {
      player_1.velocity.x = 0;
      player_1.switchSprite("idle");
    }

    // jumping
    if (player_1.velocity.y < 0) {
      player_1.switchSprite("jump");
    } else if (player_1.velocity.y > 0) {
      player_1.switchSprite("fall");
    }

    // Enemy movement
    if (keysState.ArrowLeft.pressed && player_2.lastKey === "ArrowLeft") {
      player_2.velocity.x = -5;
      player_2.switchSprite("run");
    } else if (
      keysState.ArrowRight.pressed &&
      player_2.lastKey === "ArrowRight"
    ) {
      player_2.velocity.x = 5;
      player_2.switchSprite("run");
    } else {
      player_2.velocity.x = 0;
      player_2.switchSprite("idle");
    }

    // jumping
    if (player_2.velocity.y < 0) {
      player_2.switchSprite("jump");
    } else if (player_2.velocity.y > 0) {
      player_2.switchSprite("fall");
    }

    // detect for collision & enemy gets hit
    if (
      didAttackHit({
        rectangle1: player_1.attackBox,
        rectangle2: {
          position: player_2.position,
          width: player_2.width,
          height: player_2.height,
        },
      }) &&
      player_1.isAttacking &&
      player_1.framesCurrent === 4
    ) {
      player_2.takeHit();
      player_1.isAttacking = false;

      // gsap.to("#enemyHealth", {
      //   width: enemy.health + "%",
      // });
    }

    // if player misses
    if (player_1.isAttacking && player_1.framesCurrent === 4) {
      player_1.isAttacking = false;
    }

    // this is where our player gets hit
    if (
      didAttackHit({
        rectangle1: player_2.attackBox,
        rectangle2: {
          position: player_1.position,
          width: player_1.width,
          height: player_1.height,
        },
      }) &&
      player_2.isAttacking &&
      player_2.framesCurrent === 2
    ) {
      player_1.takeHit();
      player_2.isAttacking = false;

      // gsap.to("#playerHealth", {
      //   width: player.health + "%",
      // });
    }

    // if player misses
    if (player_2.isAttacking && player_2.framesCurrent === 2) {
      player_2.isAttacking = false;
    }

    // end game based on health
    if (player_2.health <= 0 || player_1.health <= 0) {
      //   determineWinner({ player, enemy, timerId: timerId });
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!player_1.dead) {
      switch (event.key) {
        case "d":
          keysState.d.pressed = true;
          player_1.lastKey = "d";
          break;
        case "a":
          keysState.a.pressed = true;
          player_1.lastKey = "a";
          break;
        case "w":
          player_1.velocity.y = -20;
          break;
        case " ":
          player_1.attack();
          break;
      }
    }

    if (!player_2.dead) {
      switch (event.key) {
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
        case "Control":
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
