import {TransformationConfig} from "@/types";
import {
  AiMagic,
  BasicsTransform,
  Enhancements,
  Overlay,
} from "@/types/image-transformations";
import {
  Audio as VideoAudio,
  BasicsTransform as VideoBasics,
  Enhancements as VideoEnhancements,
  Overlay as VideoOverlay,
} from "@/types/video-transformations";

/* ---------------- BASICS ---------------- */

function basicsToParams(basics: BasicsTransform): string[] {
  const parts: string[] = [];
  if (basics.width) parts.push(`w-${basics.width}`);
  if (basics.height) parts.push(`h-${basics.height}`);
  if (basics.aspectRatio) parts.push(`ar-${basics.aspectRatio}`);
  if (basics.cropMode) parts.push(`c-${basics.cropMode}`);
  if (basics.focus) parts.push(`fo-${basics.focus}`);
  if (basics.zoom !== undefined) parts.push(`z-${basics.zoom}`);
  if (basics.dpr) parts.push(`dpr-${basics.dpr}`);
  if (basics.x !== undefined) parts.push(`x-${basics.x}`);
  if (basics.y !== undefined) parts.push(`y-${basics.y}`);
  if (basics.xc !== undefined) parts.push(`xc-${basics.xc}`);
  if (basics.yc !== undefined) parts.push(`yc-${basics.yc}`);
  return parts;
}

function videoBasicsToParams(b: VideoBasics): string[] {
  const p: string[] = [];
  if (b.width) p.push(`w-${b.width}`);
  if (b.height) p.push(`h-${b.height}`);
  if (b.aspectRatio) p.push(`ar-${b.aspectRatio}`);
  if (b.cropMode) p.push(`c-${b.cropMode}`);
  if (b.focus) p.push(`fo-${b.focus}`);
  if (b.rotate !== undefined) p.push(`rt-${b.rotate}`);
  if (b.border) p.push(`b-${b.border}`);
  if (b.radius !== undefined) p.push(`r-${b.radius}`);
  if (b.background) p.push(`bg-${b.background}`);
  return p;
}

/* ---------------- OVERLAYS ---------------- */

