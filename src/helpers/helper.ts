import useStore, { ICard } from "../state";
import { CardType } from "../types/cards/card_type";
import rawNext from "./rawNext";
import { generateUUID } from "three/src/math/MathUtils";

const { decrementDeck, decrementExplosions, shiftNext, players } =
  useStore.getState();

export const getNextCard = (
  next: ICard[],
  cards: number,
  forPlayer: number
): ICard => {
  decrementDeck();

  if (next.length !== 0) {
    shiftNext();

    // if (next[0].knownBy) {
    //   next[0].knownBy.push(forPlayer);
    // } else {
    //   next[0].knownBy = [forPlayer];
    // }

    return next[0];
  }

  const num = Math.floor(Math.random() * cards + 1);

  if (num <= players.length) {
    decrementDeck();
    decrementExplosions();

    return {
      type: CardType.explosion,
      knownBy: [forPlayer],
      id: generateUUID(),
    };
  } else {
    return rawNext(forPlayer);
  }
};
