import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = "cyber_sensei_auth";
const USERS_STORAGE_KEY = "cyber_sensei_users";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        setUser(parsed);
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const getUsers = (): Record<string, { password: string; user: User }> => {
    const saved = localStorage.getItem(USERS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  };

  const saveUsers = (users: Record<string, { password: string; user: User }>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getUsers();
    const userData = users[email.toLowerCase()];
    
    if (!userData) {
      return { success: false, error: "No account found with this email" };
    }
    
    if (userData.password !== password) {
      return { success: false, error: "Incorrect password" };
    }
    
    setUser(userData.user);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData.user));
    return { success: true };
  };

  const signup = async (email: string, password: string, name: string): Promise<{ success: boolean; error?: string }> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const users = getUsers();
    
    if (users[email.toLowerCase()]) {
      return { success: false, error: "An account with this email already exists" };
    }
    
    if (password.length < 6) {
      return { success: false, error: "Password must be at least 6 characters" };
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      name,
      avatar: "🥷",
      createdAt: new Date().toISOString(),
    };
    
    users[email.toLowerCase()] = { password, user: newUser };
    saveUsers(users);
    
    setUser(newUser);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
