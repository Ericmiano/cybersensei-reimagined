import { useState, lazy, Suspense } from "react";
import { Sliders, Palette, User, Bell, Keyboard as KeyboardIcon, Save, RotateCcw, Sparkles, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme, AgentPersonality } from "@/contexts/ThemeContext";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { AnimatedSlider } from "@/components/ui/animated-slider";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load heavy components for better performance
const UserProfileSettings = lazy(() => import("@/components/settings/UserProfileSettings"));
const NotificationSettings = lazy(() => import("@/components/settings/NotificationSettings"));
const KeyboardShortcuts = lazy(() => import("@/components/settings/KeyboardShortcuts"));
const ContentIngestion = lazy(() => import("@/components/content/ContentIngestion"));

const LoadingFallback = () => (
  <div className="space-y-4">
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-32 w-full" />
    <Skeleton className="h-24 w-full" />
  </div>
);

const personalityConfig = {
  formality: { 
    low: "Casual", 
    high: "Professional", 
    icon: "👔",
    glowColor: "cyan" as const,
    description: "How formal should the AI's language be?"
  },
  teachingStyle: { 
    low: "Encouraging", 
    high: "Challenging", 
    icon: "📚",
    glowColor: "purple" as const,
    description: "Prefer gentle guidance or tough love?"
  },
  humorLevel: { 
    low: "Serious", 
    high: "Playful", 
    icon: "😄",
    glowColor: "orange" as const,
    description: "How much humor in responses?"
  },
  responseLength: { 
    low: "Concise", 
    high: "Detailed", 
    icon: "📝",
    glowColor: "green" as const,
    description: "Short answers or comprehensive explanations?"
  },
  technicalDepth: { 
    low: "Beginner", 
    high: "Expert", 
    icon: "🔬",
    glowColor: "magenta" as const,
    description: "Adjust technical complexity level"
  },
};

const colorPresets = [
  { name: "Neon Cyan", primary: "cyan", accent: "magenta", gradient: "from-neon-cyan to-neon-magenta" },
  { name: "Electric Purple", primary: "purple", accent: "cyan", gradient: "from-neon-purple to-neon-cyan" },
  { name: "Toxic Green", primary: "green", accent: "orange", gradient: "from-neon-green to-neon-orange" },
  { name: "Hot Pink", primary: "magenta", accent: "cyan", gradient: "from-neon-magenta to-neon-cyan" },
];

