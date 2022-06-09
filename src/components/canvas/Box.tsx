import useStore from '@/helpers/store'
import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

const BoxComponent = () => {
  const width = useStore((state) => state.width)
  const height = useStore((state) => state.height)
  const depth = useStore((state) => state.depth)

 
  const mesh = useRef(null)
  
  const [clicked, setClicked] = useState(false)
  const [hovered, setHover] = useState(false)
  
  useFrame((state, delta) => {}
    // mesh.current
    //   ? (mesh.current.rotation.y = mesh.current.rotation.x += 0.01)
    //   : null
  )
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <>
      <mesh
        castShadow
        receiveShadow
        ref={mesh}
        onClick={() => {clicked ? setClicked(false) : setClicked(true)}}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        scale={hovered ? 1.01 : 1}
        position={[0, height / 2, 0]}
      >
        <boxBufferGeometry args={[width, height, depth]} />
        <meshPhysicalMaterial roughness={1} transparent opacity={0.6} color={clicked ? 'lightblue' : hovered ? 'aquamarine' : 'white'} />
      </mesh>
    </>
  )
}
export default BoxComponent
