import { 
  Home, 
  MessageSquare, 
  BookOpen, 
  LayoutDashboard, 
  BarChart3, 
  Settings, 
  Moon, 
  Sun,
  Shield,
  Zap
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const mainNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Chat", url: "/chat", icon: MessageSquare },
  { title: "Training", url: "/training", icon: BookOpen },
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { theme, toggleMode } = useTheme();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar 
      className={cn(
        "border-r border-border/50 transition-all duration-300",
        "bg-sidebar/80 backdrop-blur-xl"
      )}
      collapsible="icon"
    >
      <SidebarHeader className="p-4 border-b border-border/30">
        <div className={cn(
          "flex items-center gap-3 transition-all duration-300",
          collapsed && "justify-center"
        )}>
          <div className="relative">
            <Shield className="h-8 w-8 text-primary animate-pulse-glow" />
            <Zap className="h-4 w-4 text-secondary absolute -bottom-1 -right-1" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-cyber font-bold text-lg text-primary neon-text-cyan">
                CYBER
              </span>
              <span className="font-cyber text-xs text-secondary -mt-1">
                SENSEI
              </span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={cn(
            "text-muted-foreground/60 uppercase tracking-wider text-xs",
            collapsed && "sr-only"
          )}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        "hover:bg-primary/10 hover:text-primary",
                        "group relative overflow-hidden",
                        isActive(item.url) && "bg-primary/15 text-primary neon-border"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 transition-all duration-200",
                        "group-hover:scale-110",
                        isActive(item.url) && "text-primary drop-shadow-[0_0_8px_hsl(var(--primary))]"
                      )} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                      {isActive(item.url) && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupLabel className={cn(
            "text-muted-foreground/60 uppercase tracking-wider text-xs",
            collapsed && "sr-only"
          )}>
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200",
                        "hover:bg-primary/10 hover:text-primary",
                        "group",
                        isActive(item.url) && "bg-primary/15 text-primary neon-border"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 transition-all duration-200",
                        "group-hover:scale-110"
                      )} />
                      {!collapsed && (
                        <span className="font-medium">{item.title}</span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/30">
        <Button
          variant="ghost"
          size={collapsed ? "icon" : "default"}
          onClick={toggleMode}
          className={cn(
            "w-full justify-center gap-2 hover:bg-primary/10",
            "transition-all duration-200"
          )}
        >
          {theme.mode === 'dark' ? (
            <>
              <Sun className="h-5 w-5 text-neon-orange" />
              {!collapsed && <span>Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 text-neon-purple" />
              {!collapsed && <span>Dark Mode</span>}
            </>
          )}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
