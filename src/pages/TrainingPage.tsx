import { useState } from "react";
import { 
  BookOpen, 
  Shield, 
  Lock, 
  Network, 
  Bug, 
  Code, 
  Server, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Star,
  ChevronRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface Module {
  id: string;
  title: string;
  description: string;
  icon: typeof Shield;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  lessons: number;
  completedLessons: number;
  duration: string;
  status: "locked" | "in-progress" | "completed";
}

const modules: Module[] = [
  {
    id: "1",
    title: "Cybersecurity Fundamentals",
    description: "Master the core concepts of information security, threat landscapes, and defense strategies.",
    icon: Shield,
    category: "fundamentals",
    difficulty: "beginner",
    lessons: 12,
    completedLessons: 8,
    duration: "3 hours",
    status: "in-progress",
  },
  {
    id: "2",
    title: "Network Security",
    description: "Learn to protect networks from intrusions, monitor traffic, and implement firewalls.",
    icon: Network,
    category: "networking",
    difficulty: "intermediate",
    lessons: 15,
    completedLessons: 15,
    duration: "4 hours",
    status: "completed",
  },
  {
    id: "3",
    title: "Cryptography Essentials",
    description: "Understand encryption, hashing, digital signatures, and key management.",
    icon: Lock,
    category: "fundamentals",
    difficulty: "intermediate",
    lessons: 10,
    completedLessons: 0,
    duration: "2.5 hours",
    status: "locked",
  },
  {
    id: "4",
    title: "Ethical Hacking",
    description: "Learn penetration testing, vulnerability assessment, and ethical hacking methodologies.",
    icon: Bug,
    category: "offensive",
    difficulty: "advanced",
    lessons: 20,
    completedLessons: 5,
    duration: "6 hours",
    status: "in-progress",
  },
  {
    id: "5",
    title: "Secure Coding Practices",
    description: "Write secure code, prevent common vulnerabilities, and follow security best practices.",
    icon: Code,
    category: "development",
    difficulty: "intermediate",
    lessons: 14,
    completedLessons: 0,
    duration: "3.5 hours",
    status: "locked",
  },
  {
    id: "6",
    title: "Incident Response",
    description: "Handle security incidents, perform forensic analysis, and implement recovery procedures.",
    icon: AlertTriangle,
    category: "operations",
    difficulty: "advanced",
    lessons: 16,
    completedLessons: 0,
    duration: "4.5 hours",
    status: "locked",
  },
  {
    id: "7",
    title: "Cloud Security",
    description: "Secure cloud infrastructure, manage identities, and protect cloud-native applications.",
    icon: Server,
    category: "infrastructure",
    difficulty: "advanced",
    lessons: 18,
    completedLessons: 0,
    duration: "5 hours",
    status: "locked",
  },
];

const categories = [
  { id: "all", label: "All Modules" },
  { id: "fundamentals", label: "Fundamentals" },
  { id: "networking", label: "Networking" },
  { id: "offensive", label: "Offensive Security" },
  { id: "development", label: "Development" },
  { id: "operations", label: "Operations" },
  { id: "infrastructure", label: "Infrastructure" },
];

const difficultyColors = {
  beginner: "bg-neon-green/20 text-neon-green border-neon-green/30",
  intermediate: "bg-neon-orange/20 text-neon-orange border-neon-orange/30",
  advanced: "bg-neon-magenta/20 text-neon-magenta border-neon-magenta/30",
};

export default function TrainingPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredModules = modules.filter(
    (module) => activeCategory === "all" || module.category === activeCategory
  );

  const totalProgress = Math.round(
    (modules.reduce((acc, m) => acc + m.completedLessons, 0) /
      modules.reduce((acc, m) => acc + m.lessons, 0)) *
      100
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-cyber text-3xl font-bold mb-2">
          <span className="text-primary">TRAINING</span>
          <span className="text-muted-foreground ml-2">MODULES</span>
        </h1>
        <p className="text-muted-foreground">
          Master cybersecurity through structured learning paths and hands-on challenges.
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="mb-8 bg-card/50 border-border/50 neon-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="font-cyber text-lg text-primary mb-1">OVERALL PROGRESS</h3>
              <p className="text-sm text-muted-foreground">
                {modules.filter((m) => m.status === "completed").length} of {modules.length} modules completed
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1 md:w-48">
                <Progress value={totalProgress} className="h-3 bg-muted" />
              </div>
              <span className="font-cyber text-2xl text-primary neon-text-cyan">
                {totalProgress}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-6">
        <TabsList className="bg-muted/50 flex-wrap h-auto gap-1 p-1">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className={cn(
                "data-[state=active]:bg-primary data-[state=active]:text-primary-foreground",
                "transition-all duration-200"
              )}
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModules.map((module, index) => (
          <Card
            key={module.id}
            className={cn(
              "group relative overflow-hidden transition-all duration-300",
              "bg-card/50 border-border/50",
              "hover:border-primary/50 hover:-translate-y-1",
              module.status === "locked" && "opacity-60",
              "animate-slide-up"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {module.status === "completed" && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="h-6 w-6 text-neon-green" />
              </div>
            )}

            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "w-12 h-12 rounded-lg flex items-center justify-center",
                    "bg-primary/10 group-hover:bg-primary/20",
                    "transition-colors duration-300"
                  )}
                >
                  <module.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="font-cyber text-lg group-hover:text-primary transition-colors">
                    {module.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      variant="outline"
                      className={cn("text-xs", difficultyColors[module.difficulty])}
                    >
                      {module.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {module.duration}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <CardDescription className="mb-4">{module.description}</CardDescription>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="text-primary font-medium">
                    {module.completedLessons}/{module.lessons} lessons
                  </span>
                </div>
                <Progress
                  value={(module.completedLessons / module.lessons) * 100}
                  className="h-2 bg-muted"
                />
              </div>

              {/* Action Button */}
              <Button
                className={cn(
                  "w-full font-medium",
                  module.status === "locked"
                    ? "bg-muted text-muted-foreground cursor-not-allowed"
                    : module.status === "completed"
                    ? "bg-neon-green/20 text-neon-green hover:bg-neon-green/30"
                    : "bg-primary hover:bg-primary/90 neon-glow-cyan"
                )}
                disabled={module.status === "locked"}
              >
                {module.status === "locked" ? (
                  <>
                    <Lock className="h-4 w-4 mr-2" />
                    Locked
                  </>
                ) : module.status === "completed" ? (
                  <>
                    <Star className="h-4 w-4 mr-2" />
                    Review Module
                  </>
                ) : (
                  <>
                    Continue Learning
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
