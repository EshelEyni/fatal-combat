import type { Fighter } from "../../../../classes/Fighter";
import type { Sprite } from "../../../../classes/Sprite";
import type { KeyState } from "./KeyState";

export type AnimateConfig = {
   canvas: HTMLCanvasElement;
   animationId: number;
   keysState: KeyState;
   background: Sprite;
   shop: Sprite;
   player_1: Fighter;
   player_2: Fighter;
};