function overlaysToParams(overlays: Overlay[]): string[] {
  const parts: string[] = [];

  overlays.forEach(o => {
    if (o.type === "image") {
      const params: string[] = ["l-image"];

      if (!o.src || o.src.trim() === "") {
        return;
      }

      if (o.src.includes("istockphoto.com") && o.src.length > 200) {
        console.warn(
          "Skipping problematic iStockPhoto URL due to complexity:",
          o.src
        );
        return;
      }


      if (
        o.src.startsWith("data:") ||
        o.src.includes("/") ||
        o.src.includes(" ") ||
        o.src.length > 100
      ) {
        if (o.src.length > 500) {
          console.warn(
            "Image overlay URL is very long, this might cause issues:",
            o.src
          );
          console.warn(
            "Consider using a simpler image source or uploading to your ImageKit media library"
          );
        }

        if (
          o.src.includes("istockphoto.com") ||
          o.src.includes("shutterstock.com") ||
          o.src.includes("gettyimages.com")
        ) {
          console.warn(
            "External stock photo URLs may not work reliably with ImageKit overlays"
          );
          console.warn(
            "Try uploading the image to your ImageKit media library instead"
          );
        }
        params.push(`ie-${encodeURIComponent(btoa(o.src))}`);
      } else {
        params.push(`i-${o.src}`);
      }

      if (o.width) params.push(`w-${o.width}`);
      if (o.height) params.push(`h-${o.height}`);
      if (o.aspectRatio) params.push(`ar-${o.aspectRatio}`);

      if (o.x !== undefined) params.push(`lx-${o.x}`);
      if (o.y !== undefined) params.push(`ly-${o.y}`);

      if (o.opacity !== undefined) params.push(`o-${o.opacity}`);
      if (o.bgColor) params.push(`bg-${o.bgColor.replace("#", "")}`);
      if (o.border)
        params.push(`b-${o.border.width}-${o.border.color.replace("#", "")}`);
      if (o.radius !== undefined) {
        if (o.radius === "max") params.push("r-max");
        else params.push(`r-${o.radius}`);
      }
      if (o.rotation !== undefined) params.push(`rt-${o.rotation}`);
      if (o.flip) params.push(`fl-${o.flip}`);

      if (o.cropMode) params.push(`cm-${o.cropMode}`);
      if (o.focus) params.push(`fo-${o.focus}`);
      if (o.zoom !== undefined) params.push(`z-${o.zoom}`);
      if (o.trim !== undefined) {
        if (o.trim === true) params.push("t-true");
        else params.push(`t-${o.trim}`);
      }

      if (o.blur) params.push(`bl-${o.blur}`);
      if (o.quality) params.push(`q-${o.quality}`);
      if (o.dpr) params.push(`dpr-${o.dpr}`);

      if (o.grayscale) params.push("e-grayscale");
      if (o.contrast) params.push("e-contrast");
      if (o.sharpen !== undefined) params.push(`e-sharpen-${o.sharpen}`);
      if (o.unsharpMask) {
        const usm = o.unsharpMask;
        params.push(
          `e-usm-${usm.radius}-${usm.sigma}-${usm.amount}-${usm.threshold}`
        );
      }
      if (o.shadow) {
        const s = o.shadow;
        const shadowParts = ["e-shadow"];
        if (s.blur !== undefined) shadowParts.push(`bl-${s.blur}`);
        if (s.saturation !== undefined) shadowParts.push(`st-${s.saturation}`);
        if (s.offsetX !== undefined) {
          const xVal = s.offsetX < 0 ? `N${Math.abs(s.offsetX)}` : s.offsetX;
          shadowParts.push(`x-${xVal}`);
        }
        if (s.offsetY !== undefined) {
          const yVal = s.offsetY < 0 ? `N${Math.abs(s.offsetY)}` : s.offsetY;
          shadowParts.push(`y-${yVal}`);
        }
        params.push(shadowParts.join("_"));
      }
      if (o.gradient) {
        const g = o.gradient;
        const gradientParts = ["e-gradient"];
        if (g.direction !== undefined) gradientParts.push(`ld-${g.direction}`);
        if (g.fromColor)
          gradientParts.push(`from-${g.fromColor.replace("#", "")}`);
        if (g.toColor) gradientParts.push(`to-${g.toColor.replace("#", "")}`);
        if (g.stopPoint !== undefined) gradientParts.push(`sp-${g.stopPoint}`);
        params.push(gradientParts.join("_"));
      }

      params.push("l-end");
      parts.push(params.join(","));
    }

    if (o.type === "text") {
      const params: string[] = ["l-text"];

      if (!o.text || o.text.trim() === "") {
        return;
      }

      params.push(`i-${encodeURIComponent(o.text)}`);

      if (o.width) params.push(`w-${o.width}`);
      if (o.fontSize) params.push(`fs-${o.fontSize}`);
      if (o.fontFamily) params.push(`ff-${o.fontFamily}`);
      if (o.color) params.push(`co-${o.color.replace("#", "")}`);
      if (o.backgroundColor)
        params.push(`bg-${o.backgroundColor.replace("#", "")}`);
      if (o.padding) params.push(`pa-${o.padding}`);
      if (o.align) params.push(`ia-${o.align}`);
      if (o.lineHeight) params.push(`lh-${o.lineHeight}`);

      if (o.x !== undefined) params.push(`lx-${o.x}`);
      if (o.y !== undefined) params.push(`ly-${o.y}`);

      if (o.opacity !== undefined) params.push(`al-${o.opacity}`);
      if (o.radius !== undefined) {
        if (o.radius === "max") params.push("r-max");
        else params.push(`r-${o.radius}`);
      }
      if (o.rotation !== undefined) params.push(`rt-${o.rotation}`);
      if (o.flip) params.push(`fl-${o.flip}`);

      if (o.typography) {
        const typo = o.typography;
        const typoParts = [];
        if (typo.bold) typoParts.push("b");
        if (typo.italic) typoParts.push("i");
        if (typo.strikethrough) typoParts.push("s");
        if (typoParts.length > 0) params.push(`tg-${typoParts.join("_")}`);
      }

      params.push("l-end");
      parts.push(params.join(","));
    }

    if (o.type === "gradient") {
      const params: string[] = ["l-image", "i-ik_canvas", "e-gradient"];
      if (o.direction !== undefined) params.push(`ld-${o.direction}`);
      if (o.fromColor) params.push(`from-${o.fromColor}`);
      if (o.toColor) params.push(`to-${o.toColor}`);
      if (o.stopPoint !== undefined) params.push(`sp-${o.stopPoint}`);
      if (o.width) params.push(`w-${o.width}`);
      if (o.height) params.push(`h-${o.height}`);
      if (o.radius) params.push(`r-${o.radius}`);
      params.push("l-end");
      parts.push(params.join(","));
    }

    if (o.type === "solid") {
      const params: string[] = ["l-image", "i-ik_canvas"];

      if (o.color) params.push(`bg-${o.color.replace("#", "")}`);
      if (o.width) params.push(`w-${o.width}`);
      if (o.height) params.push(`h-${o.height}`);

      if (o.x !== undefined) params.push(`lx-${o.x}`);
      if (o.y !== undefined) params.push(`ly-${o.y}`);

      if (o.opacity !== undefined) params.push(`al-${o.opacity}`);
      if (o.radius !== undefined) {
        if (o.radius === "max") params.push("r-max");
        else params.push(`r-${o.radius}`);
      }

      if (o.gradient) {
        const g = o.gradient;
        const gradientParts = ["e-gradient"];
        if (g.direction !== undefined) gradientParts.push(`ld-${g.direction}`);
        if (g.fromColor)
          gradientParts.push(`from-${g.fromColor.replace("#", "")}`);
        if (g.toColor) gradientParts.push(`to-${g.toColor.replace("#", "")}`);
        if (g.stopPoint !== undefined) gradientParts.push(`sp-${g.stopPoint}`);
        params.push(gradientParts.join("_"));
      }

      params.push("l-end");
      parts.push(params.join(","));
    }
  });

  return parts;
}

