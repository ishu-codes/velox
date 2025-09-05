import { createContext, useContext, type ReactNode } from "react";
import { useAuth, type AuthState } from "@/hooks/useAuth";

const AuthContext = createContext<AuthState | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { username, name, isAuthenticated, login, logout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ username, name, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
