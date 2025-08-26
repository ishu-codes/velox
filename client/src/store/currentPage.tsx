import { create } from "zustand";

type CurrentPageStore = {
  currentPage: string;
  desc: string;
  setCurrentPage: (name: string, desc?: string) => void;
};

export const useCurrentPageStore = create<CurrentPageStore>((set) => ({
  currentPage: "home",
  desc: "",
  setCurrentPage: (name, desc = "") => set({ currentPage: name, desc }),
}));
