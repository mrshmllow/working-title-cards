import Game from "./game/game";
import { createRoot } from "react-dom/client";
import "./style.css";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, WebGLRenderer } from "three";
import React, { Suspense } from "react";
import { Html } from "@react-three/drei/web/Html";
import ResourceLoader from "./ResourceLoader";

const World: React.FC = () => {
  return (
    <Canvas
      camera={
        new PerspectiveCamera(
          40,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
      }
      gl={(canvas) =>
        new WebGLRenderer({
          canvas,
          antialias: true,
        })
      }
    >
      <Suspense
        fallback={
          <Html className="text-white">
            <span>Loading a billion textures Wait pls</span>
          </Html>
        }
      >
        <ResourceLoader />
        <Game />
      </Suspense>
    </Canvas>
  );
};

createRoot(document.getElementById("root")!).render(
  <>
    <World />
    {/* <Header />
    <Tooltip /> */}
  </>
);
