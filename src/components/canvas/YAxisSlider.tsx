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

const YSlider = ({
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
  const referencePlane = new Plane(new Vector3(0, 0, 0), 0)

  const bind = useDrag(
    ({ active, timeStamp, event }) => {
      if (active) {
        referencePlane.setFromNormalAndCoplanarPoint(
          camera.position.clone().normalize(),
          new Vector3(2, 0, -3)
        )

        // @ts-ignore
        event.ray.intersectPlane(referencePlane, planeIntersectPoint)

        console.log(planeIntersectPoint.y)
        const yPosition = clamp(planeIntersectPoint.y, 0, 3)
        const localPosition = [0, yPosition, 0]
        setPos(localPosition)

        const sliderValue = clamp((Math.abs(pos[1]) / length) * max, 0.1, 10)
        useStore.setState({ height: sliderValue })
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
        <mesh castShadow position={[0, length / 2, 0]}>
          <cylinderBufferGeometry args={[0.025, 0.025, length + 0.2, 16, 5]} />
          <meshBasicMaterial color='green' />
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
          <meshBasicMaterial color='green' />
        </animated.mesh>
        {/* Left border */}
        <mesh castShadow position={[0, -0.15, 0]}>
          <boxBufferGeometry args={[0.2, 0.1, 0.2]} />
          <meshBasicMaterial color='black' />
        </mesh>
        {/* Right border */}
        <mesh castShadow position={[0, length + 0.15, 0]}>
          <boxBufferGeometry args={[0.2, 0.1, 0.2]} />
          <meshBasicMaterial color='black' />
        </mesh>
      </group>
    </>
  )
}

export default YSlider
