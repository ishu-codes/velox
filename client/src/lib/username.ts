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

export function generateUsername() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const animal = animals[Math.floor(Math.random() * animals.length)];
  return `${adj} ${animal}`;
}
