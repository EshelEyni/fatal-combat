export interface SpriteConfig {
  position: { x: number; y: number };
  imageSrc: string;
  scale?: number;
  framesMax?: number;
  offset?: { x: number; y: number };
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

  constructor({
    position,
    imageSrc,
    scale = 1,
    framesMax = 1,
    offset = { x: 0, y: 0 },
  }: SpriteConfig) {
    this.position = position;
    this.image = new Image();
    this.image.src = imageSrc;
    this.scale = scale;
    this.framesMax = framesMax;
    this.offset = offset;

    this.image.onload = () => {
      this.loaded = true;
    };
  }

  draw(c: CanvasRenderingContext2D) {
    if (!this.loaded) return;
    const frameWidth = this.image.width / this.framesMax;

    c.drawImage(
      this.image,
      this.framesCurrent * frameWidth,
      0,
      frameWidth,
      this.image.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      frameWidth * this.scale,
      this.image.height * this.scale
    );
  }

  animateFrames() {
    this.framesElapsed++;

    if (this.framesElapsed % this.framesHold === 0) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }

  update(c: CanvasRenderingContext2D) {
    this.draw(c);
    this.animateFrames();
  }
}
