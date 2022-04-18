import create from "zustand";
import produce from "immer";
import { CardType } from "./types/cards/card_type";
import rawNext from "./helpers/rawNext";

export interface ICard {
  type: CardType;
  knownBy: number[];
  id: string;
}

export interface IPlayer {
  cards: ICard[];
  playedThisTurn: CardType[];
}

interface GameState {
  tooltip: {
    title: string;
    text: string;
  } | null;
  setTooltip: (title: string, text: string) => void;
  clearTooltip: () => void;

  players: [IPlayer, IPlayer];
  pickupCard: (player: number, card: ICard) => void;
  placeOnDeck: (player: number, card: number) => void;
  turn: number;
  nextTurn: () => void;

  deck: {
    cards: number;
    explosions: number;
    skips: number;
    next: ICard[];
  };
  decrementDeck: () => void;
  decrementExplosions: () => void;
  decrementSkips: () => void;
  addNext: (forPlayer: number) => void;
  shiftNext: () => void;

  discard: CardType | null;
}

export const useStore = create<GameState>((set) => ({
  tooltip: {
    text: "",
    title: "",
  },
  setTooltip: (title: string, text: string) =>
    set(
      produce<GameState>((state) => {
        state.tooltip = {
          text: text,
          title: title,
        };
      })
    ),
  clearTooltip: () => {
    set(
      produce<GameState>((state) => {
        state.tooltip = null;
      })
    );
  },

  players: [
    {
      cards: [],
      playedThisTurn: [],
    },
    {
      cards: [
        // {
        //   type: CardTypes.explosion,
        //   knownBy: [0],
        // },
      ],
      playedThisTurn: [],
    },
  ],
  placeOnDeck: (player, card) => {
    set(
      produce<GameState>((state) => {
        state.discard = state.players[player].cards[card].type;

        state.players[player].playedThisTurn.push(
          state.players[player].cards[card].type
        );
        state.players[player].cards.splice(card, 1);
      })
    );
  },

  turn: 0,
  nextTurn: () => {
    set(
      produce<GameState>((state) => {
        state.players[state.turn].playedThisTurn = [];
        if (state.turn + 1 === state.players.length) {
          state.turn = 0;
        } else {
          state.turn += 1;
        }
      })
    );
  },

  pickupCard: (player, card) => {
    set(
      produce<GameState>((state) => {
        state.players[player].cards = [...state.players[player].cards, card];
      })
    );
  },

  deck: {
    cards: 15,
    explosions: 1,
    skips: 1,
    next: [],
  },
  decrementDeck: () => {
    set(
      produce<GameState>((state) => {
        state.deck.cards -= 1;
      })
    );
  },
  decrementExplosions: () => {
    set(
      produce<GameState>((state) => {
        state.deck.explosions -= 1;
      })
    );
  },
  decrementSkips: () => {
    set(
      produce<GameState>((state) => {
        state.deck.skips -= 1;
      })
    );
  },
  addNext: (forPlayer) => {
    set(
      produce<GameState>((state) => {
        for (let i = 0; i < 3; i++) {
          if (state.deck.next[i]) {
            !state.deck.next[i].knownBy.includes(1) &&
              state.deck.next[i].knownBy.push(1);
          } else {
            state.deck.next.push(rawNext(forPlayer));
          }
        }
      })
    );
  },
  shiftNext: () => {
    set(
      produce<GameState>((state) => {
        state.deck.next.shift();
      })
    );
  },

  discard: null,
}));

export default useStore;
