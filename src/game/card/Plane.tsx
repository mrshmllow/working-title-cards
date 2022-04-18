import { useEffect, useRef } from "react";
import { DoubleSide, Mesh } from "three";
import { degToRad } from "three/src/math/MathUtils";

const Plane = () => {
  const ref = useRef(null!);

  useEffect(() => {
    const reference = ref.current as unknown as Mesh;

    reference.rotation.set(degToRad(-90), 0, 0);
    reference.position.set(0, 0, 0);
  }, []);

  return (
    <mesh ref={ref} receiveShadow={true}>
      <planeBufferGeometry args={[64, 64]} />
      <meshLambertMaterial args={[{ side: DoubleSide }]} />
    </mesh>
  );
};

export default Plane;
