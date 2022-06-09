import { BakeShadows, softShadows } from "@react-three/drei"

const Stage = () => {
  return (
      <>
      {/* Fill */}
      <ambientLight intensity={0.5} />
      {/* Main */}
      <directionalLight
        position={[5, 12, -2]}
        intensity={1}
        shadow-camera-far={70}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-mapSize={[512, 512]}
        castShadow
      />
      {/* Strip */}
      <directionalLight position={[-10, -10, 2]} intensity={3} />
      {/* Ground */}
      <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.5, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </>
  )
}

export default Stage
