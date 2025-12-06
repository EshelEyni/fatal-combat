export interface SpriteConfig {
   position: { x: number; y: number };
   imageSrc: string;
   scale?: number;
   framesMax?: number;
   offset?: { x: number; y: number };
   facing?: number;
}

export class Sprite {
   position: { x: number; y: number };
   width: number = 50;
   height: number = 150;
   image: HTMLImageElement;
   scale: number;
   framesMax: number;
   framesCurrent: number = 0;
   framesElapsed: number = 0;
   framesHold: number = 5;
   offset: { x: number; y: number };
   loaded = false;
   facing: number;

   constructor({
      position,
      imageSrc,
      scale = 1,
      framesMax = 1,
      offset = { x: 0, y: 0 },
      facing = 1,
   }: SpriteConfig) {
      this.position = position;
      this.image = new Image();
      this.image.src = imageSrc;
      this.scale = scale;
      this.framesMax = framesMax;
      this.offset = offset;
      this.facing = facing;

      this.image.onload = () => {
         this.loaded = true;
      };
   }

   draw(c: CanvasRenderingContext2D) {
      if (!this.loaded) return;

      const frameWidth = this.image.width / this.framesMax;
      const destW = frameWidth * this.scale;
      const destH = this.image.height * this.scale;

      const destX = this.position.x - this.offset.x;
      const destY = this.position.y - this.offset.y;

      c.save();

      if (this.facing === -1) {
         // flip horizontally
         c.scale(-1, 1);
      }

      // when flipped, x is mirrored around 0
      const drawX = this.facing === 1 ? destX : -destX - destW;

      c.drawImage(
         this.image,
         this.framesCurrent * frameWidth, // sx
         0, // sy
         frameWidth, // sWidth
         this.image.height, // sHeight
         drawX, // dx
         destY, // dy
         destW, // dWidth
         destH, // dHeight
      );

      c.restore();
   }

   animateFrames() {
      this.framesElapsed++;

      if (this.framesElapsed % this.framesHold != 0) return;
      if (this.framesCurrent < this.framesMax - 1) {
         this.framesCurrent++;
      } else {
         this.framesCurrent = 0;
      }
   }

   update(c: CanvasRenderingContext2D) {
      this.draw(c);
      this.animateFrames();
   }
}
