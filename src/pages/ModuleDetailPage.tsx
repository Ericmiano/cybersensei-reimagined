import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Shield, 
  Network, 
  Lock, 
  Bug, 
  Code, 
  AlertTriangle, 
  Server,
  Clock,
  CheckCircle2,
  PlayCircle,
  ChevronRight,
  BookOpen
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Module data - in a real app this would come from an API/database
const modulesData = {
  "1": {
    id: "1",
    title: "Cybersecurity Fundamentals",
    description: "Master the core concepts of information security, threat landscapes, and defense strategies. This comprehensive module covers everything from basic security principles to advanced threat modeling techniques.",
    icon: Shield,
    difficulty: "beginner" as const,
    duration: "3 hours",
    status: "in-progress" as const,
    lessons: [
      { id: "1-1", title: "Introduction to Cybersecurity", duration: "15 min", completed: true },
      { id: "1-2", title: "The CIA Triad", duration: "20 min", completed: true },
      { id: "1-3", title: "Common Threat Types", duration: "25 min", completed: true },
      { id: "1-4", title: "Attack Vectors", duration: "20 min", completed: true },
      { id: "1-5", title: "Defense in Depth", duration: "30 min", completed: true },
      { id: "1-6", title: "Security Policies", duration: "20 min", completed: true },
      { id: "1-7", title: "Risk Assessment", duration: "25 min", completed: true },
      { id: "1-8", title: "Threat Modeling", duration: "30 min", completed: true },
      { id: "1-9", title: "Security Controls", duration: "20 min", completed: false },
      { id: "1-10", title: "Compliance Frameworks", duration: "25 min", completed: false },
      { id: "1-11", title: "Security Awareness", duration: "15 min", completed: false },
      { id: "1-12", title: "Module Assessment", duration: "30 min", completed: false },
    ],
  },
  "2": {
    id: "2",
    title: "Network Security",
    description: "Learn to protect networks from intrusions, monitor traffic, and implement firewalls. Understand network protocols, packet analysis, and network-based attacks.",
    icon: Network,
    difficulty: "intermediate" as const,
    duration: "4 hours",
    status: "completed" as const,
    lessons: [
      { id: "2-1", title: "Network Fundamentals", duration: "20 min", completed: true },
      { id: "2-2", title: "TCP/IP Security", duration: "25 min", completed: true },
      { id: "2-3", title: "Firewalls & IDS/IPS", duration: "30 min", completed: true },
      { id: "2-4", title: "VPNs & Tunneling", duration: "25 min", completed: true },
      { id: "2-5", title: "Network Monitoring", duration: "20 min", completed: true },
      { id: "2-6", title: "Packet Analysis", duration: "30 min", completed: true },
      { id: "2-7", title: "Wireless Security", duration: "25 min", completed: true },
      { id: "2-8", title: "Network Segmentation", duration: "20 min", completed: true },
      { id: "2-9", title: "DNS Security", duration: "15 min", completed: true },
      { id: "2-10", title: "Network Hardening", duration: "25 min", completed: true },
      { id: "2-11", title: "Zero Trust Architecture", duration: "20 min", completed: true },
      { id: "2-12", title: "Network Forensics", duration: "25 min", completed: true },
      { id: "2-13", title: "DDoS Protection", duration: "20 min", completed: true },
      { id: "2-14", title: "Network Assessment Lab", duration: "40 min", completed: true },
      { id: "2-15", title: "Module Assessment", duration: "30 min", completed: true },
    ],
  },
  "3": {
    id: "3",
    title: "Cryptography Essentials",
    description: "Understand encryption, hashing, digital signatures, and key management. Learn how cryptographic primitives protect data in transit and at rest.",
    icon: Lock,
    difficulty: "intermediate" as const,
    duration: "2.5 hours",
    status: "locked" as const,
    lessons: [
      { id: "3-1", title: "Cryptography Basics", duration: "20 min", completed: false },
      { id: "3-2", title: "Symmetric Encryption", duration: "25 min", completed: false },
      { id: "3-3", title: "Asymmetric Encryption", duration: "25 min", completed: false },
      { id: "3-4", title: "Hash Functions", duration: "20 min", completed: false },
      { id: "3-5", title: "Digital Signatures", duration: "20 min", completed: false },
      { id: "3-6", title: "PKI & Certificates", duration: "25 min", completed: false },
      { id: "3-7", title: "Key Management", duration: "20 min", completed: false },
      { id: "3-8", title: "TLS/SSL", duration: "25 min", completed: false },
      { id: "3-9", title: "Cryptographic Attacks", duration: "20 min", completed: false },
      { id: "3-10", title: "Module Assessment", duration: "30 min", completed: false },
    ],
  },
  "4": {
    id: "4",
    title: "Ethical Hacking",
    description: "Learn penetration testing, vulnerability assessment, and ethical hacking methodologies. Master the tools and techniques used by security professionals.",
    icon: Bug,
    difficulty: "advanced" as const,
    duration: "6 hours",
    status: "in-progress" as const,
    lessons: [
      { id: "4-1", title: "Ethical Hacking Introduction", duration: "15 min", completed: true },
      { id: "4-2", title: "Reconnaissance Techniques", duration: "30 min", completed: true },
      { id: "4-3", title: "Scanning & Enumeration", duration: "35 min", completed: true },
      { id: "4-4", title: "Vulnerability Assessment", duration: "30 min", completed: true },
      { id: "4-5", title: "Exploitation Basics", duration: "40 min", completed: true },
      { id: "4-6", title: "Web Application Attacks", duration: "45 min", completed: false },
      { id: "4-7", title: "SQL Injection", duration: "35 min", completed: false },
      { id: "4-8", title: "XSS Attacks", duration: "30 min", completed: false },
      { id: "4-9", title: "Password Attacks", duration: "25 min", completed: false },
      { id: "4-10", title: "Privilege Escalation", duration: "35 min", completed: false },
      { id: "4-11", title: "Post Exploitation", duration: "30 min", completed: false },
      { id: "4-12", title: "Social Engineering", duration: "25 min", completed: false },
      { id: "4-13", title: "Wireless Hacking", duration: "35 min", completed: false },
      { id: "4-14", title: "Report Writing", duration: "20 min", completed: false },
      { id: "4-15", title: "CTF Challenge Lab", duration: "60 min", completed: false },
      { id: "4-16", title: "Penetration Testing Lab", duration: "60 min", completed: false },
      { id: "4-17", title: "Module Assessment", duration: "45 min", completed: false },
    ],
  },
  "5": {
    id: "5",
    title: "Secure Coding Practices",
    description: "Write secure code, prevent common vulnerabilities, and follow security best practices. Learn to identify and fix security flaws in application code.",
    icon: Code,
    difficulty: "intermediate" as const,
    duration: "3.5 hours",
    status: "locked" as const,
    lessons: [
      { id: "5-1", title: "Secure Coding Principles", duration: "20 min", completed: false },
      { id: "5-2", title: "Input Validation", duration: "25 min", completed: false },
      { id: "5-3", title: "Output Encoding", duration: "20 min", completed: false },
      { id: "5-4", title: "Authentication Best Practices", duration: "25 min", completed: false },
      { id: "5-5", title: "Session Management", duration: "20 min", completed: false },
      { id: "5-6", title: "Access Control", duration: "25 min", completed: false },
      { id: "5-7", title: "Error Handling", duration: "15 min", completed: false },
      { id: "5-8", title: "Logging & Monitoring", duration: "20 min", completed: false },
      { id: "5-9", title: "OWASP Top 10", duration: "30 min", completed: false },
      { id: "5-10", title: "Code Review Techniques", duration: "25 min", completed: false },
      { id: "5-11", title: "Security Testing", duration: "20 min", completed: false },
      { id: "5-12", title: "Secure SDLC", duration: "20 min", completed: false },
      { id: "5-13", title: "Secure Coding Lab", duration: "40 min", completed: false },
      { id: "5-14", title: "Module Assessment", duration: "30 min", completed: false },
    ],
  },
  "6": {
    id: "6",
    title: "Incident Response",
    description: "Handle security incidents, perform forensic analysis, and implement recovery procedures. Learn the complete incident response lifecycle.",
    icon: AlertTriangle,
    difficulty: "advanced" as const,
    duration: "4.5 hours",
    status: "locked" as const,
    lessons: [
      { id: "6-1", title: "Incident Response Overview", duration: "20 min", completed: false },
      { id: "6-2", title: "Preparation Phase", duration: "25 min", completed: false },
      { id: "6-3", title: "Detection & Analysis", duration: "30 min", completed: false },
      { id: "6-4", title: "Containment Strategies", duration: "25 min", completed: false },
      { id: "6-5", title: "Eradication & Recovery", duration: "25 min", completed: false },
      { id: "6-6", title: "Post-Incident Activities", duration: "20 min", completed: false },
      { id: "6-7", title: "Digital Forensics Basics", duration: "30 min", completed: false },
      { id: "6-8", title: "Memory Forensics", duration: "35 min", completed: false },
      { id: "6-9", title: "Disk Forensics", duration: "35 min", completed: false },
      { id: "6-10", title: "Log Analysis", duration: "25 min", completed: false },
      { id: "6-11", title: "Malware Analysis Intro", duration: "30 min", completed: false },
      { id: "6-12", title: "Incident Documentation", duration: "20 min", completed: false },
      { id: "6-13", title: "IR Tabletop Exercise", duration: "45 min", completed: false },
      { id: "6-14", title: "Forensics Lab", duration: "50 min", completed: false },
      { id: "6-15", title: "Module Assessment", duration: "35 min", completed: false },
    ],
  },
  "7": {
    id: "7",
    title: "Cloud Security",
    description: "Secure cloud infrastructure, manage identities, and protect cloud-native applications. Master AWS, Azure, and GCP security fundamentals.",
    icon: Server,
    difficulty: "advanced" as const,
    duration: "5 hours",
    status: "locked" as const,
    lessons: [
      { id: "7-1", title: "Cloud Security Fundamentals", duration: "20 min", completed: false },
      { id: "7-2", title: "Shared Responsibility Model", duration: "15 min", completed: false },
      { id: "7-3", title: "Identity & Access Management", duration: "30 min", completed: false },
      { id: "7-4", title: "Network Security in Cloud", duration: "25 min", completed: false },
      { id: "7-5", title: "Data Protection", duration: "25 min", completed: false },
      { id: "7-6", title: "Compute Security", duration: "20 min", completed: false },
      { id: "7-7", title: "Container Security", duration: "30 min", completed: false },
      { id: "7-8", title: "Serverless Security", duration: "25 min", completed: false },
      { id: "7-9", title: "Cloud Monitoring & Logging", duration: "25 min", completed: false },
      { id: "7-10", title: "Compliance in Cloud", duration: "20 min", completed: false },
      { id: "7-11", title: "AWS Security Essentials", duration: "35 min", completed: false },
      { id: "7-12", title: "Azure Security Essentials", duration: "35 min", completed: false },
      { id: "7-13", title: "GCP Security Essentials", duration: "30 min", completed: false },
      { id: "7-14", title: "Multi-Cloud Security", duration: "25 min", completed: false },
      { id: "7-15", title: "Cloud Security Lab", duration: "50 min", completed: false },
      { id: "7-16", title: "Cloud Penetration Testing", duration: "40 min", completed: false },
      { id: "7-17", title: "Module Assessment", duration: "40 min", completed: false },
    ],
  },
};

