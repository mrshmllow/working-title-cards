const cardLore: {
  [key: string]: {
    title: string;
    text: string;
  };
} = {
  default: {
    title: "Unkown",
    text: "An unknown card",
  },
  explosion: {
    title: "Explosion!",
    text: "If your reading this, your probably dead",
  },
  future: {
    title: "See The Future",
    text: "Play to see the next 3 cards in the deck",
  },
  skip: {
    title: "Skip",
    text: "Play to skip your turn",
  },
};

export default cardLore;
