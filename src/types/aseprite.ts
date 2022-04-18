export interface AsepriteAtlas {
  meta: {
    frameTags: {
      name: string;
      from: number;
      to: number;
      direction: "forward" | "backward";
    }[];
    image: string;
  };
  frames: {
    [key: string]: {
      frame: {
        x: number;
        y: number;
        w: number;
        h: number;
      };
      sourceSize: {
        w: number;
        h: number;
      };
      duration: number;
    };
  };
}
