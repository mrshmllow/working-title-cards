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

const Playlist: React.FC<
  {
    atlas: AsepriteAtlas;
    tags: string[];
    depthResolve?: () => string;
    loop: boolean;
    playing: boolean;
  } & ExtendedColors<
    Overwrite<
      Partial<MeshLambertMaterial>,
      NodeProps<MeshLambertMaterial, [MeshLambertMaterialParameters]>
    >
  >
> = ({ loop, tags, atlas, playing, depthResolve, ...props }) => {
  const tilesH = useMemo(() => Object.keys(atlas.frames).length, [atlas]);
  const [state, setState] = useState<{ tagIndex: number; frame: number }>({
    tagIndex: 0,
    frame: atlas.meta.frameTags.find((tag) => tag.name === tags[0])!.from,
  });

  const tag = useMemo(
    () =>
      atlas.meta.frameTags.find((tag) => tag.name === tags[state.tagIndex])!,
    [state.tagIndex]
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

  useEffect(() => {
    const tagName =
      tag.to === 0
        ? `card #${tag.name}.ase`
        : `card #${tag.name} ${state.frame - tag.from}.ase`;

    const timeout = setInterval(
      () => {
        if (playing) {
          setState(({ tagIndex, frame }) => {
            if (frame === tag.to) {
              // amaybe add +
              if (
                !(tagIndex + 1 === tags.length)
                // (tagIndex === 0 && tags.length > 0)
              ) {
                return {
                  tagIndex: tagIndex + 1,
                  frame: atlas.meta.frameTags.find(
                    (tag) => tag.name === tags[tagIndex + 1]
                  )!.from,
                };
              } else if (loop) {
                return {
                  tagIndex: 0,
                  frame: atlas.meta.frameTags.find(
                    (tag) => tag.name === tags[0]
                  )!.from,
                };
              }
            } else {
              return {
                tagIndex,
                frame: frame + 1,
              };
            }
            playing = false;
            return { tagIndex, frame };
          });
        }
      },
      atlas.frames[tagName] !== undefined ? atlas.frames[tagName].duration : 100
      // 100
    );

    return () => clearInterval(timeout);
  }, [state.tagIndex]);

  return (
    <>
      <meshLambertMaterial
        args={[{ transparent: true, side: DoubleSide, alphaTest: 0.1 }]}
        map={texture}
        map-offset-x={(state.frame % tilesH) / tilesH}
        // alphaMap={
        //   animations[state.current].depthResolve !== undefined
        //     ? depthTextures[state.current][state.frame]
        //     : defaultDepth
        // }
        {...props}
      />
    </>
  );
};

export default Playlist;
