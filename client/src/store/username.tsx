import { create } from "zustand";

const adjectives = [
  "Brave",
  "Calm",
  "Clever",
  "Swift",
  "Mighty",
  "Gentle",
  "Loyal",
  "Bold",
  "Wise",
  "Jolly",
  "Fierce",
  "Kind",
  "Happy",
  "Noble",
  "Bright",
  "Sneaky",
  "Charming",
  "Silent",
  "Playful",
  "Smart",
];

const animals = [
  "Lion",
  "Tiger",
  "Elephant",
  "Wolf",
  "Fox",
  "Bear",
  "Eagle",
  "Falcon",
  "Shark",
  "Whale",
  "Rabbit",
  "Panda",
  "Horse",
  "Dolphin",
  "Hawk",
  "Leopard",
  "Owl",
  "Cheetah",
  "Giraffe",
  "Zebra",
];

function generateUsername() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adj}-${animal}`.toLowerCase();
}

type UsernameStore = {
  username: string;
  setUsername: (name: string) => void;
  generateNewUsername: () => void;
};

export const useUsernameStore = create<UsernameStore>((set) => ({
  username: generateUsername(),
  setUsername: (name) => set({ username: name }),
  generateNewUsername: () => set({ username: generateUsername() }),
}));
