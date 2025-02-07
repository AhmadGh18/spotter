import { useProgress, Html } from "@react-three/drei";

export default function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-white text-lg font-semibold bg-black bg-opacity-50 px-4 py-2 rounded-lg">
        Loading {progress.toFixed(0)}%
      </div>
    </Html>
  );
}