const difficultyColors = {
  beginner: "bg-neon-green/20 text-neon-green border-neon-green/30",
  intermediate: "bg-neon-orange/20 text-neon-orange border-neon-orange/30",
  advanced: "bg-neon-magenta/20 text-neon-magenta border-neon-magenta/30",
};

export default function ModuleDetailPage() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  
  const module = moduleId ? modulesData[moduleId as keyof typeof modulesData] : null;
  
  if (!module) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="font-cyber text-3xl text-primary mb-4">MODULE NOT FOUND</h1>
        <p className="text-muted-foreground mb-6">The requested module does not exist.</p>
        <Button onClick={() => navigate("/training")} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Training
        </Button>
      </div>
    );
  }

  const completedLessons = module.lessons.filter(l => l.completed).length;
  const progress = (completedLessons / module.lessons.length) * 100;
  const nextLesson = module.lessons.find(l => !l.completed);
  const Icon = module.icon;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <Button
        variant="ghost"
        onClick={() => navigate("/training")}
        className="mb-6 hover:bg-primary/10"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Training
      </Button>

      {/* Module Header */}
      <Card className="mb-8 bg-card/50 border-border/50 neon-border overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <CardHeader className="relative">
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-16 h-16 rounded-xl flex items-center justify-center",
              "bg-primary/10"
            )}>
              <Icon className="h-8 w-8 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={cn("text-xs", difficultyColors[module.difficulty])}>
                  {module.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {module.duration}
                </Badge>
                {module.status === "completed" && (
                  <Badge className="bg-neon-green/20 text-neon-green text-xs">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <CardTitle className="font-cyber text-2xl text-primary mb-2">
                {module.title}
              </CardTitle>
              <CardDescription className="text-base">
                {module.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress</span>
              <span className="text-primary font-medium">
                {completedLessons}/{module.lessons.length} lessons completed
              </span>
            </div>
            <Progress value={progress} className="h-3 bg-muted" />
          </div>

          {/* Continue Button */}
          {nextLesson && module.status !== "locked" && (
            <Button
              asChild
              className="w-full neon-glow-cyan font-medium"
            >
              <Link to={`/training/${module.id}/lesson/${nextLesson.id}`}>
                <PlayCircle className="h-4 w-4 mr-2" />
                Continue: {nextLesson.title}
              </Link>
            </Button>
          )}
          {module.status === "completed" && (
            <Button
              asChild
              className="w-full bg-neon-green/20 text-neon-green hover:bg-neon-green/30"
            >
              <Link to={`/training/${module.id}/lesson/${module.lessons[0].id}`}>
                <BookOpen className="h-4 w-4 mr-2" />
                Review from Beginning
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Lessons List */}
      <div>
        <h2 className="font-cyber text-xl text-primary mb-4">LESSONS</h2>
        <div className="space-y-3">
          {module.lessons.map((lesson, index) => (
            <Card
              key={lesson.id}
              className={cn(
                "bg-card/50 border-border/50 transition-all duration-200",
                "hover:border-primary/50",
                module.status === "locked" && "opacity-50"
              )}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center font-cyber text-sm",
                    lesson.completed 
                      ? "bg-neon-green/20 text-neon-green" 
                      : "bg-muted text-muted-foreground"
                  )}>
                    {lesson.completed ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <span>{String(index + 1).padStart(2, '0')}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={cn(
                      "font-medium",
                      lesson.completed && "text-muted-foreground"
                    )}>
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {lesson.duration}
                    </p>
                  </div>
                  {module.status !== "locked" && (
                    <Button
                      asChild
                      variant={lesson.completed ? "ghost" : "default"}
                      size="sm"
                      className={cn(
                        lesson.completed 
                          ? "hover:bg-primary/10" 
                          : "neon-glow-cyan"
                      )}
                    >
                      <Link to={`/training/${module.id}/lesson/${lesson.id}`}>
                        {lesson.completed ? "Review" : "Start"}
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
