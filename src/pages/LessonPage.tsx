import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  PlayCircle,
  BookOpen,
  MessageSquare,
  Lightbulb,
  Code,
  Terminal
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

// Lesson content data - in a real app this would come from an API/database
const lessonContent: Record<string, {
  title: string;
  moduleId: string;
  moduleName: string;
  content: Array<{
    type: "text" | "code" | "tip" | "terminal";
    content: string;
  }>;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
  nextLessonId?: string;
  prevLessonId?: string;
}> = {
  "1-1": {
    title: "Introduction to Cybersecurity",
    moduleId: "1",
    moduleName: "Cybersecurity Fundamentals",
    content: [
      {
        type: "text",
        content: "Welcome to the world of cybersecurity! In this lesson, we'll explore what cybersecurity means, why it's important, and the fundamental concepts that form the foundation of digital security."
      },
      {
        type: "text",
        content: "**What is Cybersecurity?**\n\nCybersecurity is the practice of protecting systems, networks, programs, and data from digital attacks. These attacks are usually aimed at accessing, changing, or destroying sensitive information, extorting money from users, or interrupting normal business processes."
      },
      {
        type: "tip",
        content: "Cybersecurity is not just about technology—it also involves people and processes. The human element is often the weakest link in security."
      },
      {
        type: "text",
        content: "**Key Areas of Cybersecurity:**\n\n• **Network Security** - Protecting the network infrastructure\n• **Application Security** - Keeping software and devices free of threats\n• **Information Security** - Protecting data integrity and privacy\n• **Operational Security** - Handling and protecting data assets\n• **Disaster Recovery** - Responding to security incidents"
      },
      {
        type: "code",
        content: "# Example: Basic security check in Python\nimport hashlib\n\ndef verify_password(stored_hash, password):\n    \"\"\"Verify a password against a stored hash\"\"\"\n    password_hash = hashlib.sha256(password.encode()).hexdigest()\n    return password_hash == stored_hash"
      }
    ],
    quiz: {
      question: "What is the primary goal of cybersecurity?",
      options: [
        "To make computers faster",
        "To protect systems and data from digital attacks",
        "To create new software",
        "To design websites"
      ],
      correctIndex: 1
    },
    nextLessonId: "1-2"
  },
  "1-2": {
    title: "The CIA Triad",
    moduleId: "1",
    moduleName: "Cybersecurity Fundamentals",
    content: [
      {
        type: "text",
        content: "The CIA Triad is a fundamental model in cybersecurity that guides information security policies. It stands for Confidentiality, Integrity, and Availability."
      },
      {
        type: "text",
        content: "**Confidentiality**\n\nEnsuring that information is accessible only to those authorized to have access. Methods include encryption, access controls, and authentication."
      },
      {
        type: "text",
        content: "**Integrity**\n\nMaintaining the accuracy and completeness of data. This means data cannot be modified in an unauthorized or undetected manner."
      },
      {
        type: "text",
        content: "**Availability**\n\nEnsuring that authorized users have access to information and resources when needed. This involves maintaining hardware, performing upgrades, and having disaster recovery plans."
      },
      {
        type: "tip",
        content: "When designing security controls, always consider how they affect all three aspects of the CIA triad. Strengthening one shouldn't weaken another."
      },
      {
        type: "terminal",
        content: "$ openssl enc -aes-256-cbc -salt -in secret.txt -out encrypted.txt\nenter aes-256-cbc encryption password:\nVerifying - enter aes-256-cbc encryption password:"
      }
    ],
    quiz: {
      question: "Which component of the CIA Triad ensures data cannot be modified without authorization?",
      options: [
        "Confidentiality",
        "Integrity",
        "Availability",
        "Authentication"
      ],
      correctIndex: 1
    },
    prevLessonId: "1-1",
    nextLessonId: "1-3"
  },
  // Default lesson content for lessons without specific content
};

// Type for lesson content
interface LessonData {
  title: string;
  moduleId: string;
  moduleName: string;
  content: Array<{
    type: "text" | "code" | "tip" | "terminal";
    content: string;
  }>;
  quiz?: {
    question: string;
    options: string[];
    correctIndex: number;
  };
  nextLessonId?: string;
  prevLessonId?: string;
}

// Generate default content for lessons that don't have specific content
const getDefaultLessonContent = (lessonId: string): LessonData => {
  const [moduleId, lessonNum] = lessonId.split("-");
  return {
    title: `Lesson ${lessonNum}`,
    moduleId,
    moduleName: "Training Module",
    content: [
      {
        type: "text" as const,
        content: "This lesson is currently under development. Check back soon for comprehensive cybersecurity training content!"
      },
      {
        type: "tip" as const,
        content: "In the meantime, try chatting with the AI Sensei to learn more about this topic."
      }
    ],
    quiz: {
      question: "What is the best way to continue learning?",
      options: [
        "Give up",
        "Practice consistently and ask questions",
        "Only read theory",
        "Skip the basics"
      ],
      correctIndex: 1
    }
  };
};

