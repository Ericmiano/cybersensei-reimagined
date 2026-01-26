import { 
  Shield, 
  TrendingUp, 
  Clock, 
  Award, 
  BookOpen, 
  MessageSquare,
  Target,
  Flame,
  Zap,
  Star
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useUserProgress, ACHIEVEMENTS } from "@/contexts/UserProgressContext";
import XPBar from "@/components/gamification/XPBar";
import StreakDisplay from "@/components/gamification/StreakDisplay";

export default function DashboardPage() {
  const { progress, getAchievements } = useUserProgress();
  
  const completedLessons = progress.lessonsCompleted.filter(l => l.completed).length;
  const achievements = getAchievements();
  const earnedAchievements = achievements.filter(a => a.earned);
  
  // Calculate skill levels based on completed lessons per module
  const skillLevels = [
    { skill: "Network Security", level: Math.min(100, completedLessons * 5), color: "primary" },
    { skill: "Cryptography", level: Math.min(100, progress.totalQuizzesPassed * 4), color: "secondary" },
    { skill: "Ethical Hacking", level: Math.min(100, progress.totalExercisesCompleted * 6), color: "accent" },
    { skill: "Secure Coding", level: Math.min(100, Math.floor(progress.xp / 100)), color: "primary" },
    { skill: "Incident Response", level: Math.min(100, progress.currentStreak * 3), color: "secondary" },
  ];

  const statsCards = [
    {
      title: "Lessons Completed",
      value: completedLessons.toString(),
      icon: BookOpen,
      color: "primary",
      change: `Level ${progress.level}`,
    },
    {
      title: "Chat Sessions",
      value: progress.totalChatMessages.toString(),
      icon: MessageSquare,
      color: "secondary",
      change: "AI Interactions",
    },
    {
      title: "Learning Streak",
      value: progress.currentStreak.toString(),
      unit: "days",
      icon: Flame,
      color: "accent",
      change: progress.currentStreak >= progress.longestStreak ? "Personal best!" : `Best: ${progress.longestStreak}`,
    },
    {
      title: "Total XP",
      value: progress.xp.toString(),
      icon: Zap,
      color: "primary",
      change: `+${progress.totalQuizzesPassed * 100 + progress.totalExercisesCompleted * 75} from challenges`,
    },
  ];

  // Get recent activity from activity log
  const recentActivity = progress.activityLog.slice(0, 5).map(activity => ({
    type: activity.type,
    title: activity.title + (activity.description ? `: ${activity.description}` : ""),
    time: new Date(activity.timestamp).toLocaleDateString(),
    icon: activity.type === "lesson" ? BookOpen : 
          activity.type === "quiz" ? Target : 
          activity.type === "exercise" ? Target :
          activity.type === "achievement" ? Award : 
          activity.type === "xp" ? Zap : MessageSquare,
    xp: activity.xpEarned,
  }));

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

      {/* XP Bar and Streak */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card className="bg-card/50 border-border/50 p-6">
          <XPBar showDetails />
        </Card>
        <Card className="bg-card/50 border-border/50 p-6">
          <StreakDisplay />
        </Card>
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
            {recentActivity.length > 0 ? (
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
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                        {activity.xp && (
                          <Badge variant="outline" className="text-xs text-neon-orange border-neon-orange/30">
                            +{activity.xp} XP
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No activity yet. Start learning to see your progress!
              </p>
            )}
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="lg:col-span-3 bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="font-cyber text-xl text-primary">
              ACHIEVEMENTS ({earnedAchievements.length}/{achievements.length})
            </CardTitle>
            <CardDescription>Badges earned through your cybersecurity journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
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
