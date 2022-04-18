import { ExtendedColors, NodeProps, Overwrite } from "@react-three/fiber";
import React, { useEffect, useMemo, useState } from "react";
import {
  DoubleSide,
  MeshLambertMaterial,
  MeshLambertMaterialParameters,
} from "three";
import { AsepriteAtlas } from "../types/aseprite";
import {loaderAtlasTexture} from "./animationHelper";

const Animation: React.FC<
  {
    atlas: AsepriteAtlas;
    tagName: string;
    playing: boolean;
    loop: boolean;
  } & ExtendedColors<
    Overwrite<
      Partial<MeshLambertMaterial>,
      NodeProps<MeshLambertMaterial, [MeshLambertMaterialParameters]>
    >
  >
> = ({ playing, tagName, loop, atlas, ...props }) => {
  const tilesH = useMemo(() => Object.keys(atlas.frames).length, [atlas]);
  const tag = useMemo(
    () => atlas.meta.frameTags.find((tag) => tag.name === tagName)!,
    [atlas]
  );
  const texture = useMemo(() => {
    return loaderAtlasTexture(atlas.meta.image, tilesH)
  }, []);

  const [frame, setFrame] = useState(tag.from);

  useEffect(() => {
    const tagName =
      tag.to === 0
        ? `card #${tag.name}.ase`
        : `card #${tag.name} ${frame - tag.from}.ase`;

    const timeout = setTimeout(
      () => {
        if (playing) {
          setFrame((frame) => {
            if (frame === tag.to) {
              if (loop) {
                return tag.from;
              }
            } else {
              return frame + 1;
            }
            return frame;
          });
        }
      },
      atlas.frames[tagName] !== undefined ? atlas.frames[tagName].duration : 100
    );

    return () => clearTimeout(timeout);
  }, [frame]);

  return (
    <meshLambertMaterial
      args={[{ transparent: true, side: DoubleSide }]}
      map={texture}
      map-offset-x={(frame % tilesH) / tilesH}
      {...props}
    />
  );
};

export default Animation;
