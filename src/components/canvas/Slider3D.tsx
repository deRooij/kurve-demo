import useStore from "@/helpers/store"
import { useSpring, animated } from "@react-spring/three"
import { act, useThree } from "@react-three/fiber"
import { useDrag } from "@use-gesture/react"
import { useEffect, useRef, useState } from "react"
import { Plane, Vector3 } from "three"
import { clamp } from "three/src/math/MathUtils"

export interface Slider3DProps{
  origin: Vector3
  width: number
  min: number
  max: number
  floorPlane: Plane
  setIsDragging: (value: boolean) => void 
}

const Slider3D = ({
  origin,
  width,
  min,
  max,
  floorPlane,
  setIsDragging
}: Slider3DProps) => {
  const thumbPos = -((useStore((state) => state.width) / max) * width)
  const xPos = -origin.x

  const [pos, setPos] = useState([thumbPos, 0, 0])
  const [hovered, setHovered] = useState(false)
  const [dragging, setDragging] = useState(false)

  const [spring, api] = useSpring(() => ({
    position: pos,
    scale: 1,
    config: { friction: 12 }
  }));

  api.start({
     position: pos,
    scale: dragging ? 0.9 : hovered ? 1.2 : 1
  })

   let planeIntersectPoint = new Vector3();
   const bind = useDrag(
    ({ active, timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);

        const xPosition = clamp(planeIntersectPoint.x - origin.x, -width, 0)
        const localPosition = [xPosition, 0, 0]
        setPos(localPosition);

        const sliderValue = clamp((Math.abs(pos[0]) / 3) * 10, 0.1, 10)
        useStore.setState({width: sliderValue})
      }

      setIsDragging(active)
      setDragging(active)
      return timeStamp;
    },
    { delay: false }
  )

  return (
    <>
     <group position={origin}>
      {/* Track: */}
      <mesh castShadow position={[xPos, 0, 0]} rotation={[0, 0, Math.PI * 0.5]}>
        <cylinderBufferGeometry args={[0.025, 0.025, width + 0.2, 16, 5]}  />
        <meshBasicMaterial color="black" />
      </mesh>
      {/* Thumb */}
      <animated.mesh castShadow {...spring} {...bind()} onPointerOver={() => {setHovered(true)}} onPointerLeave={() => {setHovered(false)}} >
        <boxBufferGeometry args={[0.25, 0.25, 0.25]} />
        <meshBasicMaterial color="red"/>
      </animated.mesh>
      {/* Left border */}
      <mesh castShadow position={[0.15, 0, 0]}>
        <boxBufferGeometry args={[0.1, 0.2, 0.2]} />
        <meshBasicMaterial color="black" />
      </mesh>
      {/* Right border */}
      <mesh castShadow position={[-width - 0.15, 0, 0]}>
        <boxBufferGeometry args={[0.1, 0.2, 0.2]} />
        <meshBasicMaterial color="black" />
      </mesh>
    </group>

    </>
  )
}

export default Slider3D
