import useStore from '@/helpers/store'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { animated, useSpring } from '@react-spring/three'

const BoxComponent = () => {
  const width = useStore((state) => state.width)
  const height = useStore((state) => state.height)
  const depth = useStore((state) => state.depth)

  const mesh = useRef(null)

  const [clicked, setClicked] = useState(false)
  const [hovered, setHover] = useState(false)

  useFrame(
    (state, delta) => {}
    // mesh.current
    //   ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
    //   : null
  )
  return (
    <>
      <animated.mesh
        castShadow
        receiveShadow
        ref={mesh}
        onClick={() => {
          clicked ? setClicked(false) : setClicked(true)
        }}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        position={[-width / 2 + 1, height / 2, -depth / 2 - 1]}
      >
        <boxBufferGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial
          roughness={1}
          transparent
          opacity={0.6}
          color={clicked ? 'lightblue' : hovered ? 'aquamarine' : 'white'}
        />
      </animated.mesh>
    </>
  )
}
export default BoxComponent
