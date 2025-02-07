import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function Airplane() {
  const { scene } = useGLTF("/plane2.glb");
  const airplaneRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (airplaneRef.current) {
      // ✈ Smooth flight movement
      airplaneRef.current.position.y = Math.sin(t * 1.5) * 0.5; // Up-down motion
      airplaneRef.current.position.x = Math.cos(t * 0.8) * 1.2; // Side-to-side motion
      airplaneRef.current.rotation.x = Math.sin(t * 0.5) * 0.05; // Small pitch tilt
      airplaneRef.current.rotation.z = Math.cos(t * 0.7) * 0.05; // Small roll tilt

      // 🔄 Reset position if it goes too far (prevents it from disappearing)
      if (airplaneRef.current.position.z < -10) {
        airplaneRef.current.position.z = 5; // Reset position
      } else {
        airplaneRef.current.position.z -= 0.03; // Forward movement
      }
    }
  });

  return (
    <group ref={airplaneRef}>
      <primitive object={scene} scale={[10, 10, 10]} />

      {/* Left Wing Light (Red) */}
      <pointLight
        position={[-2, 0, 1]}
        intensity={2}
        color="red"
        distance={5}
      />

      {/* Right Wing Light (Green) */}
      <pointLight
        position={[2, 0, 1]}
        intensity={2}
        color="green"
        distance={5}
      />

      {/* Nose Light (White for Headlight) */}
      <pointLight
        position={[0, 0.5, 3]}
        intensity={3}
        color="white"
        distance={7}
      />
    </group>
  );
}
