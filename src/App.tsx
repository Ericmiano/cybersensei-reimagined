import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { UserProgressProvider } from "@/contexts/UserProgressContext";
import { ChatHistoryProvider } from "@/contexts/ChatHistoryContext";
import { AppLayout } from "@/components/layout/AppLayout";
import AchievementToast from "@/components/gamification/AchievementToast";
import { Skeleton } from "@/components/ui/skeleton";

// Eager load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load non-critical pages for better initial load
const ChatPage = lazy(() => import("./pages/ChatPage"));
const TrainingPage = lazy(() => import("./pages/TrainingPage"));
const ModuleDetailPage = lazy(() => import("./pages/ModuleDetailPage"));
const LessonPage = lazy(() => import("./pages/LessonPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
  },
});

// Loading fallback component
const PageLoader = () => (
  <div className="p-6 space-y-4 animate-fade-in">
    <Skeleton className="h-12 w-64" />
    <Skeleton className="h-6 w-96" />
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
      <Skeleton className="h-48 w-full" />
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <UserProgressProvider>
        <ChatHistoryProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AchievementToast />
            <BrowserRouter>
              <AppLayout>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/chat" element={<ChatPage />} />
                    <Route path="/training" element={<TrainingPage />} />
                    <Route path="/training/:moduleId" element={<ModuleDetailPage />} />
                    <Route path="/training/:moduleId/lesson/:lessonId" element={<LessonPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </AppLayout>
            </BrowserRouter>
          </TooltipProvider>
        </ChatHistoryProvider>
      </UserProgressProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
