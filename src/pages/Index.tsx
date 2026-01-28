import { Shield, Zap, MessageSquare, BookOpen, BarChart3, ArrowRight, PlayCircle, TrendingUp, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { useUserProgress } from "@/contexts/UserProgressContext";

const features = [
  {
    icon: MessageSquare,
    title: "AI Chat Interface",
    description: "Interact with your cybersecurity sensei for personalized guidance and answers.",
    link: "/chat",
    color: "primary",
  },
  {
    icon: BookOpen,
    title: "Training Modules",
    description: "Master cybersecurity concepts through interactive courses and challenges.",
    link: "/training",
    color: "secondary",
  },
  {
    icon: BarChart3,
    title: "Progress Analytics",
    description: "Track your learning journey with detailed insights and statistics.",
    link: "/analytics",
    color: "accent",
  },
];

const Index = () => {
  const { progress } = useUserProgress();
  
  // Find the next lesson to continue
  const getNextLesson = () => {
    const inProgressModules = [
      { moduleId: "1", moduleName: "Cybersecurity Fundamentals", lessonId: "1-1" },
      { moduleId: "4", moduleName: "Ethical Hacking", lessonId: "4-1" },
    ];
    
    // Check user progress for incomplete lessons
    for (const module of inProgressModules) {
      const completedInModule = progress.lessonsCompleted.filter(
        l => l.moduleId === module.moduleId && l.completed
      );
      if (completedInModule.length < 12) { // Less than total lessons
        return module;
      }
    }
    return inProgressModules[0];
  };

  const nextLesson = getNextLesson();
  const completedLessons = progress.lessonsCompleted.filter(l => l.completed).length;

  return (
    <div className="min-h-full">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 gradient-cyber opacity-50" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-150" />
              <Shield className="relative h-24 w-24 text-primary animate-pulse-glow" />
              <Zap className="absolute -bottom-2 -right-2 h-10 w-10 text-secondary animate-neon-flicker" />
            </div>
          </div>

          {/* Title */}
          <h1 className="font-cyber text-5xl md:text-7xl font-bold mb-4 tracking-wider">
            <span className="text-primary neon-text-cyan">CYBER</span>
            <span className="text-secondary neon-text-magenta ml-4">SENSEI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your AI-powered cybersecurity mentor. Learn, train, and master the art of digital defense.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className={cn(
                "font-cyber text-lg px-8 py-6",
                "bg-primary hover:bg-primary/90",
                "neon-glow-cyan transition-all duration-300",
                "hover:scale-105"
              )}
            >
              <Link to="/chat">
                <MessageSquare className="mr-2 h-5 w-5" />
                Start Training
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className={cn(
                "font-cyber text-lg px-8 py-6",
                "border-secondary/50 hover:border-secondary",
                "hover:bg-secondary/10 hover:text-secondary",
                "transition-all duration-300"
              )}
            >
              <Link to="/training">
                <BookOpen className="mr-2 h-5 w-5" />
                Browse Modules
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Continue Learning Section */}
      {completedLessons > 0 && (
        <section className="py-8 px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-card/50 border-primary/30 neon-border interactive-card overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-magenta animate-border-flow" />
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center animate-glow-pulse">
                      <PlayCircle className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Continue where you left off</p>
                      <h3 className="font-cyber text-lg text-primary">{nextLesson.moduleName}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Progress value={(completedLessons / 50) * 100} className="w-32 h-2" />
                        <span className="text-xs text-muted-foreground">{completedLessons} lessons completed</span>
                      </div>
                    </div>
                  </div>
                  <Button asChild className="neon-glow-cyan font-cyber">
                    <Link to={`/training/${nextLesson.moduleId}/lesson/${nextLesson.lessonId}`}>
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Quick Stats for Returning Users */}
      {progress.xp > 0 && (
        <section className="py-4 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Total XP", value: progress.xp.toLocaleString(), icon: Zap },
                { label: "Current Streak", value: `${progress.currentStreak} days`, icon: TrendingUp },
                { label: "Level", value: progress.level.toString(), icon: Sparkles },
              ].map((stat, index) => (
                <Card
                  key={stat.label}
                  className="bg-card/30 border-border/30 p-4 text-center animate-slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <stat.icon className="h-5 w-5 text-primary mx-auto mb-2" />
                  <div className="font-cyber text-xl text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-cyber text-3xl text-center mb-12 text-foreground">
            <span className="text-primary">SYSTEM</span>
            <span className="text-muted-foreground ml-2">CAPABILITIES</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className={cn(
                  "group relative overflow-hidden",
                  "bg-card/50 backdrop-blur-sm",
                  "border-border/50 hover:border-primary/50",
                  "transition-all duration-300 hover:-translate-y-2",
                  "animate-slide-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <CardHeader>
                  <div className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center mb-4",
                    "bg-primary/10 group-hover:bg-primary/20",
                    "transition-colors duration-300"
                  )}>
                    <feature.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <CardTitle className="font-cyber text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <Link
                    to={feature.link}
                    className={cn(
                      "inline-flex items-center text-sm font-medium",
                      "text-primary hover:text-primary/80",
                      "group/link transition-colors"
                    )}
                  >
                    Explore
                    <ArrowRight className="ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-t border-border/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "50+", label: "Training Modules" },
              { value: "1000+", label: "Questions" },
              { value: "24/7", label: "AI Assistance" },
              { value: "∞", label: "Learning Paths" },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="font-cyber text-3xl md:text-4xl font-bold text-primary neon-text-cyan mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
