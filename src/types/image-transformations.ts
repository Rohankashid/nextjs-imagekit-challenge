export type CropMode =
  | "maintain_ratio"
  | "pad_resize"
  | "force"
  | "at_max"
  | "at_max_enlarge"
  | "at_least"
  | "extract"
  | "pad_extract";

export type FocusMode =
  | "center"
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top_left"
  | "top_right"
  | "bottom_left"
  | "bottom_right"
  | "auto"
  | "face"
  | "custom"
  | `object-${string}`; // e.g. object-dog, object-car

export type BasicsTransform = {
  width?: number; // w
  height?: number; // h
  aspectRatio?: string; // ar e.g. "16-9"
  cropMode?: CropMode; // c
  focus?: FocusMode; // fo
  x?: number; // for extract/custom focus
  y?: number;
  xc?: number;
  yc?: number;
  zoom?: number; // z
  dpr?: number | "auto"; // dpr
};

export type FlipMode = "h" | "v" | "h_v";

export type ImageOverlay = {
  type: "image";
  src: string; // i
  width?: number; // w
  height?: number; // h
  x?: number; // position
  y?: number;
  opacity?: number; // o (0–100)
  bgColor?: string; // bg
  border?: string; // b e.g. "5_FFF000"
  radius?: number | "max"; // r
  rotation?: number; // rt
  flip?: FlipMode; // fl
};

export type TextOverlay = {
  type: "text";
  text: string; // i
  fontSize?: number; // fs
  fontFamily?: string; // ff
  color?: string; // co
  backgroundColor?: string; // bg
  padding?: string; // pa shorthand
  align?: "left" | "center" | "right"; // lfo
  bold?: boolean;
  italic?: boolean;
  strike?: boolean;
  rotation?: number; // rt
  flip?: FlipMode; // fl
};

export type GradientBlock = {
  type: "gradient";
  direction?: number | string; // ld
  fromColor?: string; // from
  toColor?: string; // to
  stopPoint?: number | string; // sp
  width?: number; // w
  height?: number; // h
  radius?: number; // r
};

export type SolidBlock = {
  type: "solid";
  color: string; // bg
  width?: number;
  height?: number;
  opacity?: number;
  radius?: number;
};

export type Overlay = ImageOverlay | TextOverlay | GradientBlock | SolidBlock;

export type Enhancements = {
  blur?: number;
  grayscale?: boolean;
  opacity?: number;

  contrast?: boolean;
  sharpen?: number;
  unsharpMask?: {
    radius?: number; // e-usm radius
    sigma?: number; // e-usm sigma
    amount?: number; // e-usm amount
    threshold?: number; // e-usm threshold
  };

  shadow?: {
    blur?: number; // e-shadow bl (0–15)
    saturation?: number; // e-shadow st (0–100)
    offsetX?: number; // e-shadow x (0–100 or N100)
    offsetY?: number; // e-shadow y (0–100 or N100)
  };
  gradient?: {
    direction?: number | string; // e-gradient ld (0–359 or direction string)
    fromColor?: string; // e-gradient from (hex color)
    toColor?: string; // e-gradient to (hex color)
    stopPoint?: number | string; // e-gradient sp (0.01–0.99 or >1)
  };

  background?: {
    type: "solid" | "blurred" | "dominant";
    color?: string; // for solid (hex color)
    blurIntensity?: number | "auto"; // for blurred (0–100 or auto)
    brightness?: number; // for blurred (-255 to 255)
  };

  trim?: number | boolean; // t (1–99 or true)
  border?: {
    width: number; // b width
    color: string; // b color (hex)
  };
  rotate?: number | "auto";
  flip?: "h" | "v" | "h_v";
  radius?: number | "max";
};

export type AiMagic = {
  background?: {
    remove?: boolean;
    mode?: "standard" | "economy";
    changePrompt?: string;
    generativeFill?: {
      prompt?: string;
      width?: number;
      height?: number;
      cropMode: "pad_resize" | "pad_extract";
    };
  };
  editing?: {
    prompt?: string;
    retouch?: boolean;
    upscale?: boolean;
  };
  shadowLighting?: {
    dropShadow?: {
      blur?: number;
      saturation?: number;
      offsetX?: number;
      offsetY?: number;
    };
  };
  generation?: {
    textPrompt?: string;
    variation?: boolean;
  };
  cropping?: {
    type?: "smart" | "face" | "object";
    objectName?: string;
    zoom?: number;
    width?: number;
    height?: number;
  };
};
