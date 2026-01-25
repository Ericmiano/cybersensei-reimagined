import { useState } from "react";
import { Sliders, Palette, User, Volume2, Save, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme, AgentPersonality, ThemeSettings } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

const personalityLabels = {
  formality: { low: "Casual", high: "Professional", icon: "👔" },
  teachingStyle: { low: "Encouraging", high: "Challenging", icon: "📚" },
  humorLevel: { low: "Serious", high: "Playful", icon: "😄" },
  responseLength: { low: "Concise", high: "Detailed", icon: "📝" },
  technicalDepth: { low: "Beginner-friendly", high: "Expert-level", icon: "🔬" },
};

const colorPresets = [
  { name: "Neon Cyan", primary: "cyan", accent: "magenta" },
  { name: "Electric Purple", primary: "purple", accent: "cyan" },
  { name: "Toxic Green", primary: "green", accent: "orange" },
  { name: "Hot Pink", primary: "magenta", accent: "cyan" },
];

export default function SettingsPage() {
  const { theme, setTheme, personality, setPersonality, toggleMode } = useTheme();
  const [localPersonality, setLocalPersonality] = useState<AgentPersonality>(personality);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const handlePersonalityChange = (key: keyof AgentPersonality, value: number[]) => {
    setLocalPersonality((prev) => ({ ...prev, [key]: value[0] }));
  };

  const savePersonality = () => {
    setPersonality(localPersonality);
    toast({
      title: "Personality Saved",
      description: "Your AI sensei's personality has been updated.",
    });
  };

  const resetPersonality = () => {
    const defaults: AgentPersonality = {
      formality: 50,
      teachingStyle: 50,
      humorLevel: 40,
      responseLength: 60,
      technicalDepth: 50,
    };
    setLocalPersonality(defaults);
    setPersonality(defaults);
    toast({
      title: "Personality Reset",
      description: "AI personality restored to defaults.",
    });
  };

  const getPersonalityLabel = (key: keyof typeof personalityLabels, value: number) => {
    const labels = personalityLabels[key];
    if (value < 33) return labels.low;
    if (value > 66) return labels.high;
    return "Balanced";
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-cyber text-3xl font-bold mb-2">
          <span className="text-primary">SETTINGS</span>
        </h1>
        <p className="text-muted-foreground">
          Customize your Cyber Sensei experience.
        </p>
      </div>

      <Tabs defaultValue="personality" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="personality" className="gap-2">
            <Sliders className="h-4 w-4" />
            AI Personality
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="preferences" className="gap-2">
            <User className="h-4 w-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* AI Personality Tab */}
        <TabsContent value="personality">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="font-cyber text-xl text-primary">
                AI PERSONALITY CUSTOMIZATION
              </CardTitle>
              <CardDescription>
                Fine-tune how your Cyber Sensei communicates and teaches.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {(Object.keys(personalityLabels) as Array<keyof typeof personalityLabels>).map(
                (key) => (
                  <div key={key} className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{personalityLabels[key].icon}</span>
                        <Label className="text-base font-medium capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}
                        </Label>
                      </div>
                      <span className="text-sm text-primary font-medium">
                        {getPersonalityLabel(key, localPersonality[key])}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-muted-foreground w-24">
                        {personalityLabels[key].low}
                      </span>
                      <Slider
                        value={[localPersonality[key]]}
                        onValueChange={(value) => handlePersonalityChange(key, value)}
                        max={100}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground w-24 text-right">
                        {personalityLabels[key].high}
                      </span>
                    </div>
                  </div>
                )
              )}

              {/* Preview Box */}
              <Card className="bg-muted/30 border-primary/20 neon-border">
                <CardContent className="p-4">
                  <p className="text-sm text-muted-foreground mb-2">Preview Response Style:</p>
                  <p className="text-foreground">
                    {localPersonality.formality > 66
                      ? "Greetings. I shall provide you with comprehensive cybersecurity guidance."
                      : localPersonality.formality < 33
                      ? "Hey there! Ready to dive into some cool security stuff?"
                      : "Hello! Let's explore cybersecurity together."}
                    {localPersonality.humorLevel > 66 && " 😄 This is going to be fun!"}
                    {localPersonality.technicalDepth > 66 &&
                      " We'll cover advanced concepts including cryptographic protocols and exploit development."}
                  </p>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button onClick={savePersonality} className="flex-1 neon-glow-cyan">
                  <Save className="h-4 w-4 mr-2" />
                  Save Personality
                </Button>
                <Button onClick={resetPersonality} variant="outline" className="flex-1">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="font-cyber text-xl text-primary">
                THEME CUSTOMIZATION
              </CardTitle>
              <CardDescription>Personalize the visual appearance of Cyber Sensei.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dark/Light Mode */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <Label className="text-base font-medium">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle between dark and light themes
                  </p>
                </div>
                <Switch checked={theme.mode === "dark"} onCheckedChange={toggleMode} />
              </div>

              {/* Color Presets */}
              <div>
                <Label className="text-base font-medium mb-4 block">Color Presets</Label>
                <div className="grid grid-cols-2 gap-4">
                  {colorPresets.map((preset) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      className={cn(
                        "h-auto p-4 flex flex-col items-start",
                        "hover:border-primary/50 transition-colors",
                        theme.primaryColor === preset.primary && "border-primary neon-border"
                      )}
                      onClick={() =>
                        setTheme({ ...theme, primaryColor: preset.primary, accentColor: preset.accent })
                      }
                    >
                      <span className="font-medium">{preset.name}</span>
                      <div className="flex gap-2 mt-2">
                        <div
                          className={cn("w-6 h-6 rounded-full", {
                            "bg-neon-cyan": preset.primary === "cyan",
                            "bg-neon-purple": preset.primary === "purple",
                            "bg-neon-green": preset.primary === "green",
                            "bg-neon-magenta": preset.primary === "magenta",
                          })}
                        />
                        <div
                          className={cn("w-6 h-6 rounded-full", {
                            "bg-neon-magenta": preset.accent === "magenta",
                            "bg-neon-cyan": preset.accent === "cyan",
                            "bg-neon-orange": preset.accent === "orange",
                          })}
                        />
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Animation Intensity */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Animation Intensity</Label>
                  <span className="text-sm text-primary">{theme.animationIntensity}%</span>
                </div>
                <Slider
                  value={[theme.animationIntensity]}
                  onValueChange={(value) => setTheme({ ...theme, animationIntensity: value[0] })}
                  max={100}
                  step={10}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtle</span>
                  <span>Dramatic</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="bg-card/50 border-border/50">
            <CardHeader>
              <CardTitle className="font-cyber text-xl text-primary">PREFERENCES</CardTitle>
              <CardDescription>General application settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div>
                  <Label className="text-base font-medium">Enable Animations</Label>
                  <p className="text-sm text-muted-foreground">
                    Show visual animations throughout the app
                  </p>
                </div>
                <Switch checked={animationsEnabled} onCheckedChange={setAnimationsEnabled} />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
                <div className="flex items-center gap-3">
                  <Volume2 className="h-5 w-5 text-primary" />
                  <div>
                    <Label className="text-base font-medium">Sound Effects</Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for notifications and interactions
                    </p>
                  </div>
                </div>
                <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
              </div>

              <div className="p-4 rounded-lg bg-muted/30 border border-dashed border-border">
                <p className="text-sm text-muted-foreground text-center">
                  More preferences coming soon! User accounts, cloud sync, and advanced settings.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