export default function LessonPage() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const lesson = lessonId 
    ? (lessonContent[lessonId] || getDefaultLessonContent(lessonId))
    : null;

  if (!lesson || !moduleId) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <h1 className="font-cyber text-3xl text-primary mb-4">LESSON NOT FOUND</h1>
        <p className="text-muted-foreground mb-6">The requested lesson does not exist.</p>
        <Button onClick={() => navigate("/training")} variant="outline">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Training
        </Button>
      </div>
    );
  }

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;
    setShowResult(true);
    
    if (lesson.quiz && selectedAnswer === lesson.quiz.correctIndex) {
      toast({
        title: "Correct! 🎉",
        description: "Great job! You've mastered this concept.",
      });
      setIsCompleted(true);
    } else {
      toast({
        title: "Not quite right",
        description: "Review the material and try again!",
        variant: "destructive",
      });
    }
  };

  const handleContinue = () => {
    if (lesson.nextLessonId) {
      navigate(`/training/${moduleId}/lesson/${lesson.nextLessonId}`);
      setSelectedAnswer(null);
      setShowResult(false);
      setIsCompleted(false);
    } else {
      navigate(`/training/${moduleId}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => navigate(`/training/${moduleId}`)}
          className="mb-4 hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {lesson.moduleName}
        </Button>

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <BookOpen className="h-4 w-4" />
          <span>{lesson.moduleName}</span>
        </div>
        
        <h1 className="font-cyber text-3xl font-bold text-primary mb-4">
          {lesson.title}
        </h1>

        <Progress value={isCompleted ? 100 : 50} className="h-2 bg-muted" />
      </div>

      {/* Lesson Content */}
      <div className="space-y-6 mb-8">
        {lesson.content.map((block, index) => (
          <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            {block.type === "text" && (
              <Card className="bg-card/50 border-border/50">
                <CardContent className="p-6">
                  <div className="prose prose-invert max-w-none">
                    {block.content.split('\n').map((paragraph, i) => (
                      <p key={i} className="text-foreground mb-4 last:mb-0 whitespace-pre-wrap">
                        {paragraph.startsWith('**') ? (
                          <strong className="text-primary font-cyber">
                            {paragraph.replace(/\*\*/g, '')}
                          </strong>
                        ) : paragraph.startsWith('•') ? (
                          <span className="block ml-4">{paragraph}</span>
                        ) : (
                          paragraph
                        )}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {block.type === "tip" && (
              <Card className="bg-neon-orange/10 border-neon-orange/30">
                <CardContent className="p-6 flex gap-4">
                  <Lightbulb className="h-6 w-6 text-neon-orange flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium text-neon-orange mb-1">Pro Tip</h4>
                    <p className="text-foreground">{block.content}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {block.type === "code" && (
              <Card className="bg-muted/50 border-border/50 overflow-hidden">
                <CardHeader className="py-3 px-4 bg-muted/80 border-b border-border/30">
                  <div className="flex items-center gap-2">
                    <Code className="h-4 w-4 text-primary" />
                    <span className="text-sm font-mono text-muted-foreground">Code Example</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-neon-green">
                      {block.content}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            )}

            {block.type === "terminal" && (
              <Card className="bg-black border-neon-green/30 overflow-hidden">
                <CardHeader className="py-3 px-4 bg-black border-b border-neon-green/20">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-neon-green" />
                    <span className="text-sm font-mono text-neon-green/70">Terminal</span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm font-mono text-neon-green">
                      {block.content}
                    </code>
                  </pre>
                </CardContent>
              </Card>
            )}
          </div>
        ))}
      </div>

      {/* Quiz Section */}
      {lesson.quiz && (
        <Card className="bg-card/50 border-primary/30 neon-border mb-8">
          <CardHeader>
            <CardTitle className="font-cyber text-xl text-primary flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              KNOWLEDGE CHECK
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-6">{lesson.quiz.question}</p>
            
            <div className="space-y-3 mb-6">
              {lesson.quiz.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  disabled={showResult}
                  className={cn(
                    "w-full p-4 rounded-lg text-left transition-all duration-200",
                    "border",
                    selectedAnswer === index
                      ? showResult
                        ? index === lesson.quiz!.correctIndex
                          ? "border-neon-green bg-neon-green/20 text-neon-green"
                          : "border-destructive bg-destructive/20 text-destructive"
                        : "border-primary bg-primary/20"
                      : showResult && index === lesson.quiz!.correctIndex
                        ? "border-neon-green bg-neon-green/10"
                        : "border-border/50 hover:border-primary/50 bg-muted/30",
                    !showResult && "cursor-pointer"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      selectedAnswer === index
                        ? "bg-primary/30 text-primary"
                        : "bg-muted text-muted-foreground"
                    )}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span>{option}</span>
                    {showResult && index === lesson.quiz!.correctIndex && (
                      <CheckCircle2 className="h-5 w-5 text-neon-green ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {!showResult ? (
              <Button 
                onClick={handleAnswerSubmit}
                disabled={selectedAnswer === null}
                className="w-full neon-glow-cyan"
              >
                Submit Answer
              </Button>
            ) : (
              <Button 
                onClick={handleContinue}
                className="w-full neon-glow-cyan"
              >
                {lesson.nextLessonId ? (
                  <>
                    Continue to Next Lesson
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Complete Module
                  </>
                )}
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        {lesson.prevLessonId ? (
          <Button
            variant="outline"
            onClick={() => {
              navigate(`/training/${moduleId}/lesson/${lesson.prevLessonId}`);
              setSelectedAnswer(null);
              setShowResult(false);
              setIsCompleted(false);
            }}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Lesson
          </Button>
        ) : (
          <div />
        )}
        
        <Button asChild variant="ghost" className="hover:bg-primary/10">
          <Link to="/chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            Ask AI Sensei
          </Link>
        </Button>
      </div>
    </div>
  );
}
