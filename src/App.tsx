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
import Index from "./pages/Index";
import ChatPage from "./pages/ChatPage";
import TrainingPage from "./pages/TrainingPage";
import ModuleDetailPage from "./pages/ModuleDetailPage";
import LessonPage from "./pages/LessonPage";
import DashboardPage from "./pages/DashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
              </AppLayout>
            </BrowserRouter>
          </TooltipProvider>
        </ChatHistoryProvider>
      </UserProgressProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
