import {NearestFilter, RepeatWrapping, TextureLoader} from "three";

export const loaderAtlasTexture = (path: string, tilesH: number) => {
    const loader = new TextureLoader();
    const image = loader.load(path);
    image.magFilter = NearestFilter;
    image.wrapS = RepeatWrapping;
    image.wrapT = RepeatWrapping;

    image.repeat.set(1 / tilesH, 1);

    return image;
}
