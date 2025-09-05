import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthState = {
  username: string;
  name: string;
  isAuthenticated: boolean;
  login: (username: string, name: string) => void;
  logout: () => void;
};

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      username: "",
      name: "",
      isAuthenticated: false,

      login: (username, name) =>
        set(() => ({
          username,
          name,
          isAuthenticated: true,
        })),

      logout: () =>
        set(() => ({
          username: "",
          name: "",
          isAuthenticated: false,
        })),
    }),
    {
      name: "auth",
    }
  )
);
