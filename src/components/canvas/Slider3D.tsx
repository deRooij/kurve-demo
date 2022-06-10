import useStore from "@/helpers/store"
import { useSpring, animated } from "@react-spring/three"
import { useAspect } from "@react-three/drei"
import { useThree } from "@react-three/fiber"
import { useDrag } from "@use-gesture/react"
import { useEffect, useRef, useState } from "react"
import { Plane, Vector3 } from "three"
import { clamp } from "three/src/math/MathUtils"

export interface Slider3DProps{
  position: Vector3
  width: number
  min: number
  max: number
}

const Slider3D = ({
  position,
  width,
  min,
  max,
}: Slider3DProps) => {

  const controlsRef = useStore((state) => state.controlsRef)

  const thumbPos = -((useStore((state) => state.width) / max) * width)
  const xPos = -position.x

  const thumbRef = useRef()

  const [pos, setPos] = useState([thumbPos, 0, 0])
  const [isDragging, setIsDragging] = useState(false)
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width;

  const floorPlane = new Plane(new Vector3(0, 1, 0), 0);
  let planeIntersectPoint = new Vector3();

  
  const [spring, api] = useSpring(() => ({
    position: pos,
    scale: 1,
    rotation: [0, 0, 0],
    config: { friction: 10 }
  }));

   const bind = useDrag(
    ({ active, movement: [x], timeStamp, event }) => {
      if (active) {
        event.ray.intersectPlane(floorPlane, planeIntersectPoint);
        console.log(planeIntersectPoint.x)
        setPos([clamp(planeIntersectPoint.x - position.x, -3, 0), 0, 0]);

        if(controlsRef?.current)
        controlsRef.current.enabled = false

      }else{
       if(controlsRef?.current)
        controlsRef.current.enabled = true
      }

      setIsDragging(active);

      api.start({
        // position: active ? [x / aspect, -y / aspect, 0] : [0, 0, 0],
        position: pos,
        scale: active ? 1.1 : 1,
      });
      return timeStamp;
    },
    { delay: true }
  );

  return (
    <>



    <group position={position}>
      {/* Track: */}
      <mesh castShadow position={[xPos, 0, 0]}>
        <boxBufferGeometry args={[width + 0.2, 0.1, 0.1]} />
        <meshBasicMaterial color="black" />
      </mesh>
      {/* Thumb */}
      <animated.mesh ref={thumbRef} castShadow {...spring} {...bind()}>
        <boxBufferGeometry args={[0.25, 0.25, 0.25]} />
        <meshBasicMaterial color="red" />
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
