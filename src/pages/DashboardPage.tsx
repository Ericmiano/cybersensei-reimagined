import { 
  Shield, 
  TrendingUp, 
  Clock, 
  Award, 
  BookOpen, 
  MessageSquare,
  Target,
  Flame,
  Calendar
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const statsCards = [
  {
    title: "Modules Completed",
    value: "12",
    total: "25",
    icon: BookOpen,
    color: "primary",
    change: "+3 this week",
  },
  {
    title: "Chat Sessions",
    value: "47",
    icon: MessageSquare,
    color: "secondary",
    change: "+12 this month",
  },
  {
    title: "Learning Streak",
    value: "7",
    unit: "days",
    icon: Flame,
    color: "accent",
    change: "Personal best!",
  },
  {
    title: "Total Time",
    value: "24.5",
    unit: "hours",
    icon: Clock,
    color: "primary",
    change: "+5h this week",
  },
];

const recentActivity = [
  { type: "lesson", title: "Completed: Network Security Basics", time: "2 hours ago", icon: BookOpen },
  { type: "chat", title: "Asked about SQL injection prevention", time: "5 hours ago", icon: MessageSquare },
  { type: "achievement", title: "Earned: Security Fundamentals Badge", time: "1 day ago", icon: Award },
  { type: "lesson", title: "Started: Ethical Hacking Module", time: "2 days ago", icon: Target },
  { type: "chat", title: "Discussed firewall configurations", time: "3 days ago", icon: MessageSquare },
];

const achievements = [
  { title: "First Steps", description: "Complete your first lesson", earned: true, icon: "🎯" },
  { title: "Quick Learner", description: "Complete 5 lessons in one day", earned: true, icon: "⚡" },
  { title: "Night Owl", description: "Study past midnight", earned: true, icon: "🦉" },
  { title: "Streak Master", description: "Maintain a 7-day streak", earned: true, icon: "🔥" },
  { title: "Curious Mind", description: "Ask 50 questions", earned: false, icon: "🧠" },
  { title: "Module Master", description: "Complete all modules", earned: false, icon: "👑" },
];

const skillLevels = [
  { skill: "Network Security", level: 75, color: "primary" },
  { skill: "Cryptography", level: 45, color: "secondary" },
  { skill: "Ethical Hacking", level: 30, color: "accent" },
  { skill: "Secure Coding", level: 60, color: "primary" },
  { skill: "Incident Response", level: 20, color: "secondary" },
];

export default function DashboardPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-cyber text-3xl font-bold mb-2">
          <span className="text-primary">DASHBOARD</span>
        </h1>
        <p className="text-muted-foreground">
          Welcome back, Cyber Warrior. Here's your training progress.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statsCards.map((stat, index) => (
          <Card
            key={stat.title}
            className={cn(
              "bg-card/50 border-border/50 hover:border-primary/50",
              "transition-all duration-300 hover:-translate-y-1",
              "animate-slide-up"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div
                  className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center",
                    "bg-primary/10"
                  )}
                >
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <Badge variant="outline" className="text-xs text-neon-green border-neon-green/30">
                  {stat.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm text-muted-foreground">{stat.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="font-cyber text-3xl font-bold text-primary neon-text-cyan">
                    {stat.value}
                  </span>
                  {stat.unit && <span className="text-muted-foreground text-sm">{stat.unit}</span>}
                  {stat.total && (
                    <span className="text-muted-foreground text-sm">/ {stat.total}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Skill Levels */}
        <Card className="lg:col-span-2 bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="font-cyber text-xl text-primary">SKILL LEVELS</CardTitle>
            <CardDescription>Your proficiency across cybersecurity domains</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {skillLevels.map((skill) => (
              <div key={skill.skill}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-foreground font-medium">{skill.skill}</span>
                  <span className="text-primary">{skill.level}%</span>
                </div>
                <Progress value={skill.level} className="h-3 bg-muted" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="font-cyber text-xl text-primary">RECENT ACTIVITY</CardTitle>
            <CardDescription>Your latest learning actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-border/30 last:border-0 last:pb-0"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="lg:col-span-3 bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="font-cyber text-xl text-primary">ACHIEVEMENTS</CardTitle>
            <CardDescription>Badges earned through your cybersecurity journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className={cn(
                    "text-center p-4 rounded-lg border transition-all duration-300",
                    achievement.earned
                      ? "bg-primary/10 border-primary/30 hover:border-primary"
                      : "bg-muted/30 border-border/30 opacity-50"
                  )}
                >
                  <div className="text-3xl mb-2">{achievement.icon}</div>
                  <h4 className="font-medium text-sm mb-1">{achievement.title}</h4>
                  <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  {achievement.earned && (
                    <Badge className="mt-2 bg-neon-green/20 text-neon-green text-xs">Earned</Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
