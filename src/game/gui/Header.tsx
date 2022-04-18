import { Html } from "@react-three/drei/web/Html";
import { useRef } from "react";
import useStore from "../../state";

const Header: React.FC = () => {
  const turn = useStore((state) => state.turn);
  const ref = useRef(null!);

  return (
    <>
      <group ref={ref}>
        <Html
          className="text-white bg-black text-center w-64"
          calculatePosition={(_el, _camera, size) => {
            return [size.width / 2 - 64 * 2, 0];
          }}
        >
          <span>
            {turn === 0
              ? "Its your turn. You have to pickup to end your turn."
              : "Its the enemies turn"}
          </span>
        </Html>
      </group>
    </>
  );
};

export default Header;