function videoOverlaysToParams(overlays: VideoOverlay[]): string[] {
  const parts: string[] = [];
  overlays.forEach(o => {
    const p: string[] = [];
    if (o.type === "image") {
      p.push("l-image", `i-${o.src}`);
      if (o.width) p.push(`w-${o.width}`);
      if (o.height) p.push(`h-${o.height}`);
    } else if (o.type === "video") {
      p.push("l-video", `i-${o.src}`);
      if (o.width) p.push(`w-${o.width}`);
      if (o.height) p.push(`h-${o.height}`);
    } else if (o.type === "text") {
      p.push("l-text", `i-${encodeURIComponent(o.text)}`);
      if (o.fontSize) p.push(`fs-${o.fontSize}`);
      if (o.fontFamily) p.push(`ff-${o.fontFamily}`);
      if (o.color) p.push(`co-${o.color}`);
      if (o.padding) p.push(`pa-${o.padding}`);
    } else if (o.type === "solid") {
      p.push("l-image", "i-ik_canvas", `bg-${o.color}`);
      if (o.width) p.push(`w-${o.width}`);
      if (o.height) p.push(`h-${o.height}`);
      if (o.radius) p.push(`r-${o.radius}`);
    }
    // shared overlay controls
    if (o.x) p.push(`lx-${o.x}`);
    if (o.y) p.push(`ly-${o.y}`);
    if (o.startOffset) p.push(`lso-${o.startOffset}`);
    if (o.endOffset) p.push(`leo-${o.endOffset}`);
    if (o.duration) p.push(`ldu-${o.duration}`);
    p.push("l-end");
    parts.push(p.join(","));
  });
  return parts;
}

