"use client";

import {useState} from "react";

import {Image, Square, Trash2, Type} from "lucide-react";

import {Button} from "@/components/ui/button";
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
import {
  ImageOverlay,
  Overlay,
  SolidBlock,
  TextOverlay,
} from "@/types/image-transformations";

type OverlaysPanelProps = {
  overlays: Overlay[];
  onOverlaysChange: (overlays: Overlay[]) => void;
};

const FONT_FAMILIES = [
  "AbrilFatFace",
  "Amaranth",
  "Arvo",
  "Audiowide",
  "Chivo",
  "Crimson Text",
  "exo",
  "Fredoka One",
  "Gravitas One",
  "Kanit",
  "Lato",
  "Lobster",
  "Lora",
  "Monoton",
  "Montserrat",
  "PT Mono",
  "PT_Serif",
  "Open Sans",
  "Roboto",
  "Old Standard",
  "Ubuntu",
  "Vollkorn",
];

export function OverlaysPanel({
  overlays,
  onOverlaysChange,
}: OverlaysPanelProps) {
  const [expandedOverlay, setExpandedOverlay] = useState<number | null>(null);

  const addOverlay = (type: "image" | "text" | "solid") => {
    let newOverlay: Overlay;

    switch (type) {
      case "image":
        newOverlay = {
          type: "image",
          src: "sample-image.jpg",
          width: 200,
          height: 200,
        } as ImageOverlay;
        break;
      case "text":
        newOverlay = {
          type: "text",
          text: "Your Text Here",
          fontSize: 24,
          color: "#FFFFFF",
          backgroundColor: "#000000",
        } as TextOverlay;
        break;
      case "solid":
        newOverlay = {
          type: "solid",
          color: "#FF0000",
          width: 200,
          height: 100,
        } as SolidBlock;
        break;
    }

    onOverlaysChange([...overlays, newOverlay]);
    setExpandedOverlay(overlays.length);
  };

  const removeOverlay = (index: number) => {
    const newOverlays = overlays.filter((_, i) => i !== index);
    onOverlaysChange(newOverlays);
    if (expandedOverlay === index) {
      setExpandedOverlay(null);
    } else if (expandedOverlay !== null && expandedOverlay > index) {
      setExpandedOverlay(expandedOverlay - 1);
    }
  };

  const updateOverlay = (index: number, updates: any) => {
    const newOverlays = overlays.map((overlay, i) =>
      i === index ? {...overlay, ...updates} : overlay
    );
    onOverlaysChange(newOverlays);
  };

  const getOverlayIcon = (overlay: Overlay) => {
    switch (overlay.type) {
      case "image":
        return <Image className="h-4 w-4" />;
      case "text":
        return <Type className="h-4 w-4" />;
      case "solid":
        return <Square className="h-4 w-4" />;
      default:
        return <Square className="h-4 w-4" />;
    }
  };

  const getOverlayTitle = (overlay: Overlay, index: number) => {
    switch (overlay.type) {
      case "image":
        return `Image Overlay ${index + 1}${overlay.src ? ` - ${overlay.src}` : ""}`;
      case "text":
        return `Text Overlay ${index + 1} - "${overlay.text}"`;
      case "solid":
        return `Solid Block ${index + 1} - ${overlay.color}`;
      default:
        return `Overlay ${index + 1}`;
    }
  };

  return (
    <div className="space-y-4">
      {/* Add Overlay Buttons */}
      <div className="flex flex-col gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => addOverlay("image")}
          className="flex items-center gap-2"
        >
          <Image className="h-4 w-4" />
          Add Image
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addOverlay("text")}
          className="flex items-center gap-2"
        >
          <Type className="h-4 w-4" />
          Add Text
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => addOverlay("solid")}
          className="flex items-center gap-2"
        >
          <Square className="h-4 w-4" />
          Add Block
        </Button>
      </div>

      {/* Overlays List */}
      <ScrollArea className="h-96 w-full">
        <div className="space-y-3 pr-4">
          {overlays.map((overlay, index) => (
            <div key={index} className="border rounded-lg p-3 space-y-3">
              {/* Overlay Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getOverlayIcon(overlay)}
                  <span className="text-sm font-medium">
                    {getOverlayTitle(overlay, index)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setExpandedOverlay(
                        expandedOverlay === index ? null : index
                      )
                    }
                  >
                    {expandedOverlay === index ? "Collapse" : "Expand"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeOverlay(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Expanded Overlay Controls */}
              {expandedOverlay === index && (
                <div className="space-y-4 pt-3 border-t">
                  {overlay.type === "image" && (
                    <div className="space-y-3">
                      {/* Image Source */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Image Source <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder="Enter image path (e.g., logo.png, sample.jpg)"
                          value={overlay.src || ""}
                          onChange={e =>
                            updateOverlay(index, {src: e.target.value})
                          }
                          className={
                            !overlay.src || overlay.src.trim() === ""
                              ? "border-red-300"
                              : ""
                          }
                        />
                        <div className="text-xs text-gray-500 space-y-1">
                          <p>
                            💡 <strong>Recommended:</strong> Upload images to
                            your ImageKit media library
                          </p>
                          <p>
                            📁 <strong>Simple paths:</strong> logo.png,
                            sample.jpg, icon.svg
                          </p>
                          <p>
                            ⚠️ <strong>Avoid:</strong> Long external URLs with
                            query parameters
                          </p>
                        </div>
                        {(!overlay.src || overlay.src.trim() === "") && (
                          <p className="text-xs text-red-500">
                            Image source is required
                          </p>
                        )}
                        {overlay.src && overlay.src.length > 500 && (
                          <p className="text-xs text-yellow-600">
                            ⚠️ Very long URL detected. This might cause issues
                            with ImageKit.
                          </p>
                        )}
                        {overlay.src &&
                          overlay.src.includes("istockphoto.com") && (
                            <div className="text-xs text-yellow-600">
                              <p>
                                External stock photo URLs may not work
                                reliably with ImageKit overlays.
                              </p>
                              <div className="mt-2 space-y-1">
                                <button
                                  onClick={() =>
                                    updateOverlay(index, {
                                      src: "sample-image.jpg",
                                    })
                                  }
                                  className="block w-full px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200"
                                >
                                  Use simple example instead
                                </button>
                                <p className="text-xs text-gray-500">
                                   Better: Upload images to your ImageKit
                                  media library
                                </p>
                              </div>
                            </div>
                          )}
                        {overlay.src && (
                          <div className="mt-2">
                            <img
                              src={
                                overlay.src.startsWith("http")
                                  ? overlay.src
                                  : `https://ik.imagekit.io/jb2brt3jy/${overlay.src}`
                              }
                              alt="Overlay preview"
                              className="max-w-full max-h-40 rounded border"
                              onError={e => {
                                e.currentTarget.src =
                                  "https://via.placeholder.com/200x200?text=Invalid+URL";
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {/* Dimensions */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium">Width</label>
                          <Input
                            type="number"
                            value={overlay.width || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                width: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="200"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium">Height</label>
                          <Input
                            type="number"
                            value={overlay.height || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                height: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="200"
                          />
                        </div>
                      </div>

                      {/* Position */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium">
                            X Position
                          </label>
                          <Input
                            type="number"
                            value={overlay.x || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                x: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium">
                            Y Position
                          </label>
                          <Input
                            type="number"
                            value={overlay.y || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                y: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                      </div>

                      {/* Opacity */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Opacity ({overlay.opacity || 100}%)
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={overlay.opacity || 100}
                          onChange={e =>
                            updateOverlay(index, {
                              opacity: parseInt(e.target.value),
                            })
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>

                      {/* Effects */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Grayscale</span>
                          <Switch
                            checked={!!overlay.grayscale}
                            onCheckedChange={checked =>
                              updateOverlay(index, {grayscale: checked})
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Contrast</span>
                          <Switch
                            checked={!!overlay.contrast}
                            onCheckedChange={checked =>
                              updateOverlay(index, {contrast: checked})
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {overlay.type === "text" && (
                    <div className="space-y-3">
                      {/* Text Content */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Text Content <span className="text-red-500">*</span>
                        </label>
                        <Input
                          placeholder="Enter text to overlay"
                          value={overlay.text || ""}
                          onChange={e =>
                            updateOverlay(index, {text: e.target.value})
                          }
                          className={
                            !overlay.text || overlay.text.trim() === ""
                              ? "border-red-300"
                              : ""
                          }
                        />
                        {(!overlay.text || overlay.text.trim() === "") && (
                          <p className="text-xs text-red-500">
                            Text content is required
                          </p>
                        )}
                      </div>

                      {/* Font Settings */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium">
                            Font Size
                          </label>
                          <Input
                            type="number"
                            value={overlay.fontSize || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                fontSize: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="24"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium">
                            Font Family
                          </label>
                          <Select
                            value={overlay.fontFamily || "Roboto"}
                            onValueChange={value =>
                              updateOverlay(index, {fontFamily: value})
                            }
                          >
                            <SelectTrigger className="h-8">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {FONT_FAMILIES.map(font => (
                                <SelectItem key={font} value={font}>
                                  {font}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      {/* Colors */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium">
                            Text Color
                          </label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={overlay.color || "#FFFFFF"}
                              onChange={e =>
                                updateOverlay(index, {color: e.target.value})
                              }
                              className="h-8 w-12 p-1"
                            />
                            <Input
                              value={overlay.color || "#FFFFFF"}
                              onChange={e =>
                                updateOverlay(index, {color: e.target.value})
                              }
                              className="h-8 flex-1"
                              placeholder="#FFFFFF"
                            />
                          </div>
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium">
                            Background Color
                          </label>
                          <div className="flex gap-2">
                            <Input
                              type="color"
                              value={overlay.backgroundColor || "#000000"}
                              onChange={e =>
                                updateOverlay(index, {
                                  backgroundColor: e.target.value,
                                })
                              }
                              className="h-8 w-12 p-1"
                            />
                            <Input
                              value={overlay.backgroundColor || "#000000"}
                              onChange={e =>
                                updateOverlay(index, {
                                  backgroundColor: e.target.value,
                                })
                              }
                              className="h-8 flex-1"
                              placeholder="#000000"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Position */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium">
                            X Position
                          </label>
                          <Input
                            type="number"
                            value={overlay.x || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                x: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium">
                            Y Position
                          </label>
                          <Input
                            type="number"
                            value={overlay.y || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                y: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                      </div>

                      {/* Typography */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Typography
                        </label>
                        <div className="flex gap-4 flex-wrap">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={overlay.typography?.bold || false}
                              onChange={e =>
                                updateOverlay(index, {
                                  typography: {
                                    ...overlay.typography,
                                    bold: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-gray-300"
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Bold
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={overlay.typography?.italic || false}
                              onChange={e =>
                                updateOverlay(index, {
                                  typography: {
                                    ...overlay.typography,
                                    italic: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-gray-300"
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Italic
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={
                                overlay.typography?.strikethrough || false
                              }
                              onChange={e =>
                                updateOverlay(index, {
                                  typography: {
                                    ...overlay.typography,
                                    strikethrough: e.target.checked,
                                  },
                                })
                              }
                              className="rounded border-gray-300"
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              Strikethrough
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {overlay.type === "solid" && (
                    <div className="space-y-3">
                      {/* Color */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Color</label>
                        <div className="flex gap-2">
                          <Input
                            type="color"
                            value={overlay.color}
                            onChange={e =>
                              updateOverlay(index, {color: e.target.value})
                            }
                            className="h-8 w-12 p-1"
                          />
                          <Input
                            value={overlay.color}
                            onChange={e =>
                              updateOverlay(index, {color: e.target.value})
                            }
                            className="h-8 flex-1"
                            placeholder="#FF0000"
                          />
                        </div>
                      </div>

                      {/* Dimensions */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium">Width</label>
                          <Input
                            type="number"
                            value={overlay.width || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                width: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="200"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium">Height</label>
                          <Input
                            type="number"
                            value={overlay.height || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                height: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="100"
                          />
                        </div>
                      </div>

                      {/* Position */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-medium">
                            X Position
                          </label>
                          <Input
                            type="number"
                            value={overlay.x || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                x: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-medium">
                            Y Position
                          </label>
                          <Input
                            type="number"
                            value={overlay.y || ""}
                            onChange={e =>
                              updateOverlay(index, {
                                y: e.target.value
                                  ? parseInt(e.target.value)
                                  : undefined,
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                      </div>

                      {/* Opacity */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Opacity ({overlay.opacity || 9})
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="9"
                          value={overlay.opacity || 9}
                          onChange={e =>
                            updateOverlay(index, {
                              opacity: parseInt(e.target.value),
                            })
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {overlays.length === 0 && (
            <div className="text-center text-muted-foreground py-8">
              <p className="text-sm">No overlays added yet</p>
              <p className="text-xs">
                Click the buttons above to add image, text, or solid color
                overlays
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
