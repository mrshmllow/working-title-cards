import { Html } from "@react-three/drei/web/Html";
import { Vector3 } from "three";
import cardLore from "../../types/cards/card_lore";

import { CardType } from "../../types/cards/card_type";
import React from "react";

const CardGui: React.FC<{
  type: CardType;
  known: boolean;
  disabled: boolean;
}> = ({ type, known, disabled }) => {
  return (
    <Html
      className={`bg-black text-white flex flex-col text-center rounded-lg p-2`}
      transform
      position={new Vector3(0, 8, 0)}
    >
      <span className="text-6xl">{cardLore[type].title}</span>
      <span className="text-xl">{cardLore[type].text}</span>
      {known && (
        <span className="text-xl">Your opponent knows you have this card.</span>
      )}
      {disabled && (
        <span className="text-xl">
          You already played one of these on your turn
        </span>
      )}
    </Html>
  );
};
export default CardGui;