function enhancementsToParams(enh: Enhancements): string[] {
  const parts: string[] = [];
  if (enh.blur) parts.push(`bl-${enh.blur}`);
  if (enh.grayscale) parts.push("e-grayscale");
  if (enh.opacity !== undefined) parts.push(`o-${enh.opacity}`);

  if (enh.contrast) parts.push("e-contrast");
  if (enh.sharpen !== undefined) parts.push(`e-sharpen-${enh.sharpen}`);
  if (enh.unsharpMask) {
    const usm = enh.unsharpMask;
    const usmParts = ["e-usm"];
    if (usm.radius !== undefined) usmParts.push(`${usm.radius}`);
    if (usm.sigma !== undefined) usmParts.push(`${usm.sigma}`);
    if (usm.amount !== undefined) usmParts.push(`${usm.amount}`);
    if (usm.threshold !== undefined) usmParts.push(`${usm.threshold}`);
    parts.push(usmParts.join("-"));
  }
  if (enh.shadow) {
    const s = enh.shadow;
    const shadowParts: string[] = ["e-shadow"];
    if (s.blur !== undefined) shadowParts.push(`bl-${s.blur}`);
    if (s.saturation !== undefined) shadowParts.push(`st-${s.saturation}`);
    if (s.offsetX !== undefined) {
      const xVal = s.offsetX < 0 ? `N${Math.abs(s.offsetX)}` : s.offsetX;
      shadowParts.push(`x-${xVal}`);
    }
    if (s.offsetY !== undefined) {
      const yVal = s.offsetY < 0 ? `N${Math.abs(s.offsetY)}` : s.offsetY;
      shadowParts.push(`y-${yVal}`);
    }
    parts.push(shadowParts.join("_"));
  }

  if (enh.gradient) {
    const g = enh.gradient;
    const gradientParts = ["e-gradient"];
    if (g.direction !== undefined) gradientParts.push(`ld-${g.direction}`);
    if (g.fromColor) gradientParts.push(`from-${g.fromColor}`);
    if (g.toColor) gradientParts.push(`to-${g.toColor}`);
    if (g.stopPoint !== undefined) gradientParts.push(`sp-${g.stopPoint}`);
    parts.push(gradientParts.join("_"));
  }

  if (enh.background) {
    const bg = enh.background;
    if (bg.type === "solid" && bg.color) parts.push(`bg-${bg.color}`);
    if (bg.type === "blurred") {
      const val = ["bg-blurred"];
      if (bg.blurIntensity) val.push(`${bg.blurIntensity}`);
      if (bg.brightness) val.push(`${bg.brightness}`);
      parts.push(val.join("_"));
    }
    if (bg.type === "dominant") parts.push("bg-dominant");
  }

  if (enh.trim !== undefined) {
    if (enh.trim === true) parts.push("t-true");
    else parts.push(`t-${enh.trim}`);
  }
  if (enh.border) parts.push(`b-${enh.border.width}_${enh.border.color}`);
  if (enh.rotate !== undefined) {
    if (enh.rotate === "auto") parts.push("rt-auto");
    else parts.push(`rt-${enh.rotate}`);
  }
  if (enh.flip) parts.push(`fl-${enh.flip}`);
  if (enh.radius !== undefined) {
    if (enh.radius === "max") parts.push("r-max");
    else parts.push(`r-${enh.radius}`);
  }

  return parts;
}

function videoEnhancementsToParams(enh: VideoEnhancements): string[] {
  const parts: string[] = [];

  if (enh.trimming) {
    const t = enh.trimming;
    if (t.startOffset !== undefined) parts.push(`so-${t.startOffset}`);
    if (t.endOffset !== undefined) parts.push(`eo-${t.endOffset}`);
    if (t.duration !== undefined) parts.push(`du-${t.duration}`);
  }

  if (enh.thumbnail) {
    const th = enh.thumbnail;
    if (th.time !== undefined) parts.push(`so-${th.time}`);
    if (th.width) parts.push(`w-${th.width}`);
    if (th.height) parts.push(`h-${th.height}`);
    if (th.aspectRatio) parts.push(`ar-${th.aspectRatio}`);
    if (th.cropMode) {
      if (["extract", "pad_resize"].includes(th.cropMode))
        parts.push(`cm-${th.cropMode}`);
      else parts.push(`c-${th.cropMode}`);
    }
    if (th.focus) parts.push(`fo-${th.focus}`);
    if (th.border) parts.push(`b-${th.border.width}_${th.border.color}`);
    if (th.bg) parts.push(`bg-${th.bg}`);
    if (th.radius !== undefined) parts.push(`r-${th.radius}`);
  }

  return parts;
}

