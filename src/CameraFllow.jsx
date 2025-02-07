import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const CameraFollow = ({ target }) => {
  useFrame(({ camera }) => {
    if (target.current) {
      const targetPos = target.current.position
        .clone()
        .add(new Vector3(0, 2, 10));
      camera.position.lerp(targetPos, 0.05);
      camera.lookAt(target.current.position);
    }
  });

  return null;
};

export default CameraFollow;
