import { ExtendedColors, NodeProps, Overwrite } from "@react-three/fiber";
import React, { useEffect, useMemo, useState } from "react";
import {
  DoubleSide,
  MeshLambertMaterial,
  MeshLambertMaterialParameters,
  NearestFilter,
  RepeatWrapping,
  TextureLoader,
} from "three";
import { AsepriteAtlas } from "../types/aseprite";

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
    const loader = new TextureLoader();
    const image = loader.load(atlas.meta.image);
    image.magFilter = NearestFilter;
    image.wrapS = RepeatWrapping;
    image.wrapT = RepeatWrapping;

    image.repeat.set(1 / tilesH, 1);

    return image;
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