export default function SettingsPage() {
  const { theme, setTheme, personality, setPersonality, toggleMode } = useTheme();
  const [localPersonality, setLocalPersonality] = useState<AgentPersonality>(personality);

  const handlePersonalityChange = (key: keyof AgentPersonality, value: number[]) => {
    setLocalPersonality((prev) => ({ ...prev, [key]: value[0] }));
  };

  const savePersonality = () => {
    setPersonality(localPersonality);
    toast({
      title: "✨ Personality Saved",
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

  const getPersonalityLabel = (key: keyof typeof personalityConfig, value: number) => {
    const config = personalityConfig[key];
    if (value < 33) return config.low;
    if (value > 66) return config.high;
    return "Balanced";
  };

  const hasPersonalityChanges = JSON.stringify(localPersonality) !== JSON.stringify(personality);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-slide-up">
        <h1 className="font-cyber text-3xl font-bold mb-2 flex items-center gap-3">
          <span className="text-primary animate-text-glow">SETTINGS</span>
          <Sparkles className="h-6 w-6 text-secondary animate-pulse-glow" />
        </h1>
        <p className="text-muted-foreground">
          Customize your Cyber Sensei experience.
        </p>
      </div>

      <Tabs defaultValue="personality" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 gap-1 flex-wrap h-auto">
          <TabsTrigger value="personality" className="gap-2 data-[state=active]:neon-glow-cyan">
            <Sliders className="h-4 w-4" />
            AI Personality
          </TabsTrigger>
          <TabsTrigger value="appearance" className="gap-2 data-[state=active]:neon-glow-cyan">
            <Palette className="h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2 data-[state=active]:neon-glow-cyan">
            <Upload className="h-4 w-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="profile" className="gap-2 data-[state=active]:neon-glow-cyan">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2 data-[state=active]:neon-glow-cyan">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="shortcuts" className="gap-2 data-[state=active]:neon-glow-cyan">
            <KeyboardIcon className="h-4 w-4" />
            Shortcuts
          </TabsTrigger>
        </TabsList>

        {/* AI Personality Tab */}
        <TabsContent value="personality" className="animate-fade-in">
          <Card className="bg-card/50 border-border/50 interactive-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-cyber text-xl text-primary">
                    AI PERSONALITY CUSTOMIZATION
                  </CardTitle>
                  <CardDescription>
                    Fine-tune how your Cyber Sensei communicates and teaches.
                  </CardDescription>
                </div>
                {hasPersonalityChanges && (
                  <div className="flex gap-2 animate-fade-in">
                    <Button onClick={resetPersonality} variant="outline" size="sm">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                    <Button onClick={savePersonality} size="sm" className="neon-glow-cyan">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              {(Object.keys(personalityConfig) as Array<keyof typeof personalityConfig>).map(
                (key, index) => {
                  const config = personalityConfig[key];
                  return (
                    <div 
                      key={key} 
                      className="space-y-4 p-4 rounded-lg bg-muted/20 border border-border/30 hover:border-primary/30 transition-all animate-slide-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl animate-float" style={{ animationDelay: `${index * 200}ms` }}>
                            {config.icon}
                          </span>
                          <div>
                            <Label className="text-base font-medium capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Label>
                            <p className="text-xs text-muted-foreground">{config.description}</p>
                          </div>
                        </div>
                        <span className={cn(
                          "text-sm font-medium px-3 py-1 rounded-full transition-all",
                          "bg-primary/10 text-primary border border-primary/20"
                        )}>
                          {getPersonalityLabel(key, localPersonality[key])}
                        </span>
                      </div>
                      <AnimatedSlider
                        value={[localPersonality[key]]}
                        onValueChange={(value) => handlePersonalityChange(key, value)}
                        max={100}
                        step={1}
                        lowLabel={config.low}
                        highLabel={config.high}
                        glowColor={config.glowColor}
                        showValue={false}
                      />
                    </div>
                  );
                }
              )}

              {/* Live Preview Box */}
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent animate-border-flow" />
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      🤖
                    </div>
                    <span className="font-cyber text-sm text-primary">LIVE PREVIEW</span>
                  </div>
                  <p className="text-foreground leading-relaxed">
                    {localPersonality.formality > 66
                      ? "Greetings, cyber warrior. I shall provide you with comprehensive cybersecurity guidance tailored to your expertise level."
                      : localPersonality.formality < 33
                      ? "Hey there! 👋 Ready to dive into some cool security stuff? Let's make hacking fun!"
                      : "Hello! Let's explore cybersecurity together. I'm here to help you learn."}
                    {localPersonality.humorLevel > 66 && " 😄 Don't worry, we'll have some fun along the way!"}
                    {localPersonality.technicalDepth > 66 &&
                      " We'll cover advanced concepts including cryptographic protocols, exploit development, and zero-day vulnerabilities."}
                    {localPersonality.responseLength > 66 &&
                      " I'll make sure to give you all the context and details you need to fully understand each topic."}
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="animate-fade-in">
          <Card className="bg-card/50 border-border/50 interactive-card">
            <CardHeader>
              <CardTitle className="font-cyber text-xl text-primary">
                THEME CUSTOMIZATION
              </CardTitle>
              <CardDescription>Personalize the visual appearance of Cyber Sensei.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Dark/Light Mode */}
              <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/40 transition-colors">
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
                  {colorPresets.map((preset, index) => (
                    <Button
                      key={preset.name}
                      variant="outline"
                      className={cn(
                        "h-auto p-4 flex flex-col items-start relative overflow-hidden",
                        "hover:border-primary/50 transition-all hover-lift",
                        "animate-slide-up",
                        theme.primaryColor === preset.primary && "border-primary neon-border"
                      )}
                      style={{ animationDelay: `${index * 100}ms` }}
                      onClick={() =>
                        setTheme({ ...theme, primaryColor: preset.primary, accentColor: preset.accent })
                      }
                    >
                      <div className={cn(
                        "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r",
                        preset.gradient
                      )} />
                      <span className="font-medium mt-1">{preset.name}</span>
                      <div className="flex gap-2 mt-2">
                        <div
                          className={cn("w-6 h-6 rounded-full transition-transform hover:scale-110", {
                            "bg-neon-cyan": preset.primary === "cyan",
                            "bg-neon-purple": preset.primary === "purple",
                            "bg-neon-green": preset.primary === "green",
                            "bg-neon-magenta": preset.primary === "magenta",
                          })}
                        />
                        <div
                          className={cn("w-6 h-6 rounded-full transition-transform hover:scale-110", {
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
              <div className="p-4 rounded-lg bg-muted/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base font-medium">Animation Intensity</Label>
                    <p className="text-sm text-muted-foreground">Control the amount of visual effects</p>
                  </div>
                  <span className="text-sm text-primary font-medium">{theme.animationIntensity}%</span>
                </div>
                <AnimatedSlider
                  value={[theme.animationIntensity]}
                  onValueChange={(value) => setTheme({ ...theme, animationIntensity: value[0] })}
                  max={100}
                  step={10}
                  lowLabel="Subtle"
                  highLabel="Dramatic"
                  glowColor="purple"
                  showValue={false}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Ingestion Tab */}
        <TabsContent value="content" className="animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            <ContentIngestion />
          </Suspense>
        </TabsContent>

        {/* Profile Tab */}
        <TabsContent value="profile" className="animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            <UserProfileSettings />
          </Suspense>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            <NotificationSettings />
          </Suspense>
        </TabsContent>

        {/* Shortcuts Tab */}
        <TabsContent value="shortcuts" className="animate-fade-in">
          <Suspense fallback={<LoadingFallback />}>
            <KeyboardShortcuts />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
