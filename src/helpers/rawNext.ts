import { ICard } from "../state";
import cardChances from "../types/cards/card_chances";
import { CardType } from "../types/cards/card_type";
import { generateUUID } from "three/src/math/MathUtils";

const rawNext = (forPlayer: number): ICard => {
  const weights: number[] = [];

  for (let i = 0; i < cardChances.length; i++) {
    const value = cardChances[i];

    weights[i] = value.chance + (weights[i - 1] || 0);
  }

  const random = Math.random() * weights[weights.length - 1];

  for (let i = 0; i < cardChances.length; i++) {
    const value = cardChances[i];

    if (weights[i] > random) {
      return {
        type: value.cards[
          Math.floor(Math.random() * value.cards.length)
        ] as CardType,
        knownBy: [forPlayer],
        id: generateUUID(),
      };
    }
  }
  console.warn(
    "There is something wrong with time and space. Gave a future card as a fallback!!"
  );
  return {
    type: CardType.future,
    knownBy: [forPlayer],
    id: generateUUID(),
  };
};

export default rawNext;
