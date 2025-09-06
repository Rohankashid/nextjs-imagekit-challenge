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
  src: string;
  width?: number | string;
  height?: number | string;
  aspectRatio?: string;
  x?: number | string;
  y?: number | string;
  opacity?: number;
  bgColor?: string;
  border?: {
    width: number;
    color: string;
  };
  radius?: number | "max";
  rotation?: number;
  flip?: FlipMode;
  cropMode?: "extract" | "pad_resize";
  focus?: string;
  zoom?: number;
  trim?: boolean | number;
  blur?: number;
  quality?: number;
  dpr?: number | "auto";
  // Effects
  grayscale?: boolean;
  contrast?: boolean;
  sharpen?: number;
  unsharpMask?: {
    radius: number;
    sigma: number;
    amount: number;
    threshold: number;
  };
  shadow?: {
    blur: number;
    saturation: number;
    offsetX: number;
    offsetY: number;
  };
  gradient?: {
    direction: number | string;
    fromColor: string;
    toColor: string;
    stopPoint: number | string;
  };
};

export type TextOverlay = {
  type: "text";
  text: string;
  width?: number | string;
  fontSize?: number | string;
  fontFamily?: string;
  color?: string;
  backgroundColor?: string;
  padding?: string;
  align?: "left" | "center" | "right";
  x?: number | string;
  y?: number | string;
  opacity?: number;
  lineHeight?: number | string;
  typography?: {
    bold?: boolean;
    italic?: boolean;
    strikethrough?: boolean;
  };
  rotation?: number; // rt
  flip?: FlipMode; // fl
  radius?: number | "max"; // r
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
  width?: number | string;
  height?: number | string;
  x?: number | string;
  y?: number | string;
  opacity?: number; 
  radius?: number | "max"; // r
  gradient?: {
    direction: number | string;
    fromColor: string;
    toColor: string;
    stopPoint: number | string;
  };
};

export type Overlay = ImageOverlay | TextOverlay | GradientBlock | SolidBlock;

export type Enhancements = {
  blur?: number;
  grayscale?: boolean;
  opacity?: number;

  contrast?: boolean;
  sharpen?: number;
  unsharpMask?: {
    radius?: number;
    sigma?: number;
    amount?: number;
    threshold?: number;
  };

  shadow?: {
    blur?: number;
    saturation?: number;
    offsetX?: number;
    offsetY?: number;
  };
  gradient?: {
    direction?: number | string;
    fromColor?: string;
    toColor?: string;
    stopPoint?: number | string;
  };

  background?: {
    type: "solid" | "blurred" | "dominant";
    color?: string;
    blurIntensity?: number | "auto";
    brightness?: number;
  };

  trim?: number | boolean;
  border?: {
    width: number;
    color: string;
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
