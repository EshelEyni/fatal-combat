import { Sprite } from "../classes/Sprite";
import { Fighter } from "../classes/Fighter";
// import { rectangularCollision, decreaseTimer } from "./utils"
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

export function startGameEngine(canvas: HTMLCanvasElement) {
  const c = canvas.getContext("2d")!;
  canvas.width = 1024;
  canvas.height = 576;

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
    offset: {
      x: 0,
      y: 0,
    },
    imageSrc: samuraiMackIdle,
    framesMax: 8,
    scale: 2.5,
    // offset: {
    //   x: 215,
    //   y: 157,
    // },
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
    offset: {
      x: -50,
      y: 0,
    },
    imageSrc: kenjiIdle,
    framesMax: 4,
    scale: 2.5,
    // offset: {
    //   x: 215,
    //   y: 167,
    // },
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

    player.update(c);
    enemy.update(c);

    // movement, collision — same as vanilla (you already TS-converted it)
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
