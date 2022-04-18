import React, { useEffect, useRef } from "react";
import { Group, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils";
import Animation from "../animation/Animation";
import useStore from "../state";
import { getNextCard } from "../helpers/helper";
import { Html } from "@react-three/drei/web/Html";
import pluralize from "pluralize";
import atlasJSON from "../../assets/card/card.json";
import { AsepriteAtlas } from "../types/aseprite";

const Deck: React.FC<{}> = () => {
  const ref = useRef(null!);
  const { setTooltip, pickupCard, turn, nextTurn, deck } = useStore(
    (state) => ({
      deck: state.deck,
      pickupCard: state.pickupCard,
      turn: state.turn,
      nextTurn: state.nextTurn,
      setTooltip: state.setTooltip,
    })
  );

  useEffect(() => {
    const reference = ref.current as unknown as Group;

    reference.rotation.set(degToRad(-90), 0, 0);
  }, []);

  const onClick = () => {
    if (turn === 0) {
      const card = getNextCard(deck.next, deck.cards, 0);
      pickupCard(turn, card);
      nextTurn();
    }
  };

  return (
    <>
      <group ref={ref} position={new Vector3(-(18 / 2), 2, 0)}>
        <Html
          className="text-white text-7xl flex flex-col"
          transform
          position={new Vector3(-11, 0, 0)}
        >
          <span>
            {deck.cards} {pluralize("Card", deck.cards)}
          </span>
          <span>
            {deck.explosions} {pluralize("Explosive", deck.explosions)}
          </span>
          <span>
            {((deck.explosions / deck.cards) * 100).toFixed(0)}% chance
          </span>
        </Html>
        <mesh
          onClick={onClick}
          onPointerOver={() =>
            setTooltip("Deck", "Click to pickup a card (Be Careful!)")
          }
          // onPointerLeave={() => clearTooltip()}
        >
          <planeGeometry args={[18 / 2, 25 / 2]} />

          <Animation
            loop={true}
            playing={true}
            // animation={cardAnimations["default"]}
            atlas={atlasJSON as unknown as AsepriteAtlas}
            tagName="default"
          />
        </mesh>
      </group>
    </>
  );
};

export default Deck;
