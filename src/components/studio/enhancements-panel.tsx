"use client";

import {useState} from "react";

import {Input} from "@/components/ui/input";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {Enhancements} from "@/types/image-transformations";

type EnhancementsPanelProps = {
  enhancements: Enhancements;
  onEnhancementsChange: (enhancements: Enhancements) => void;
};

export function EnhancementsPanel({
  enhancements,
  onEnhancementsChange,
}: EnhancementsPanelProps) {
  const [borderColor, setBorderColor] = useState(
    enhancements.border?.color || "#000000"
  );
  const [gradientFromColor, setGradientFromColor] = useState(
    enhancements.gradient?.fromColor || "#FF0000"
  );
  const [gradientToColor, setGradientToColor] = useState(
    enhancements.gradient?.toColor || "#0000FF"
  );

  return (
    <div className="space-y-4">
      <ScrollArea className="h-96 w-full">
        <div className="space-y-6 pr-4">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground/80">
              Basic Effects
            </h4>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Blur ({enhancements.blur || 0})
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={enhancements.blur || 0}
                onChange={e => {
                  const blur = parseInt(e.target.value);
                  onEnhancementsChange({
                    ...enhancements,
                    blur: blur > 0 ? blur : undefined,
                  });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>100</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Grayscale</span>
              <Switch
                checked={!!enhancements.grayscale}
                onCheckedChange={checked => {
                  onEnhancementsChange({
                    ...enhancements,
                    grayscale: checked,
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Opacity ({enhancements.opacity || 100}%)
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={enhancements.opacity || 100}
                onChange={e => {
                  const opacity = parseInt(e.target.value);
                  onEnhancementsChange({
                    ...enhancements,
                    opacity: opacity < 100 ? opacity : undefined,
                  });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground/80">
              Contrast & Sharpening
            </h4>

            <div className="flex items-center justify-between">
              <span className="text-sm">Contrast Stretch</span>
              <Switch
                checked={!!enhancements.contrast}
                onCheckedChange={checked => {
                  onEnhancementsChange({
                    ...enhancements,
                    contrast: checked,
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Sharpen ({enhancements.sharpen || 0})
              </label>
              <input
                type="range"
                min="0"
                max="10"
                value={enhancements.sharpen || 0}
                onChange={e => {
                  const sharpen = parseInt(e.target.value);
                  onEnhancementsChange({
                    ...enhancements,
                    sharpen: sharpen > 0 ? sharpen : undefined,
                  });
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0</span>
                <span>10</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Unsharp Mask</span>
                <Switch
                  checked={!!enhancements.unsharpMask}
                  onCheckedChange={checked => {
                    onEnhancementsChange({
                      ...enhancements,
                      unsharpMask: checked
                        ? {
                            radius: 2,
                            sigma: 2,
                            amount: 0.8,
                            threshold: 0.024,
                          }
                        : undefined,
                    });
                  }}
                />
              </div>

              {enhancements.unsharpMask && (
                <div className="space-y-3 pl-4 border-l-2 border-muted">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Radius</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={enhancements.unsharpMask.radius || 2}
                        onChange={e => {
                          const radius = parseFloat(e.target.value);
                          onEnhancementsChange({
                            ...enhancements,
                            unsharpMask: {
                              ...enhancements.unsharpMask!,
                              radius,
                            },
                          });
                        }}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Sigma</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={enhancements.unsharpMask.sigma || 2}
                        onChange={e => {
                          const sigma = parseFloat(e.target.value);
                          onEnhancementsChange({
                            ...enhancements,
                            unsharpMask: {
                              ...enhancements.unsharpMask!,
                              sigma,
                            },
                          });
                        }}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Amount</label>
                      <Input
                        type="number"
                        step="0.1"
                        value={enhancements.unsharpMask.amount || 0.8}
                        onChange={e => {
                          const amount = parseFloat(e.target.value);
                          onEnhancementsChange({
                            ...enhancements,
                            unsharpMask: {
                              ...enhancements.unsharpMask!,
                              amount,
                            },
                          });
                        }}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Threshold</label>
                      <Input
                        type="number"
                        step="0.001"
                        value={enhancements.unsharpMask.threshold || 0.024}
                        onChange={e => {
                          const threshold = parseFloat(e.target.value);
                          onEnhancementsChange({
                            ...enhancements,
                            unsharpMask: {
                              ...enhancements.unsharpMask!,
                              threshold,
                            },
                          });
                        }}
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground/80">
              Shadow & Gradient
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Shadow</span>
                <Switch
                  checked={!!enhancements.shadow}
                  onCheckedChange={checked => {
                    onEnhancementsChange({
                      ...enhancements,
                      shadow: checked
                        ? {
                            blur: 10,
                            saturation: 30,
                            offsetX: 2,
                            offsetY: 2,
                          }
                        : undefined,
                    });
                  }}
                />
              </div>

              {enhancements.shadow && (
                <div className="space-y-3 pl-4 border-l-2 border-muted">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Blur</label>
                      <Input
                        type="number"
                        min="0"
                        max="15"
                        value={enhancements.shadow.blur || 10}
                        onChange={e => {
                          const blur = parseInt(e.target.value);
                          onEnhancementsChange({
                            ...enhancements,
                            shadow: {
                              ...enhancements.shadow!,
                              blur,
                            },
                          });
                        }}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Saturation</label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={enhancements.shadow.saturation || 30}
                        onChange={e => {
                          const saturation = parseInt(e.target.value);
                          onEnhancementsChange({
                            ...enhancements,
                            shadow: {
                              ...enhancements.shadow!,
                              saturation,
                            },
                          });
                        }}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">X Offset</label>
                      <Input
                        type="number"
                        min="-100"
                        max="100"
                        value={enhancements.shadow.offsetX || 2}
                        onChange={e => {
                          const offsetX = parseInt(e.target.value);
                          onEnhancementsChange({
                            ...enhancements,
                            shadow: {
                              ...enhancements.shadow!,
                              offsetX,
                            },
                          });
                        }}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Y Offset</label>
                      <Input
                        type="number"
                        min="-100"
                        max="100"
                        value={enhancements.shadow.offsetY || 2}
                        onChange={e => {
                          const offsetY = parseInt(e.target.value);
                          onEnhancementsChange({
                            ...enhancements,
                            shadow: {
                              ...enhancements.shadow!,
                              offsetY,
                            },
                          });
                        }}
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Gradient Overlay</span>
                <Switch
                  checked={!!enhancements.gradient}
                  onCheckedChange={checked => {
                    onEnhancementsChange({
                      ...enhancements,
                      gradient: checked
                        ? {
                            direction: 180,
                            fromColor: gradientFromColor,
                            toColor: gradientToColor,
                            stopPoint: 1,
                          }
                        : undefined,
                    });
                  }}
                />
              </div>

              {enhancements.gradient && (
                <div className="space-y-3 pl-4 border-l-2 border-muted">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Direction</label>
                    <Select
                      value={
                        enhancements.gradient.direction?.toString() || "180"
                      }
                      onValueChange={value => {
                        const direction =
                          value === "auto" ? "auto" : parseInt(value);
                        onEnhancementsChange({
                          ...enhancements,
                          gradient: {
                            ...enhancements.gradient!,
                            direction,
                          },
                        });
                      }}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">Top (0°)</SelectItem>
                        <SelectItem value="45">Top Right (45°)</SelectItem>
                        <SelectItem value="90">Right (90°)</SelectItem>
                        <SelectItem value="135">Bottom Right (135°)</SelectItem>
                        <SelectItem value="180">Bottom (180°)</SelectItem>
                        <SelectItem value="225">Bottom Left (225°)</SelectItem>
                        <SelectItem value="270">Left (270°)</SelectItem>
                        <SelectItem value="315">Top Left (315°)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">From Color</label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={gradientFromColor}
                          onChange={e => {
                            setGradientFromColor(e.target.value);
                            onEnhancementsChange({
                              ...enhancements,
                              gradient: {
                                ...enhancements.gradient!,
                                fromColor: e.target.value.replace("#", ""),
                              },
                            });
                          }}
                          className="h-8 w-12 p-1"
                        />
                        <Input
                          value={gradientFromColor}
                          onChange={e => {
                            setGradientFromColor(e.target.value);
                            onEnhancementsChange({
                              ...enhancements,
                              gradient: {
                                ...enhancements.gradient!,
                                fromColor: e.target.value.replace("#", ""),
                              },
                            });
                          }}
                          className="h-8 flex-1"
                          placeholder="#FF0000"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">To Color</label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={gradientToColor}
                          onChange={e => {
                            setGradientToColor(e.target.value);
                            onEnhancementsChange({
                              ...enhancements,
                              gradient: {
                                ...enhancements.gradient!,
                                toColor: e.target.value.replace("#", ""),
                              },
                            });
                          }}
                          className="h-8 w-12 p-1"
                        />
                        <Input
                          value={gradientToColor}
                          onChange={e => {
                            setGradientToColor(e.target.value);
                            onEnhancementsChange({
                              ...enhancements,
                              gradient: {
                                ...enhancements.gradient!,
                                toColor: e.target.value.replace("#", ""),
                              },
                            });
                          }}
                          className="h-8 flex-1"
                          placeholder="#0000FF"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium">
                      Stop Point ({enhancements.gradient.stopPoint || 1})
                    </label>
                    <input
                      type="range"
                      min="0.01"
                      max="2"
                      step="0.01"
                      value={enhancements.gradient.stopPoint || 1}
                      onChange={e => {
                        const stopPoint = parseFloat(e.target.value);
                        onEnhancementsChange({
                          ...enhancements,
                          gradient: {
                            ...enhancements.gradient!,
                            stopPoint,
                          },
                        });
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground/80">
              Transformations
            </h4>

            <div className="space-y-2">
              <label className="text-sm font-medium">Trim Edges</label>
              <Select
                value={
                  enhancements.trim === true
                    ? "true"
                    : enhancements.trim?.toString() || "off"
                }
                onValueChange={value => {
                  if (value === "off") {
                    onEnhancementsChange({
                      ...enhancements,
                      trim: undefined,
                    });
                  } else if (value === "true") {
                    onEnhancementsChange({
                      ...enhancements,
                      trim: true,
                    });
                  } else {
                    onEnhancementsChange({
                      ...enhancements,
                      trim: parseInt(value),
                    });
                  }
                }}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="off">Off</SelectItem>
                  <SelectItem value="true">Auto Trim</SelectItem>
                  <SelectItem value="5">Trim Level 5</SelectItem>
                  <SelectItem value="15">Trim Level 15</SelectItem>
                  <SelectItem value="25">Trim Level 25</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Border</span>
                <Switch
                  checked={!!enhancements.border}
                  onCheckedChange={checked => {
                    onEnhancementsChange({
                      ...enhancements,
                      border: checked
                        ? {
                            width: 5,
                            color: borderColor.replace("#", ""),
                          }
                        : undefined,
                    });
                  }}
                />
              </div>

              {enhancements.border && (
                <div className="space-y-3 pl-4 border-l-2 border-muted">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Width (px)</label>
                      <Input
                        type="number"
                        min="1"
                        value={enhancements.border.width}
                        onChange={e => {
                          const width = parseInt(e.target.value);
                          onEnhancementsChange({
                            ...enhancements,
                            border: {
                              ...enhancements.border!,
                              width,
                            },
                          });
                        }}
                        className="h-8"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium">Color</label>
                      <div className="flex gap-2">
                        <Input
                          type="color"
                          value={borderColor}
                          onChange={e => {
                            setBorderColor(e.target.value);
                            onEnhancementsChange({
                              ...enhancements,
                              border: {
                                ...enhancements.border!,
                                color: e.target.value.replace("#", ""),
                              },
                            });
                          }}
                          className="h-8 w-12 p-1"
                        />
                        <Input
                          value={borderColor}
                          onChange={e => {
                            setBorderColor(e.target.value);
                            onEnhancementsChange({
                              ...enhancements,
                              border: {
                                ...enhancements.border!,
                                color: e.target.value.replace("#", ""),
                              },
                            });
                          }}
                          className="h-8 flex-1"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Rotate</label>
              <Select
                value={
                  enhancements.rotate === "auto"
                    ? "auto"
                    : enhancements.rotate?.toString() || "0"
                }
                onValueChange={value => {
                  if (value === "auto") {
                    onEnhancementsChange({
                      ...enhancements,
                      rotate: "auto",
                    });
                  } else {
                    onEnhancementsChange({
                      ...enhancements,
                      rotate: parseInt(value),
                    });
                  }
                }}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0°</SelectItem>
                  <SelectItem value="90">90°</SelectItem>
                  <SelectItem value="180">180°</SelectItem>
                  <SelectItem value="270">270°</SelectItem>
                  <SelectItem value="auto">Auto (EXIF)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Flip</label>
              <Select
                value={enhancements.flip || "none"}
                onValueChange={value => {
                  onEnhancementsChange({
                    ...enhancements,
                    flip:
                      value === "none"
                        ? undefined
                        : (value as "h" | "v" | "h_v"),
                  });
                }}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="h">Horizontal</SelectItem>
                  <SelectItem value="v">Vertical</SelectItem>
                  <SelectItem value="h_v">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Corner Radius</label>
              <Select
                value={
                  enhancements.radius === "max"
                    ? "max"
                    : enhancements.radius?.toString() || "0"
                }
                onValueChange={value => {
                  if (value === "max") {
                    onEnhancementsChange({
                      ...enhancements,
                      radius: "max",
                    });
                  } else {
                    onEnhancementsChange({
                      ...enhancements,
                      radius: parseInt(value),
                    });
                  }
                }}
              >
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">None</SelectItem>
                  <SelectItem value="10">10px</SelectItem>
                  <SelectItem value="20">20px</SelectItem>
                  <SelectItem value="50">50px</SelectItem>
                  <SelectItem value="max">Round</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-foreground/80">
              Background
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Background</span>
                <Switch
                  checked={!!enhancements.background}
                  onCheckedChange={checked => {
                    onEnhancementsChange({
                      ...enhancements,
                      background: checked
                        ? {
                            type: "solid",
                            color: "#000000",
                          }
                        : undefined,
                    });
                  }}
                />
              </div>

              {enhancements.background && (
                <div className="space-y-3 pl-4 border-l-2 border-muted">
                  <div className="space-y-2">
                    <label className="text-xs font-medium">Type</label>
                    <Select
                      value={enhancements.background.type}
                      onValueChange={value => {
                        onEnhancementsChange({
                          ...enhancements,
                          background: {
                            ...enhancements.background!,
                            type: value as "solid" | "blurred" | "dominant",
                          },
                        });
                      }}
                    >
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solid">Solid Color</SelectItem>
                        <SelectItem value="blurred">Blurred</SelectItem>
                        <SelectItem value="dominant">Dominant Color</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {enhancements.background.type === "solid" && (
                    <div className="space-y-2">
                      <label className="text-xs font-medium">Color</label>
                      <Input
                        type="color"
                        value={`#${enhancements.background.color || "000000"}`}
                        onChange={e => {
                          onEnhancementsChange({
                            ...enhancements,
                            background: {
                              ...enhancements.background!,
                              color: e.target.value.replace("#", ""),
                            },
                          });
                        }}
                        className="h-8 w-full"
                      />
                    </div>
                  )}

                  {enhancements.background.type === "blurred" && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-medium">
                          Blur Intensity
                        </label>
                        <Select
                          value={
                            enhancements.background.blurIntensity === "auto"
                              ? "auto"
                              : enhancements.background.blurIntensity?.toString() ||
                                "auto"
                          }
                          onValueChange={value => {
                            onEnhancementsChange({
                              ...enhancements,
                              background: {
                                ...enhancements.background!,
                                blurIntensity:
                                  value === "auto" ? "auto" : parseInt(value),
                              },
                            });
                          }}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto">Auto</SelectItem>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="75">75</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-medium">
                          Brightness
                        </label>
                        <Input
                          type="number"
                          min="-255"
                          max="255"
                          value={enhancements.background.brightness || 0}
                          onChange={e => {
                            const brightness = parseInt(e.target.value);
                            onEnhancementsChange({
                              ...enhancements,
                              background: {
                                ...enhancements.background!,
                                brightness,
                              },
                            });
                          }}
                          className="h-8"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
