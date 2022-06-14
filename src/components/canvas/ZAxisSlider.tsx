import useStore from '@/helpers/store'
import { useSpring, animated } from '@react-spring/three'
import { useDrag } from '@use-gesture/react'
import { useEffect, useState } from 'react'
import { Plane, Vector3 } from 'three'
import { clamp } from 'three/src/math/MathUtils'

export interface Slider3DProps {
  origin: Vector3
  length: number
  max: number
  floorPlane: Plane
  setIsSliding: (value: boolean) => void
}

const ZSlider = ({
  origin,
  length,
  max,
  floorPlane,
  setIsSliding,
}: Slider3DProps) => {
  const thumbPos = -((useStore((state) => state.depth) / max) * length)

  // const listeners = [
  //   useStore((state) => state.width),
  //   useStore((state) => state.height),
  //   useStore((state) => state.depth),
  // ]

  const [pos, setPos] = useState([0, 0, thumbPos])
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)

  const storeValue = useStore((state) => state.depth)
  useEffect(() => {
    setPos([0, 0, (-storeValue / max) * length])
  }, [storeValue, max, length])

  const [spring, api] = useSpring(() => ({
    position: pos,
    scale: 1,
    config: { friction: 12 },
  }))

  api.start({
    position: pos,
    scale: dragging ? 0.9 : hovered ? 1.2 : 1,
  })

  let planeIntersectPoint = new Vector3()

  const bind = useDrag(
    ({ active, timeStamp, event }) => {
      if (active) {
        // @ts-ignore
        event.ray.intersectPlane(floorPlane, planeIntersectPoint)

        const zPosition = clamp(planeIntersectPoint.z, -3, 0)
        const localPosition = [0, 0, zPosition]
        setPos(localPosition)

        const sliderValue = clamp((Math.abs(pos[2]) / length) * max, 0.1, 10)
        useStore.setState({ depth: sliderValue })
      }

      setIsSliding(active)
      setDragging(active)
      return timeStamp
    },
    { delay: false }
  )

  return (
    <>
      <group position={origin}>
        {/* Track: */}
        <mesh
          castShadow
          position={[0, 0, -length / 2]}
          rotation={[-Math.PI * 0.5, 0, 0]}
        >
          <cylinderBufferGeometry args={[0.025, 0.025, length + 0.2, 16, 5]} />
          <meshBasicMaterial color='blue' />
        </mesh>
        {/* Thumb */}
        {/* @ts-ignore */}
        <animated.mesh
          castShadow
          {...spring}
          {...bind()}
          onPointerOver={() => {
            setHovered(true)
          }}
          onPointerLeave={() => {
            setHovered(false)
          }}
        >
          <boxBufferGeometry args={[0.25, 0.25, 0.25]} />
          <meshBasicMaterial color='blue' />
        </animated.mesh>
        {/* Left border */}
        <mesh castShadow position={[0, 0, 0.15]}>
          <boxBufferGeometry args={[0.2, 0.2, 0.1]} />
          <meshBasicMaterial color='black' />
        </mesh>
        {/* Right border */}
        <mesh castShadow position={[0, 0, -length - 0.15]}>
          <boxBufferGeometry args={[0.2, 0.2, 0.1]} />
          <meshBasicMaterial color='black' />
        </mesh>
      </group>
    </>
  )
}

export default ZSlider
