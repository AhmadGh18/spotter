export default function Model(props) {
  const { nodes, materials } = useGLTF("earth.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object_4.geometry}
        material={materials["Scene_-_Root"]}
        scale={1.128}
      />
    </group>
  );
}

useGLTF.preload("/earth.gltf");
