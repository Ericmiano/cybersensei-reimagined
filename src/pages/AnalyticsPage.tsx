import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const learningProgressData = [
  { day: "Mon", lessons: 3, hours: 1.5, chats: 5 },
  { day: "Tue", lessons: 2, hours: 1, chats: 3 },
  { day: "Wed", lessons: 4, hours: 2, chats: 8 },
  { day: "Thu", lessons: 1, hours: 0.5, chats: 2 },
  { day: "Fri", lessons: 5, hours: 2.5, chats: 10 },
  { day: "Sat", lessons: 3, hours: 1.5, chats: 4 },
  { day: "Sun", lessons: 2, hours: 1, chats: 6 },
];

const weeklyTrendData = [
  { week: "Week 1", score: 45 },
  { week: "Week 2", score: 52 },
  { week: "Week 3", score: 48 },
  { week: "Week 4", score: 61 },
  { week: "Week 5", score: 55 },
  { week: "Week 6", score: 67 },
  { week: "Week 7", score: 72 },
  { week: "Week 8", score: 78 },
];

const topicDistribution = [
  { name: "Network Security", value: 30, color: "hsl(180, 100%, 50%)" },
  { name: "Cryptography", value: 20, color: "hsl(300, 100%, 60%)" },
  { name: "Ethical Hacking", value: 25, color: "hsl(270, 100%, 65%)" },
  { name: "Secure Coding", value: 15, color: "hsl(150, 100%, 50%)" },
  { name: "Other", value: 10, color: "hsl(30, 100%, 55%)" },
];

const performanceMetrics = [
  { category: "Quiz Scores", score: 85, benchmark: 70 },
  { category: "Completion Rate", score: 72, benchmark: 60 },
  { category: "Engagement", score: 90, benchmark: 75 },
  { category: "Retention", score: 68, benchmark: 65 },
  { category: "Practice Labs", score: 55, benchmark: 50 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-cyber text-3xl font-bold mb-2">
          <span className="text-primary">ANALYTICS</span>
          <span className="text-muted-foreground ml-2">& REPORTS</span>
        </h1>
        <p className="text-muted-foreground">
          Detailed insights into your cybersecurity learning journey.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Lessons", value: "47", change: "+12%" },
          { label: "Study Hours", value: "24.5h", change: "+8%" },
          { label: "Avg. Score", value: "78%", change: "+5%" },
          { label: "Streak Record", value: "14 days", change: "Best!" },
        ].map((stat, index) => (
          <Card
            key={stat.label}
            className={cn(
              "bg-card/50 border-border/50",
              "animate-slide-up"
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <div className="flex items-baseline justify-between">
                <span className="font-cyber text-2xl font-bold text-primary">
                  {stat.value}
                </span>
                <Badge variant="outline" className="text-xs text-neon-green border-neon-green/30">
                  {stat.change}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Daily Activity */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="font-cyber text-xl text-primary">DAILY ACTIVITY</CardTitle>
            <CardDescription>Lessons completed and hours spent per day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={learningProgressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="lessons" fill="hsl(var(--primary))" name="Lessons" radius={[4, 4, 0, 0]} />
                <Bar dataKey="chats" fill="hsl(var(--secondary))" name="Chat Sessions" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Progress Trend */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="font-cyber text-xl text-primary">PROGRESS TREND</CardTitle>
            <CardDescription>Your skill score over the past 8 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={weeklyTrendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                  name="Skill Score"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Topic Distribution */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="font-cyber text-xl text-primary">TOPIC FOCUS</CardTitle>
            <CardDescription>Time distribution across cybersecurity topics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={topicDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {topicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card className="bg-card/50 border-border/50">
          <CardHeader>
            <CardTitle className="font-cyber text-xl text-primary">PERFORMANCE</CardTitle>
            <CardDescription>Your scores vs. average benchmarks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceMetrics} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" domain={[0, 100]} stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="category" type="category" width={100} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar dataKey="score" fill="hsl(var(--primary))" name="Your Score" radius={[0, 4, 4, 0]} />
                <Bar dataKey="benchmark" fill="hsl(var(--muted-foreground))" name="Benchmark" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
