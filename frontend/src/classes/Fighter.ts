import { canvasConfig } from "../config/canvas";
import { Sprite, type SpriteConfig } from "./Sprite";

export interface FighterSprite {
   imageSrc: string;
   image?: HTMLImageElement;
   framesMax: number;
}

export interface FighterSprites {
   idle: FighterSprite;
   run: FighterSprite;
   jump: FighterSprite;
   fall: FighterSprite;
   attack1: FighterSprite;
   takeHit: FighterSprite;
   death: FighterSprite;
   [key: string]: FighterSprite;
}

export type AttackBoxOffset = {
   x: {
      right: number;
      left: number;
   };
   y: number;
};

export interface AttackBoxConfig {
   offset: AttackBoxOffset;
   width: number;
   height: number;
}

export interface FighterConfig extends SpriteConfig {
   velocity: { x: number; y: number };
   color?: string;
   sprites: FighterSprites;
   attackBox: AttackBoxConfig;
}

export class Fighter extends Sprite {
   velocity: { x: number; y: number };
   color: string;
   isAttacking: boolean = false;
   health: number = 100;
   lastKey?: string;
   sprites: FighterSprites;
   dead: boolean = false;

   attackBox: {
      position: { x: number; y: number };
      offset: AttackBoxOffset;
      width: number;
      height: number;
   };

   constructor({
      position,
      velocity,
      color = "red",
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      sprites,
      attackBox,
      facing = 1,
   }: FighterConfig) {
      super({ position, imageSrc, scale, framesMax, offset, facing });

      this.velocity = velocity;
      this.color = color;
      this.sprites = sprites;

      this.attackBox = {
         position: { x: position.x, y: position.y },
         offset: attackBox.offset,
         width: attackBox.width,
         height: attackBox.height,
      };

      // preload sprite images
      for (const key in this.sprites) {
         const sprite = this.sprites[key];
         if (!sprite) continue;
         sprite.image = new Image();
         sprite.image.src = sprite.imageSrc;
      }
   }

   faceToward(targetX: number) {
      this.facing = targetX < this.position.x ? -1 : 1;
   }

   update(c: CanvasRenderingContext2D, enemy?: Fighter) {
      // decide facing: prefer enemy position, fallback to velocity
      if (enemy) {
         this.faceToward(enemy.position.x);
      } else if (this.velocity.x !== 0) {
         this.facing = this.velocity.x < 0 ? -1 : 1;
      }

      this.draw(c);
      if (!this.dead) this.animateFrames();

      // attack box follows fighter, mirrored by facing
      this.attackBox.position.x =
         this.facing === 1
            ? this.position.x + this.attackBox.offset.x.right
            : this.position.x - this.attackBox.offset.x.left - this.attackBox.width;

      // c.fillStyle = "rgba(0, 255, 0, 0.5)";
      // c.fillRect(
      //   this.attackBox.position.x,
      //   this.attackBox.position.y,
      //   this.attackBox.width,
      //   this.attackBox.height
      // );

      this.attackBox.position.y = this.position.y + this.attackBox.offset.y;

      // movement & gravity
      const nextXValue = this.position.x + this.velocity.x;
      if (nextXValue >= 0 && nextXValue + this.width <= canvasConfig.width) {
         this.position.x += this.velocity.x;
      }
      const nextYValue = this.position.y + this.velocity.y;

      if (nextYValue > canvasConfig.topLimit) {
         this.position.y += this.velocity.y;
      }

      if (this.position.y + this.height + this.velocity.y >= canvasConfig.height - 96) {
         this.velocity.y = 0;
         this.position.y = canvasConfig.height - this.height - 96;
      } else {
         this.velocity.y += canvasConfig.gravity;
      }
   }

   attack() {
      this.switchSprite("attack1");
      this.isAttacking = true;
   }

   takeHit() {
      const nextValue = this.health - 7.5;
      this.health = Math.max(nextValue, 0);
      if (this.health <= 0) {
         this.switchSprite("death");
      } else {
         this.switchSprite("takeHit");
      }
   }

   switchSprite(sprite: string) {
      if (this.image === this.sprites.death.image) {
         if (this.framesCurrent === this.sprites.death.framesMax - 1) {
            this.dead = true;
         }
         return;
      }
      // lock attack animation
      if (
         this.image === this.sprites.attack1.image &&
         this.framesCurrent < this.sprites.attack1.framesMax - 1
      )
         return;
      // lock getting hit animation
      if (
         this.image === this.sprites.takeHit.image &&
         this.framesCurrent < this.sprites.takeHit.framesMax - 1
      )
         return;

      const spr = this.sprites[sprite];
      if (!spr) return;

      if (this.image !== spr.image) {
         this.image = spr.image!;
         this.framesMax = spr.framesMax;
         this.framesCurrent = 0;
      }
   }
}
