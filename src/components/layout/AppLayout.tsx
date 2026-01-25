import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background cyber-grid">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-h-screen">
          <header className="h-14 flex items-center px-4 border-b border-border/30 bg-background/50 backdrop-blur-md sticky top-0 z-40">
            <SidebarTrigger className="hover:bg-primary/10 hover:text-primary transition-colors" />
            <div className="ml-auto flex items-center gap-4">
              {/* Future: User menu, notifications */}
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <div className={cn(
              "animate-fade-in",
              "min-h-full"
            )}>
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
