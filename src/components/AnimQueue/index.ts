export { default as VaAnimQueue } from "./install";

export type TransitionModification =
  | "opacity"
  | "translateX"
  | "translateY"
  | "scale"
  | "scaleX"
  | "scaleY";
export type Transition = { [key in TransitionModification]?: Array<number> };

// export interface Transition {
//   opacity?: [number, number];
//   translateX?: [number, number];
//   translateY?: [number, number];
//   scale?: [number, number];
//   scaleX?: [number, number];
//   scaleY?: [number, number];
// }

export type TypeOfAnimation =
  | "right"
  | "left"
  | "top"
  | "bottom"
  | "alpha"
  | "scale"
  | "scaleBig"
  | "scaleX"
  | "scaleY";
export const Animations: { [name in TypeOfAnimation]: Transition } = {
  left: {
    opacity: [1, 0],
    translateX: [0, -30],
  },
  top: {
    opacity: [1, 0],
    translateY: [0, -30],
  },
  right: {
    opacity: [1, 0],
    translateX: [0, 30],
  },
  bottom: {
    opacity: [1, 0],
    translateY: [0, 30],
  },
  alpha: {
    opacity: [1, 0],
  },
  scale: {
    opacity: [1, 0],
    scale: [1, 0],
  },
  scaleBig: {
    opacity: [1, 0],
    scale: [1, 2],
  },
  scaleX: {
    opacity: [1, 0],
    scaleX: [1, 0],
  },
  scaleY: {
    opacity: [1, 0],
    scaleY: [1, 0],
  },
};

export type TypeOfEase =
  | "easeInSine"
  | "easeInBack"
  | "easeOutBack"
  | "easeInOutBack"
  | "easeOutSine"
  | "easeInOutSine"
  | "easeInQuad"
  | "easeOutQuad"
  | "easeInOutQuad"
  | "easeInCubic"
  | "easeOutCubic"
  | "easeInOutCubic"
  | "easeInQuart"
  | "easeOutQuart"
  | "easeInOutQuart"
  | "easeInQuint"
  | "easeOutQuint"
  | "easeInOutQuint"
  | "easeInExpo"
  | "easeOutExpo"
  | "easeInOutExpo"
  | "easeInCirc"
  | "easeOutCirc"
  | "easeInOutCirc"
  | "easeInElastic"
  | "easeOutElastic"
  | "easeInOutElastic"
  | "easeInBounce"
  | "easeOutBounce"
  | "easeInOutBounce";

export const BackEase: { [name in TypeOfEase]?: Array<number> } = {
  easeInBack: [0.6, -0.28, 0.735, 0.045],
  easeOutBack: [0.175, 0.885, 0.32, 1.275],
  easeInOutBack: [0.68, -0.55, 0.265, 1.55],
};
