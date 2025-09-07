"use client";

import {useState} from "react";

import {Pencil, Scissors, Sun} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import {AiMagic} from "@/types/image-transformations";

type AiMagicPanelProps = {
  aiMagic: AiMagic;
  onAiMagicChange: (aiMagic: AiMagic) => void;
};

export function AiMagicPanel({aiMagic, onAiMagicChange}: AiMagicPanelProps) {
  const [backgroundPrompt, setBackgroundPrompt] = useState(
    aiMagic.background?.changePrompt || ""
  );
  const [generativeFillPrompt, setGenerativeFillPrompt] = useState(
    aiMagic.background?.generativeFill?.prompt || ""
  );

  const handleRemoveBackgroundChange = (checked: boolean) => {
    onAiMagicChange({
      ...aiMagic,
      background: {
        ...aiMagic.background,
        remove: checked,
      },
    });
  };

  const handleQualityModeChange = (value: string) => {
    onAiMagicChange({
      ...aiMagic,
      background: {
        ...aiMagic.background,
        mode: value as "standard" | "economy",
      },
    });
  };

  const handleBackgroundPromptChange = (value: string) => {
    setBackgroundPrompt(value);
    onAiMagicChange({
      ...aiMagic,
      background: {
        ...aiMagic.background,
        changePrompt: value,
      },
    });
  };

  const handleGenerativeFillChange = (checked: boolean) => {
    onAiMagicChange({
      ...aiMagic,
      background: {
        ...aiMagic.background,
        generativeFill: checked
          ? {
              prompt: generativeFillPrompt,
              width: 0,
              height: 0,
              cropMode: "pad_resize",
            }
          : undefined,
      },
    });
  };

  const handleGenerativeFillPromptChange = (value: string) => {
    setGenerativeFillPrompt(value);
    if (aiMagic.background?.generativeFill) {
      onAiMagicChange({
        ...aiMagic,
        background: {
          ...aiMagic.background,
          generativeFill: {
            ...aiMagic.background.generativeFill,
            prompt: value,
          },
        },
      });
    }
  };

  const handleResetBackground = () => {
    onAiMagicChange({
      ...aiMagic,
      background: {
        ...aiMagic.background,
        remove: false,
        changePrompt: "",
        generativeFill: undefined,
      },
    });
    setBackgroundPrompt("");
    setGenerativeFillPrompt("");
  };

  return (
    <div className="space-y-4">
      <Accordion
        type="multiple"
        defaultValue={["background"]}
        className="w-full"
      >
        {/* Background Section */}
        <AccordionItem value="background" className="border-none">
          <AccordionTrigger className="flex items-center gap-2 py-3 px-0 hover:no-underline">
            <Scissors className="h-4 w-4" />
            <span className="text-sm font-medium">Background</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Remove Background */}
            <div className="flex items-center justify-between">
              <span className="text-sm">Remove Background</span>
              <Switch
                checked={aiMagic.background?.remove || false}
                onCheckedChange={handleRemoveBackgroundChange}
              />
            </div>

            {/* Quality Mode */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quality Mode</label>
              <Select
                value={aiMagic.background?.mode || "standard"}
                onValueChange={handleQualityModeChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select quality mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">
                    Standard (High Quality)
                  </SelectItem>
                  <SelectItem value="economy">Economy (Fast)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Change Background (AI) */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Change Background (AI)
              </label>
              <Input
                placeholder="Describe the new background (e.g., 'tropical beach at sunset')"
                value={backgroundPrompt}
                onChange={e => handleBackgroundPromptChange(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm">Generative Fill</span>
              <Switch
                checked={!!aiMagic.background?.generativeFill}
                onCheckedChange={handleGenerativeFillChange}
              />
            </div>

            {/* Generative Fill Prompt Input - Only show when switch is on */}
            {aiMagic.background?.generativeFill && (
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Generative Fill Prompt
                </label>
                <Input
                  placeholder="Describe what to generate (e.g., 'beautiful sunset sky')"
                  value={generativeFillPrompt}
                  onChange={e =>
                    handleGenerativeFillPromptChange(e.target.value)
                  }
                  className="w-full"
                />
              </div>
            )}

            {/* Reset Background */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleResetBackground}
              className="w-full"
            >
              Reset Background
            </Button>
          </AccordionContent>
        </AccordionItem>

        {/* AI Editing Section */}
        <AccordionItem value="ai-editing" className="border-none">
          <AccordionTrigger className="flex items-center gap-2 py-3 px-0 hover:no-underline">
            <Pencil className="h-4 w-4" />
            <span className="text-sm font-medium">AI Editing</span>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Edit Image */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Edit Image</span>
                <Switch
                  checked={!!aiMagic.editing?.prompt}
                  onCheckedChange={checked => {
                    onAiMagicChange({
                      ...aiMagic,
                      editing: {
                        ...aiMagic.editing,
                        prompt: checked ? "" : undefined,
                      },
                    });
                  }}
                />
              </div>

              {aiMagic.editing?.prompt !== undefined && (
                <div className="space-y-2 pl-4 border-l-2 border-muted">
                  <label className="text-sm font-medium">Edit Prompt</label>
                  <Input
                    placeholder="Describe what to change (e.g., 'add some flair to this plain cake')"
                    value={aiMagic.editing.prompt || ""}
                    onChange={e => {
                      onAiMagicChange({
                        ...aiMagic,
                        editing: {
                          ...aiMagic.editing,
                          prompt: e.target.value,
                        },
                      });
                    }}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Retouch */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm font-medium">Retouch</span>
                <p className="text-xs text-muted-foreground">
                  Improve image quality (max 16MP)
                </p>
              </div>
              <Switch
                checked={!!aiMagic.editing?.retouch}
                onCheckedChange={checked => {
                  onAiMagicChange({
                    ...aiMagic,
                    editing: {
                      ...aiMagic.editing,
                      retouch: checked,
                    },
                  });
                }}
              />
            </div>

            {/* Upscale */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm font-medium">Upscale</span>
                <p className="text-xs text-muted-foreground">
                  Increase resolution to 16MP (max 16MP input)
                </p>
              </div>
              <Switch
                checked={!!aiMagic.editing?.upscale}
                onCheckedChange={checked => {
                  onAiMagicChange({
                    ...aiMagic,
                    editing: {
                      ...aiMagic.editing,
                      upscale: checked,
                    },
                  });
                }}
              />
            </div>

            {/* Generate Image */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Generate Image</span>
                <Switch
                  checked={!!aiMagic.generation?.textPrompt}
                  onCheckedChange={checked => {
                    onAiMagicChange({
                      ...aiMagic,
                      generation: {
                        ...aiMagic.generation,
                        textPrompt: checked ? "" : undefined,
                      },
                    });
                  }}
                />
              </div>

              {aiMagic.generation?.textPrompt !== undefined && (
                <div className="space-y-2 pl-4 border-l-2 border-muted">
                  <label className="text-sm font-medium">
                    Generation Prompt
                  </label>
                  <Input
                    placeholder="Describe the image to generate (e.g., 'A man eating a burger')"
                    value={aiMagic.generation.textPrompt || ""}
                    onChange={e => {
                      onAiMagicChange({
                        ...aiMagic,
                        generation: {
                          ...aiMagic.generation,
                          textPrompt: e.target.value,
                        },
                      });
                    }}
                    className="w-full"
                  />
                </div>
              )}
            </div>

            {/* Generate Variations */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-sm font-medium">Generate Variations</span>
                <p className="text-xs text-muted-foreground">
                  Create variations with slight changes
                </p>
              </div>
              <Switch
                checked={!!aiMagic.generation?.variation}
                onCheckedChange={checked => {
                  onAiMagicChange({
                    ...aiMagic,
                    generation: {
                      ...aiMagic.generation,
                      variation: checked,
                    },
                  });
                }}
              />
            </div>

            {/* Smart Cropping */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Smart Cropping</span>
                <Switch
                  checked={!!aiMagic.cropping}
                  onCheckedChange={checked => {
                    onAiMagicChange({
                      ...aiMagic,
                      cropping: checked
                        ? {
                            type: "smart",
                          }
                        : undefined,
                    });
                  }}
                />
              </div>

              {aiMagic.cropping && (
                <div className="space-y-3 pl-4 border-l-2 border-muted">
                  {/* Crop Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Crop Type</label>
                    <Select
                      value={aiMagic.cropping.type || "smart"}
                      onValueChange={value => {
                        onAiMagicChange({
                          ...aiMagic,
                          cropping: {
                            ...aiMagic.cropping,
                            type: value as "smart" | "face" | "object",
                            objectName: value === "object" ? "" : undefined,
                          },
                        });
                      }}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="smart">
                          Smart Crop (fo-auto)
                        </SelectItem>
                        <SelectItem value="face">
                          Face Crop (fo-face)
                        </SelectItem>
                        <SelectItem value="object">
                          Object Crop (fo-object)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Object Name for Object Crop */}
                  {aiMagic.cropping.type === "object" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Object Name</label>
                      <Input
                        placeholder="Enter object name (e.g., 'dog', 'car', 'person')"
                        value={aiMagic.cropping.objectName || ""}
                        onChange={e => {
                          onAiMagicChange({
                            ...aiMagic,
                            cropping: {
                              ...aiMagic.cropping,
                              objectName: e.target.value,
                            },
                          });
                        }}
                        className="w-full"
                      />
                    </div>
                  )}

                  {/* Zoom */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Zoom ({aiMagic.cropping.zoom || 1})
                    </label>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.1"
                      value={aiMagic.cropping.zoom || 1}
                      onChange={e => {
                        const zoom = parseFloat(e.target.value);
                        onAiMagicChange({
                          ...aiMagic,
                          cropping: {
                            ...aiMagic.cropping,
                            zoom,
                          },
                        });
                      }}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0.5x</span>
                      <span>3x</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Shadows & Lighting Section */}
        <AccordionItem value="shadows-lighting" className="border-none">
          <AccordionTrigger className="flex items-center gap-2 py-3 px-0 hover:no-underline">
            <Sun className="h-4 w-4" />
            <span className="text-sm font-medium">Shadows & Lighting</span>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            {/* Drop Shadow */}
            <ScrollArea className="h-80 w-full">
              <div className="space-y-3 pr-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Drop Shadow</span>
                  <Switch
                    checked={!!aiMagic.shadowLighting?.dropShadow}
                    onCheckedChange={checked => {
                      onAiMagicChange({
                        ...aiMagic,
                        shadowLighting: {
                          ...aiMagic.shadowLighting,
                          dropShadow: checked
                            ? {
                                blur: 10,
                                saturation: 30,
                                offsetX: 2,
                                offsetY: 2,
                              }
                            : undefined,
                        },
                      });
                    }}
                  />
                </div>

                {aiMagic.shadowLighting?.dropShadow && (
                  <div className="space-y-3 pl-4 border-l-2 border-muted">
                    {/* Blur */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Blur ({aiMagic.shadowLighting.dropShadow.blur || 10})
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="15"
                        value={aiMagic.shadowLighting.dropShadow.blur || 10}
                        onChange={e => {
                          const blur = parseInt(e.target.value);
                          onAiMagicChange({
                            ...aiMagic,
                            shadowLighting: {
                              ...aiMagic.shadowLighting,
                              dropShadow: {
                                ...(aiMagic.shadowLighting?.dropShadow ?? {}),
                                blur,
                              },
                            },
                          });
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>15</span>
                      </div>
                    </div>

                    {/* Saturation */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Saturation (
                        {aiMagic.shadowLighting.dropShadow.saturation || 30}%)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={
                          aiMagic.shadowLighting.dropShadow.saturation || 30
                        }
                        onChange={e => {
                          const saturation = parseInt(e.target.value);
                          onAiMagicChange({
                            ...aiMagic,
                            shadowLighting: {
                              ...aiMagic.shadowLighting,
                              dropShadow: {
                                ...(aiMagic.shadowLighting?.dropShadow ?? {}),
                                saturation,
                              },
                            },
                          });
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* X Offset */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        X Offset (
                        {aiMagic.shadowLighting.dropShadow.offsetX || 2}
                        %)
                      </label>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        value={aiMagic.shadowLighting.dropShadow.offsetX || 2}
                        onChange={e => {
                          const offsetX = parseInt(e.target.value);
                          onAiMagicChange({
                            ...aiMagic,
                            shadowLighting: {
                              ...aiMagic.shadowLighting,
                              dropShadow: {
                                ...(aiMagic.shadowLighting?.dropShadow ?? {}),
                                offsetX,
                              },
                            },
                          });
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>-100%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Y Offset */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Y Offset (
                        {aiMagic.shadowLighting.dropShadow.offsetY || 2}
                        %)
                      </label>
                      <input
                        type="range"
                        min="-100"
                        max="100"
                        value={aiMagic.shadowLighting.dropShadow.offsetY || 2}
                        onChange={e => {
                          const offsetY = parseInt(e.target.value);
                          onAiMagicChange({
                            ...aiMagic,
                            shadowLighting: {
                              ...aiMagic.shadowLighting,
                              dropShadow: {
                                ...(aiMagic.shadowLighting?.dropShadow ?? {}),
                                offsetY,
                              },
                            },
                          });
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>-100%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
