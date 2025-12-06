import samuraiMackIdle from "../assets/img/samuraiMack/Idle.png";
import samuraiMackRun from "../assets/img/samuraiMack/Run.png";
import samuraiMackJump from "../assets/img/samuraiMack/Jump.png";
import samuraiMackFall from "../assets/img/samuraiMack/Fall.png";
import samuraiMackAttack1 from "../assets/img/samuraiMack/Attack1.png";
import samuraiMackTakeHit from "../assets/img/samuraiMack/Take Hit - white silhouette.png";
import samuraiMackDeath from "../assets/img/samuraiMack/Death.png";

export const getPlayerConfig = () => {
   const data = {
      position: {
         x: 250,
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
            x: {
               right: 100,
               left: 28,
            },
            y: 50,
         },
         width: 160,
         height: 50,
      },
   };

   return data;
};
