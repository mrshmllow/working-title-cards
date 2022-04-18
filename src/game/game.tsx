import { useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import {
  CameraHelper,
  DirectionalLight,
  // CameraHelper,
  // DirectionalLight,
  PCFSoftShadowMap,
  Vector3,
} from "three";
import useStore from "../state";
import Plane from "./card/Plane";
import Deck from "./Deck";
// import Header from "./gui/Header";
import Player from "./players/Player";
import Opponent from "./players/Opponent";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import CardWorld from "./Cards_world";
import Discard from "./Discard";

const Game: React.FC<{}> = () => {
  const three = useThree();
  const { next, clearTooltip } = useStore((state) => ({
    next: state.deck.next,
    clearTooltip: state.clearTooltip,
  }));
  const lightRef = useRef(null!);

  const d = 10;

  useEffect(() => {
    three.camera.position.set(0, 25, 65);
    // three.camera.position.set(15, 25, 60);
    three.camera.lookAt(new Vector3(0, 0, 0));
    three.gl.shadowMap.enabled = true;
    three.gl.shadowMap.type = PCFSoftShadowMap;

    // const effect = new AsciiEffect(three.gl);
    // effect.setSize(
    //   three.gl.domElement.clientHeight,
    //   three.gl.domElement.clientWidth
    // );

    new OrbitControls(three.camera, three.gl.domElement);

    const reference = lightRef.current as unknown as DirectionalLight;
    if (reference) {
      const helper = new CameraHelper(reference.shadow.camera);
      three.scene.add(helper);
    }

    document.addEventListener("mousemove", () => {
      if (three.raycaster.intersectObjects(three.scene.children).length === 0)
        clearTooltip();
    });
  }, []);

  useEffect(() => {
    console.log("KNOWN NEXT:", next);
  }, [next]);

  return (
    <>
      {/* <ambientLight intensity={0.5} color={0xffffff} /> */}
      <directionalLight
        position={new Vector3(5, 15, 20)}
        castShadow={true}
        shadow-camera-left={-d}
        shadow-camera-right={d}
        shadow-camera-top={d}
        shadow-camera-bottom={-d}
        // ref={lightRef}
      />
      <Deck />
      <Discard />
      {/* <Header /> */}

      <Plane />
      {/* <CardWorld /> */}

      <Player number={0} />
      <Opponent number={1} />
    </>
  );
};

export default Game;
