import { useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Group, Vector3 } from "three";
import Playlist from "../../animation/Playlist";
import useStore from "../../state";
import { CardType } from "../../types/cards/card_type";
import CardGui from "./CardGui";
import { AsepriteAtlas } from "../../types/aseprite";
import atlasJSON from "../../../assets/card/card.json";

const Card: React.FC<{
  type: CardType;
  known: boolean;
  moving?: Vector3;
  index: number;
  disabled: boolean;
}> = ({ type, moving, index, known, disabled }) => {
  const three = useThree();
  const { turn, addNext, nextTurn, placeOnDeck, setTooltip, cards } = useStore(
    (state) => ({
      setTooltip: state.setTooltip,
      turn: state.turn,
      nextTurn: state.nextTurn,
      placeOnDeck: state.placeOnDeck,
      addNext: state.addNext,
      cards: state.players[0].cards,
    })
  );
  const ref = useRef(null!);
  const reference = ref.current as unknown as Group | undefined;
  const [hovering, setHovering] = useState(false);

  useFrame(() => {
    let target: Vector3;

    if (hovering) {
      target = new Vector3(0, 2);
    } else {
      target = new Vector3(0, -2);
    }

    if (moving) {
      target.add(moving);
    }

    reference!.position.lerp(target, 0.1);
  });

  useEffect(() => {
    if (reference) {
      if (type !== CardType.explosion) {
        if (hovering) {
          reference.lookAt(three.camera.position);
        } else {
          reference.rotation.set(0, 0, 0);
        }
        setTooltip("A card", "descriptions wip");
      }
    }
  }, [hovering]);

  useEffect(() => {
    if (reference) reference.rotation.set(0, 0, 0);
  }, [cards]);

  return (
    <>
      <group ref={ref}>
        {hovering && <CardGui type={type} known={known} disabled={disabled} />}
        <mesh
          onPointerEnter={() => setHovering(true)}
          onPointerLeave={() => setHovering(false)}
          onClick={(event) => {
            event.stopPropagation();

            if (turn === 0 && !disabled) {
              if (type === CardType.skip) {
                placeOnDeck(0, index);
                nextTurn();
              } else if (type === CardType.future) {
                placeOnDeck(0, index);
                addNext(0);
              }
            }
          }}
          castShadow={true}
          renderOrder={10}
        >
          <planeGeometry args={[18 / 2, 25 / 2]} />

          <Playlist
            tags={["unturn", type.toString()]}
            atlas={atlasJSON as unknown as AsepriteAtlas}
            loop={false}
            playing={true}
            depthResolve={() => `/assets/card/depth/default0.png`}
            color={disabled ? "grey" : undefined}
            depthTest={false}
          />
        </mesh>
      </group>
    </>
  );
};

export default Card;
