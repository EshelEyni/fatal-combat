import { Sprite } from "../classes/Sprite";
import { Fighter } from "../classes/Fighter";
import { gsap } from "gsap";
import backgroundImage from "../assets/img/background.png";
import shopImage from "../assets/img/shop.png";
import samuraiMackIdle from "../assets/img/samuraiMack/Idle.png";
import samuraiMackRun from "../assets/img/samuraiMack/Run.png";
import samuraiMackJump from "../assets/img/samuraiMack/Jump.png";
import samuraiMackFall from "../assets/img/samuraiMack/Fall.png";
import samuraiMackAttack1 from "../assets/img/samuraiMack/Attack1.png";
import samuraiMackTakeHit from "../assets/img/samuraiMack/Take Hit - white silhouette.png";
import samuraiMackDeath from "../assets/img/samuraiMack/Death.png";

import kenjiIdle from "../assets/img/kenji/Idle.png";
import kenjiRun from "../assets/img/kenji/Run.png";
import kenjiJump from "../assets/img/kenji/Jump.png";
import kenjiFall from "../assets/img/kenji/Fall.png";
import kenjiAttack1 from "../assets/img/kenji/Attack1.png";
import kenjiTakeHit from "../assets/img/kenji/Take hit.png";
import kenjiDeath from "../assets/img/kenji/Death.png";
import { determineWinner, rectangularCollision, timerId } from "./utils";

export const gameConfig = {
  canvasWidth: 1024,
  canvasHeight: 576,
  gravity: 0.7,
};

export function startGameEngine(canvas: HTMLCanvasElement) {
  const c = canvas.getContext("2d")!;
  canvas.width = gameConfig.canvasWidth;
  canvas.height = gameConfig.canvasHeight;

  //   const gravity = 0.7;

  const background = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: backgroundImage,
  });

  const shop = new Sprite({
    position: { x: 600, y: 128 },
    imageSrc: shopImage,
    scale: 2.75,
    framesMax: 6,
  });

  const player = new Fighter({
    position: {
      x: 0,
      y: 0,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    imageSrc: samuraiMackIdle,
    framesMax: 8,
    scale: 2.5,
    offset: {
      x: 215,
      y: 157,
    },
    sprites: {
      idle: {
        imageSrc: samuraiMackIdle,
        framesMax: 8,
      },
      run: {
        imageSrc: samuraiMackRun,
        framesMax: 8,
      },
      jump: {
        imageSrc: samuraiMackJump,
        framesMax: 2,
      },
      fall: {
        imageSrc: samuraiMackFall,
        framesMax: 2,
      },
      attack1: {
        imageSrc: samuraiMackAttack1,
        framesMax: 6,
      },
      takeHit: {
        imageSrc: samuraiMackTakeHit,
        framesMax: 4,
      },
      death: {
        imageSrc: samuraiMackDeath,
        framesMax: 6,
      },
    },
    attackBox: {
      offset: {
        x: 100,
        y: 50,
      },
      width: 160,
      height: 50,
    },
  });

  const enemy = new Fighter({
    position: {
      x: 400,
      y: 100,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    color: "blue",
    imageSrc: kenjiIdle,
    framesMax: 4,
    scale: 2.5,
    offset: {
      x: 215,
      y: 167,
    },
    sprites: {
      idle: {
        imageSrc: kenjiIdle,
        framesMax: 4,
      },
      run: {
        imageSrc: kenjiRun,
        framesMax: 8,
      },
      jump: {
        imageSrc: kenjiJump,
        framesMax: 2,
      },
      fall: {
        imageSrc: kenjiFall,
        framesMax: 2,
      },
      attack1: {
        imageSrc: kenjiAttack1,
        framesMax: 4,
      },
      takeHit: {
        imageSrc: kenjiTakeHit,
        framesMax: 3,
      },
      death: {
        imageSrc: kenjiDeath,
        framesMax: 7,
      },
    },
    attackBox: {
      offset: {
        x: -170,
        y: 50,
      },
      width: 170,
      height: 50,
    },
  });

  const keys = {
    a: { pressed: false },
    d: { pressed: false },
    ArrowRight: { pressed: false },
    ArrowLeft: { pressed: false },
  };

  let animationId: number;

  function animate() {
    animationId = requestAnimationFrame(animate);

    c.fillStyle = "black";
    c.fillRect(0, 0, canvas.width, canvas.height);

    background.update(c);
    shop.update(c);

    c.fillStyle = "rgba(255, 255, 255, 0.15)";
    c.fillRect(0, 0, canvas.width, canvas.height);

    player.update(c);
    enemy.update(c);

    // player movement

    if (keys.a.pressed && player.lastKey === "a") {
      player.velocity.x = -5;
      player.switchSprite("run");
    } else if (keys.d.pressed && player.lastKey === "d") {
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
    if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
      enemy.velocity.x = -5;
      enemy.switchSprite("run");
    } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
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
      rectangularCollision({
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

      gsap.to("#enemyHealth", {
        width: enemy.health + "%",
      });
    }

    // if player misses
    if (player.isAttacking && player.framesCurrent === 4) {
      player.isAttacking = false;
    }

    // this is where our player gets hit
    if (
      rectangularCollision({
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

      gsap.to("#playerHealth", {
        width: player.health + "%",
      });
    }

    // if player misses
    if (enemy.isAttacking && enemy.framesCurrent === 2) {
      enemy.isAttacking = false;
    }

    // end game based on health
    if (enemy.health <= 0 || player.health <= 0) {
      determineWinner({ player, enemy, timerId: timerId });
    }
  }

  animate();

  const onKeyDown = (event: KeyboardEvent) => {
    if (!player.dead) {
      switch (event.key) {
        case "d":
          keys.d.pressed = true;
          player.lastKey = "d";
          break;
        case "a":
          keys.a.pressed = true;
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
          keys.ArrowRight.pressed = true;
          enemy.lastKey = "ArrowRight";
          break;
        case "ArrowLeft":
          keys.ArrowLeft.pressed = true;
          enemy.lastKey = "ArrowLeft";
          break;
        case "ArrowUp":
          enemy.velocity.y = -20;
          break;
        case "ArrowDown":
          enemy.attack();

          break;
      }
    }
  };
  const onKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "d":
        keys.d.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
    }

    // enemy keys
    switch (event.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
    }
  };

  // listeners
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("keyup", onKeyUp);

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("keydown", onKeyDown);
    window.removeEventListener("keyup", onKeyUp);
  };
}
