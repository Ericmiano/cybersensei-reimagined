import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Types
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earnedAt?: Date;
  requirement: {
    type: "lessons" | "xp" | "streak" | "quizzes" | "exercises" | "modules";
    value: number;
  };
}

export interface LessonProgress {
  lessonId: string;
  moduleId: string;
  completed: boolean;
  completedAt?: string;
  quizScore?: number;
  exerciseCompleted?: boolean;
}

export interface ActivityLog {
  id: string;
  type: "lesson" | "quiz" | "exercise" | "achievement" | "chat" | "xp";
  title: string;
  description?: string;
  xpEarned?: number;
  timestamp: string;
}

export interface UserProgress {
  xp: number;
  level: number;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string;
  lessonsCompleted: LessonProgress[];
  achievementsEarned: string[];
  totalQuizzesPassed: number;
  totalExercisesCompleted: number;
  totalChatMessages: number;
  activityLog: ActivityLog[];
}

// XP requirements per level
const XP_PER_LEVEL = 500;

// Achievement definitions
export const ACHIEVEMENTS: Achievement[] = [
  { id: "first_steps", title: "First Steps", description: "Complete your first lesson", icon: "🎯", requirement: { type: "lessons", value: 1 } },
  { id: "quick_learner", title: "Quick Learner", description: "Complete 5 lessons", icon: "⚡", requirement: { type: "lessons", value: 5 } },
  { id: "dedicated", title: "Dedicated", description: "Complete 10 lessons", icon: "📚", requirement: { type: "lessons", value: 10 } },
  { id: "streak_starter", title: "Streak Starter", description: "Maintain a 3-day streak", icon: "🔥", requirement: { type: "streak", value: 3 } },
  { id: "streak_master", title: "Streak Master", description: "Maintain a 7-day streak", icon: "🔥", requirement: { type: "streak", value: 7 } },
  { id: "streak_legend", title: "Streak Legend", description: "Maintain a 30-day streak", icon: "⭐", requirement: { type: "streak", value: 30 } },
  { id: "quiz_novice", title: "Quiz Novice", description: "Pass 5 quizzes", icon: "✅", requirement: { type: "quizzes", value: 5 } },
  { id: "quiz_master", title: "Quiz Master", description: "Pass 25 quizzes", icon: "🏆", requirement: { type: "quizzes", value: 25 } },
  { id: "hands_on", title: "Hands-On", description: "Complete 5 exercises", icon: "🛠️", requirement: { type: "exercises", value: 5 } },
  { id: "practitioner", title: "Practitioner", description: "Complete 15 exercises", icon: "💪", requirement: { type: "exercises", value: 15 } },
  { id: "xp_hunter", title: "XP Hunter", description: "Earn 1000 XP", icon: "💎", requirement: { type: "xp", value: 1000 } },
  { id: "xp_legend", title: "XP Legend", description: "Earn 5000 XP", icon: "👑", requirement: { type: "xp", value: 5000 } },
  { id: "module_complete", title: "Module Master", description: "Complete a full module", icon: "🎓", requirement: { type: "modules", value: 1 } },
  { id: "curious_mind", title: "Curious Mind", description: "Send 50 chat messages", icon: "🧠", requirement: { type: "lessons", value: 50 } },
];

// XP rewards
const XP_REWARDS = {
  lessonComplete: 50,
  quizPass: 100,
  quizPerfect: 50, // bonus for 100%
  exerciseComplete: 75,
  streakBonus: 25, // per day maintained
  firstTimeBonus: 25,
};

const defaultProgress: UserProgress = {
  xp: 0,
  level: 1,
  currentStreak: 0,
  longestStreak: 0,
  lastActiveDate: "",
  lessonsCompleted: [],
  achievementsEarned: [],
  totalQuizzesPassed: 0,
  totalExercisesCompleted: 0,
  totalChatMessages: 0,
  activityLog: [],
};