function aiToParams(ai: AiMagic): string[] {
  const parts: string[] = [];

  if (ai.background) {
    const bg = ai.background;
    if (bg.remove) {
      parts.push(bg.mode === "economy" ? "e-bgremove" : "e-removedotbg");
    }
    if (bg.changePrompt) {
      parts.push(`e-changebg-prompt-${encodeURIComponent(bg.changePrompt)}`);
    }
    if (bg.generativeFill) {
      const g = bg.generativeFill;
      let val = "bg-genfill";
      if (g.prompt) {
        val += `-prompt-${encodeURIComponent(g.prompt)}`;
      }
      parts.push(val);
      if (g.width) parts.push(`w-${g.width}`);
      if (g.height) parts.push(`h-${g.height}`);
      if (g.cropMode) parts.push(`cm-${g.cropMode}`);
    }
  }

  if (ai.editing) {
    const e = ai.editing;
    if (e.prompt) parts.push(`e-edit-prompt-${encodeURIComponent(e.prompt)}`);
    if (e.retouch) parts.push("e-retouch");
    if (e.upscale) parts.push("e-upscale");
  }

  if (ai.shadowLighting?.dropShadow) {
    const s = ai.shadowLighting.dropShadow;
    const shadowParams: string[] = [];

    if (s.blur !== undefined) shadowParams.push(`bl-${s.blur}`);
    if (s.saturation !== undefined) shadowParams.push(`st-${s.saturation}`);
    if (s.offsetX !== undefined) {
      const xVal = s.offsetX < 0 ? `N${Math.abs(s.offsetX)}` : s.offsetX;
      shadowParams.push(`x-${xVal}`);
    }
    if (s.offsetY !== undefined) {
      const yVal = s.offsetY < 0 ? `N${Math.abs(s.offsetY)}` : s.offsetY;
      shadowParams.push(`y-${yVal}`);
    }

    if (shadowParams.length > 0) {
      parts.push(`e-shadow-${shadowParams.join("_")}`);
    }
  }

  if (ai.generation) {
    const g = ai.generation;
    if (g.textPrompt) {
      parts.push(`ik-genimg-prompt-${encodeURIComponent(g.textPrompt)}`);
    }
    if (g.variation) parts.push("e-genvar");
  }

  if (ai.cropping) {
    const c = ai.cropping;
    if (c.type === "smart") parts.push("fo-auto");
    if (c.type === "face") parts.push("fo-face");
    if (c.type === "object" && c.objectName) parts.push(`fo-${c.objectName}`);
    if (c.zoom !== undefined) parts.push(`z-${c.zoom}`);
    if (c.width) parts.push(`w-${c.width}`);
    if (c.height) parts.push(`h-${c.height}`);
  }

  return parts;
}

function audioToParams(a: VideoAudio): string[] {
  const p: string[] = [];
  if (a.mute) p.push("ac-none");
  if (a.extractAudio) p.push("vc-none");
  return p;
}

export function buildTrString(config: TransformationConfig): string {
  const parts: string[] = [];

  if (config.type === "IMAGE") {
    if (config.basics) parts.push(...basicsToParams(config.basics));
    if (config.enhancements)
      parts.push(...enhancementsToParams(config.enhancements));
    if (config.ai) parts.push(...aiToParams(config.ai));
    if (config.overlays) parts.push(...overlaysToParams(config.overlays));
  }

  if (config.type === "VIDEO") {
    if (config.basics) parts.push(...videoBasicsToParams(config.basics));
    if (config.enhancements)
      parts.push(...videoEnhancementsToParams(config.enhancements));
    if (config.overlays) parts.push(...videoOverlaysToParams(config.overlays));
    if (config.audio) parts.push(...audioToParams(config.audio));
  }

  return parts.filter(Boolean).join(",");
}

export function buildImageKitUrl(
  src: string,
  config: TransformationConfig
): string {
  const tr = buildTrString(config);
  if (!tr) return src;

  try {
    const url = new URL(src);

    const base = url.origin + url.pathname;
    const search = url.search
      ? `${url.search.replace(/^\?/, "")}&tr=${tr}`
      : `tr=${tr}`;

    const finalUrl = `${base}?${search}`;

    if (config.type === "IMAGE") {
      if (config.ai) {
        console.log("AI Magic config:", config.ai);
      }
      if (config.overlays) {
        console.log("Overlays config:", config.overlays);
        console.log("Generated transformation string:", tr);
        console.log("Final URL:", finalUrl);

        config.overlays.forEach((overlay, index) => {
          if (overlay.type === "image" && overlay.src) {
            if (overlay.src.length > 500) {
              console.warn(
                `Overlay ${index + 1}: Very long URL detected (${overlay.src.length} chars)`,
                overlay.src
              );
            }
            if (
              overlay.src.includes("istockphoto.com") ||
              overlay.src.includes("shutterstock.com")
            ) {
              console.warn(
                `Overlay ${index + 1}: External stock photo URL detected, this may cause issues`,
                overlay.src
              );
            }
          }
        });
      }
    }

    return finalUrl;
  } catch {
    return src.includes("?") ? `${src}&tr=${tr}` : `${src}?tr=${tr}`;
  }
}
