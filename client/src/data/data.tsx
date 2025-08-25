

export type Contact = {
  name: string;
  last: string;
  time: string;
  unread?: number;
  pinned?: boolean;
  active?: boolean;
  subtle?: boolean;
  typing?: boolean;
  emoji?: string;
};

export const CONTACTS: Contact[] =
  [
    {
      name: "Harry Maguire",
      last: "You need to improve now",
      time: "09:12 AM",
      pinned: true,
    },
    {
      name: "United Family",
      last: "Rashford is typing…",
      time: "06:25 AM",
      active: true,
      emoji: "🟩",
      typing: true,
    },
    {
      name: "Rasmus Højlund",
      last: "Bos, I need to talk today",
      time: "03:11 AM",
      unread: 2,
    },
    { name: "Andre Onana", last: "I need more time bos🥲", time: "11:34 AM" },
    { name: "Reguilon", last: "Great performance lad🔥", time: "09:12 AM" },
    { name: "Bruno Fernandes", last: "Play the game Bruno!", time: "10:21 AM" },
  ];

export const MSGS = [
  {
    from: "Harry Maguire",
    time: "08:34 AM",
    text: (
      <>
        Hey lads, tough game yesterday. Let’s talk about what went wrong and how
        we can improve 😊.
      </>
    ),
  },
  {
    from: "Bruno Fernandes",
    time: "08:34 AM",
    text: (
      <>
        Agreed, Harry <span className="inline-block align-text-bottom">👍🏻</span>
        . We had some good moments, but we need to be more clinical in front of
        the goal 😔.
      </>
    ),
  },
  {
    mine: true,
    time: "08:34 AM",
    ticks: 2 as const,
    text: (
      <>
        We need to control the midfield and exploit their defensive weaknesses.
        Bruno and Paul, I’m counting on your creativity. Marcus and Jadon,
        stretch their defense wide. Use your pace and take on their full-backs.
      </>
    ),
  },
];
