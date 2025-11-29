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
  const player = new Fighter(playerConfig);
  const enemy = new Fighter(enemyConfig);

  const animate = ({ canvas }: { canvas: HTMLCanvasElement }) => {
    const canvasContext = canvas.getContext("2d")!;

    animationId = requestAnimationFrame(() => animate({ canvas }));

    background.update(canvasContext);
    shop.update(canvasContext);

    player.update(canvasContext);
    enemy.update(canvasContext);

    // player movement

    if (keysState.a.pressed && player.lastKey === "a") {
      player.velocity.x = -5;
      player.switchSprite("run");
    } else if (keysState.d.pressed && player.lastKey === "d") {
      player.velocity.x = 5;
      player.switchSprite("run");
    } else {
      player.velocity.x = 0;
      player.switchSprite("idle");
    }

    // jumping
    if (player.velocity.y < 0) {
      player.switchSprite("jump");
    } else if (player.velocity.y > 0) {
      player.switchSprite("fall");
    }

    // Enemy movement
    if (keysState.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
      enemy.velocity.x = -5;
      enemy.switchSprite("run");
    } else if (keysState.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
      enemy.velocity.x = 5;
      enemy.switchSprite("run");
    } else {
      enemy.velocity.x = 0;
      enemy.switchSprite("idle");
    }

    // jumping
    if (enemy.velocity.y < 0) {
      enemy.switchSprite("jump");
    } else if (enemy.velocity.y > 0) {
      enemy.switchSprite("fall");
    }

    // detect for collision & enemy gets hit
    if (
      didAttackHit({
        rectangle1: player.attackBox,
        rectangle2: {
          position: enemy.position,
          width: enemy.width,
          height: enemy.height,
        },
      }) &&
      player.isAttacking &&
      player.framesCurrent === 4
    ) {
      enemy.takeHit();
      player.isAttacking = false;

      // gsap.to("#enemyHealth", {
      //   width: enemy.health + "%",
      // });
    }

    // if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
      player.isAttacking = false;
    }

    // this is where our player gets hit
    if (
      didAttackHit({
        rectangle1: enemy.attackBox,
        rectangle2: {
          position: player.position,
          width: player.width,
          height: player.height,
        },
      }) &&
      enemy.isAttacking &&
      enemy.framesCurrent === 2
    ) {
      player.takeHit();
      enemy.isAttacking = false;

      // gsap.to("#playerHealth", {
      //   width: player.health + "%",
      // });
    }

    // if player misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
      enemy.isAttacking = false;
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
      //   determineWinner({ player, enemy, timerId: timerId });
    }
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (!player.dead) {
      switch (event.key) {
        case "d":
          keysState.d.pressed = true;
          player.lastKey = "d";
          break;
        case "a":
          keysState.a.pressed = true;
          player.lastKey = "a";
          break;
        case "w":
          player.velocity.y = -20;
          break;
        case " ":
          player.attack();
          break;
      }
    }

    if (!enemy.dead) {
      switch (event.key) {
        case "ArrowRight":
          keysState.ArrowRight.pressed = true;
          enemy.lastKey = "ArrowRight";
          break;
        case "ArrowLeft":
          keysState.ArrowLeft.pressed = true;
          enemy.lastKey = "ArrowLeft";
          break;
        case "ArrowUp":
          enemy.velocity.y = -20;
          break;
        case "Control":
          enemy.attack();

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

  return { canvasEl, background, shop, player, enemy, keysState };
}
