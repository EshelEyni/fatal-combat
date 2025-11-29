import kenjiIdle from "../assets/img/kenji/Idle.png";
import kenjiRun from "../assets/img/kenji/Run.png";
import kenjiJump from "../assets/img/kenji/Jump.png";
import kenjiFall from "../assets/img/kenji/Fall.png";
import kenjiAttack1 from "../assets/img/kenji/Attack1.png";
import kenjiTakeHit from "../assets/img/kenji/Take hit.png";
import kenjiDeath from "../assets/img/kenji/Death.png";

export const enemyConfig = {
  position: {
    x: 775,
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
      x: {
        right: 92,
        left:  24,
      },
      y: 50,
    },
    width: 150,
    height: 50,
  },
  facing: -1,
};
