import useStore from '@/helpers/store'
import { useSpring, animated } from '@react-spring/three'
import { act, useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import { useEffect, useRef, useState } from 'react'
import { Euler, Plane, Vector3 } from 'three'
import { clamp } from 'three/src/math/MathUtils'

export interface Slider3DProps {
  origin: Vector3
  orientation: Euler
  direction: string
  length: number
  min: number
  max: number
  floorPlane: Plane
  setIsSliding: (value: boolean) => void
}

const ZSlider = ({
  origin,
  orientation,
  direction,
  length,
  min,
  max,
  floorPlane,
  setIsSliding,
}: Slider3DProps) => {
  const thumbPos = -((useStore((state) => state.width) / max) * length)
  const xPos = -origin.x

  const { camera } = useThree()

  const [pos, setPos] = useState([thumbPos, 0, 0])
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)

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
  const floorplane = new Plane(new Vector3(0, 1, 0), 0)

  const bind = useDrag(
    ({ active, timeStamp, event }) => {
      if (active) {
        // @ts-ignore
        event.ray.intersectPlane(floorplane, planeIntersectPoint)

        console.log(planeIntersectPoint.z)
        const zPosition = clamp(planeIntersectPoint.z + (length + 0.3), -3, 0)
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
