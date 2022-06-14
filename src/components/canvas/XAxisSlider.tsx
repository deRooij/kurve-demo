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

const XSlider = ({
  origin,
  length,
  max,
  floorPlane,
  setIsSliding,
}: Slider3DProps) => {
  const thumbPos = -((useStore((state) => state.width) / max) * length)

  const [pos, setPos] = useState([thumbPos, 0, 0])
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)

  const storeValue = useStore((state) => state.width)
  useEffect(() => {
    setPos([(-storeValue / max) * length, 0, 0])
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
        const xPosition = clamp(planeIntersectPoint.x - origin.x, -length, 0)
        const localPosition = [xPosition, 0, 0]
        setPos(localPosition)

        const sliderValue = clamp((Math.abs(pos[0]) / 3) * 10, 0.1, 10)
        useStore.setState({ width: sliderValue })
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
          position={[-length / 2, 0, 0]}
          rotation={[0, 0, Math.PI * 0.5]}
        >
          <cylinderBufferGeometry args={[0.025, 0.025, length + 0.2, 16, 5]} />
          <meshBasicMaterial color='red' />
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
          <meshBasicMaterial color='red' />
        </animated.mesh>
        {/* Left border */}
        <mesh castShadow position={[0.15, 0, 0]}>
          <boxBufferGeometry args={[0.1, 0.2, 0.2]} />
          <meshBasicMaterial color='black' />
        </mesh>
        {/* Right border */}
        <mesh castShadow position={[-length - 0.15, 0, 0]}>
          <boxBufferGeometry args={[0.1, 0.2, 0.2]} />
          <meshBasicMaterial color='black' />
        </mesh>
      </group>
    </>
  )
}

export default XSlider
