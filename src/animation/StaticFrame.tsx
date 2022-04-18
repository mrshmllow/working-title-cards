import { ExtendedColors, NodeProps, Overwrite } from "@react-three/fiber";
import React, { useMemo } from "react";
import {
  DoubleSide,
  MeshLambertMaterial,
  MeshLambertMaterialParameters,
  NearestFilter,
  RepeatWrapping,
  TextureLoader,
} from "three";
import { AsepriteAtlas } from "../types/aseprite";

const StaticFrame: React.FC<
  {
    atlas: AsepriteAtlas;
    frame: number;
  } & ExtendedColors<
    Overwrite<
      Partial<MeshLambertMaterial>,
      NodeProps<MeshLambertMaterial, [MeshLambertMaterialParameters]>
    >
  >
> = ({ frame, atlas, ...props }) => {
  const tilesH = useMemo(() => Object.keys(atlas.frames).length, [atlas]);
  const texture = useMemo(() => {
    const loader = new TextureLoader();
    const image = loader.load(atlas.meta.image);
    image.magFilter = NearestFilter;
    image.wrapS = RepeatWrapping;
    image.wrapT = RepeatWrapping;

    image.repeat.set(1 / tilesH, 1);

    return image;
  }, []);

  return (
    <meshLambertMaterial
      args={[{ transparent: true, side: DoubleSide }]}
      map={texture}
      map-offset-x={(frame % tilesH) / tilesH}
      {...props}
    />
  );
};

export default StaticFrame;
