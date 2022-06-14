import useStore from '@/helpers/store'
import { useSpring, animated } from '@react-spring/three'
import { useThree } from '@react-three/fiber'
import { useDrag } from '@use-gesture/react'
import { useEffect, useState } from 'react'
import { Plane, Vector3 } from 'three'
import { clamp } from 'three/src/math/MathUtils'

export interface Slider3DProps {
  origin: Vector3
  length: number
  max: number
  intersectPlane: Plane
  setIsSliding: (value: boolean) => void
}

const YSlider = ({
  origin,
  length,
  max,
  intersectPlane,
  setIsSliding,
}: Slider3DProps) => {
  const thumbPos = -((useStore((state) => state.height) / max) * length)

  const { camera } = useThree()

  const [pos, setPos] = useState([0, -thumbPos, 0])
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)

  const storeValue = useStore((state) => state.height)
  useEffect(() => {
    setPos([0, (storeValue / max) * length, 0])
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
        intersectPlane.setFromNormalAndCoplanarPoint(
          camera.position.clone().normalize(),
          new Vector3(2, 0.3, 0)
        )

        // @ts-ignore
        event.ray.intersectPlane(intersectPlane, planeIntersectPoint)

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
