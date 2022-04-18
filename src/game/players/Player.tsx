import React from "react";
import { Vector3 } from "three";
import { middleOfArray } from "../../math";
import { useStore } from "../../state";
import Card from "../card/Card";
import shallow from "zustand/shallow";

const Player: React.FC<{ number: number }> = ({ number }) => {
  const { me } = useStore((state) => ({ me: state.players[number] }), shallow);

  return (
    <>
      {me.cards.map((card, index) => (
        <Card
          type={card.type}
          key={card.id}
          index={index}
          known={card.knownBy.includes(1)}
          disabled={me.playedThisTurn.includes(card.type)}
          moving={
            new Vector3(
              me.cards.length % 2 === 0
                ? (index - middleOfArray(me.cards)) * 9.5 + 9.5 / 2
                : (index - middleOfArray(me.cards)) * 9.5,
              0,
              29
            )
          }
        />
      ))}
    </>
  );
};

export default Player;