interface UserProgressContextType {
  progress: UserProgress;
  addXP: (amount: number, reason: string) => void;
  completeLesson: (lessonId: string, moduleId: string) => void;
  passQuiz: (lessonId: string, score: number) => void;
  completeExercise: (lessonId: string) => void;
  incrementChatMessages: () => void;
  getLevel: () => number;
  getXPForNextLevel: () => number;
  getCurrentLevelXP: () => number;
  getAchievements: () => (Achievement & { earned: boolean })[];
  updateStreak: () => void;
  resetProgress: () => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

const STORAGE_KEY = "cyber_sensei_progress";

export function UserProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return defaultProgress;
        }
      }
    }
    return defaultProgress;
  });

  // Save to localStorage whenever progress changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  // Check and update streak on mount
  useEffect(() => {
    updateStreak();
  }, []);

  const addActivity = (activity: Omit<ActivityLog, "id" | "timestamp">) => {
    const newActivity: ActivityLog = {
      ...activity,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    setProgress(prev => ({
      ...prev,
      activityLog: [newActivity, ...prev.activityLog].slice(0, 50), // Keep last 50 activities
    }));
  };

  const checkAchievements = (newProgress: UserProgress): string[] => {
    const newAchievements: string[] = [];
    
    for (const achievement of ACHIEVEMENTS) {
      if (newProgress.achievementsEarned.includes(achievement.id)) continue;
      
      let earned = false;
      switch (achievement.requirement.type) {
        case "lessons":
          earned = newProgress.lessonsCompleted.filter(l => l.completed).length >= achievement.requirement.value;
          break;
        case "xp":
          earned = newProgress.xp >= achievement.requirement.value;
          break;
        case "streak":
          earned = newProgress.currentStreak >= achievement.requirement.value || 
                   newProgress.longestStreak >= achievement.requirement.value;
          break;
        case "quizzes":
          earned = newProgress.totalQuizzesPassed >= achievement.requirement.value;
          break;
        case "exercises":
          earned = newProgress.totalExercisesCompleted >= achievement.requirement.value;
          break;
      }
      
      if (earned) {
        newAchievements.push(achievement.id);
      }
    }
    
    return newAchievements;
  };

  const addXP = (amount: number, reason: string) => {
    setProgress(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
      
      const updated = {
        ...prev,
        xp: newXP,
        level: newLevel,
      };
      
      // Check for new achievements
      const newAchievements = checkAchievements(updated);
      if (newAchievements.length > 0) {
        updated.achievementsEarned = [...updated.achievementsEarned, ...newAchievements];
      }
      
      return updated;
    });
    
    addActivity({
      type: "xp",
      title: `+${amount} XP`,
      description: reason,
      xpEarned: amount,
    });
  };

  const completeLesson = (lessonId: string, moduleId: string) => {
    setProgress(prev => {
      const existing = prev.lessonsCompleted.find(l => l.lessonId === lessonId);
      if (existing?.completed) return prev;
      
      const isFirstTime = !existing;
      const xpEarned = XP_REWARDS.lessonComplete + (isFirstTime ? XP_REWARDS.firstTimeBonus : 0);
      
      const lessonProgress: LessonProgress = {
        lessonId,
        moduleId,
        completed: true,
        completedAt: new Date().toISOString(),
      };
      
      const newLessons = existing
        ? prev.lessonsCompleted.map(l => l.lessonId === lessonId ? lessonProgress : l)
        : [...prev.lessonsCompleted, lessonProgress];
      
      const updated = {
        ...prev,
        xp: prev.xp + xpEarned,
        level: Math.floor((prev.xp + xpEarned) / XP_PER_LEVEL) + 1,
        lessonsCompleted: newLessons,
      };
      
      // Check for new achievements
      const newAchievements = checkAchievements(updated);
      if (newAchievements.length > 0) {
        updated.achievementsEarned = [...updated.achievementsEarned, ...newAchievements];
      }
      
      return updated;
    });
    
    addActivity({
      type: "lesson",
      title: "Lesson Completed",
      description: `Completed lesson ${lessonId}`,
      xpEarned: XP_REWARDS.lessonComplete,
    });
  };

  const passQuiz = (lessonId: string, score: number) => {
    const isPerfect = score === 100;
    const xpEarned = XP_REWARDS.quizPass + (isPerfect ? XP_REWARDS.quizPerfect : 0);
    
    setProgress(prev => {
      const updated = {
        ...prev,
        xp: prev.xp + xpEarned,
        level: Math.floor((prev.xp + xpEarned) / XP_PER_LEVEL) + 1,
        totalQuizzesPassed: prev.totalQuizzesPassed + 1,
        lessonsCompleted: prev.lessonsCompleted.map(l => 
          l.lessonId === lessonId ? { ...l, quizScore: score } : l
        ),
      };
      
      const newAchievements = checkAchievements(updated);
      if (newAchievements.length > 0) {
        updated.achievementsEarned = [...updated.achievementsEarned, ...newAchievements];
      }
      
      return updated;
    });
    
    addActivity({
      type: "quiz",
      title: isPerfect ? "Perfect Quiz!" : "Quiz Passed",
      description: `Scored ${score}%`,
      xpEarned,
    });
  };

  const completeExercise = (lessonId: string) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        xp: prev.xp + XP_REWARDS.exerciseComplete,
        level: Math.floor((prev.xp + XP_REWARDS.exerciseComplete) / XP_PER_LEVEL) + 1,
        totalExercisesCompleted: prev.totalExercisesCompleted + 1,
        lessonsCompleted: prev.lessonsCompleted.map(l => 
          l.lessonId === lessonId ? { ...l, exerciseCompleted: true } : l
        ),
      };
      
      const newAchievements = checkAchievements(updated);
      if (newAchievements.length > 0) {
        updated.achievementsEarned = [...updated.achievementsEarned, ...newAchievements];
      }
      
      return updated;
    });
    
    addActivity({
      type: "exercise",
      title: "Exercise Completed",
      xpEarned: XP_REWARDS.exerciseComplete,
    });
  };

  const incrementChatMessages = () => {
    setProgress(prev => ({
      ...prev,
      totalChatMessages: prev.totalChatMessages + 1,
    }));
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    setProgress(prev => {
      if (prev.lastActiveDate === today) return prev;
      
      let newStreak = prev.currentStreak;
      if (prev.lastActiveDate === yesterday) {
        newStreak = prev.currentStreak + 1;
      } else if (prev.lastActiveDate !== today) {
        newStreak = 1;
      }
      
      const updated = {
        ...prev,
        currentStreak: newStreak,
        longestStreak: Math.max(prev.longestStreak, newStreak),
        lastActiveDate: today,
      };
      
      const newAchievements = checkAchievements(updated);
      if (newAchievements.length > 0) {
        updated.achievementsEarned = [...updated.achievementsEarned, ...newAchievements];
      }
      
      return updated;
    });
  };

  const getLevel = () => progress.level;
  
  const getXPForNextLevel = () => XP_PER_LEVEL;
  
  const getCurrentLevelXP = () => progress.xp % XP_PER_LEVEL;

  const getAchievements = () => {
    return ACHIEVEMENTS.map(a => ({
      ...a,
      earned: progress.achievementsEarned.includes(a.id),
    }));
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <UserProgressContext.Provider value={{
      progress,
      addXP,
      completeLesson,
      passQuiz,
      completeExercise,
      incrementChatMessages,
      getLevel,
      getXPForNextLevel,
      getCurrentLevelXP,
      getAchievements,
      updateStreak,
      resetProgress,
    }}>
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error("useUserProgress must be used within UserProgressProvider");
  }
  return context;
}
