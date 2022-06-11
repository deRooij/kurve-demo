import useStore from "@/helpers/store";
import { useEffect, useState } from "react";
import { Euler, Plane, Vector3 } from "three";
import BoxComponent from "./Box";
import Slider3D from "./Slider3D";

const Scene = () => {

  const controlsRef = useStore((state) => state.controlsRef)

  const floorPlane = new Plane(new Vector3(0, 1, 0), 0);

  const [isSliding, setIsSliding] = useState(false)

  useEffect(() => {
    if(controlsRef?.current)
    controlsRef.current.enabled = !isSliding
  }, [isSliding, controlsRef])

  return (
    <>
      <BoxComponent />
      <Slider3D 
        origin={new Vector3(1.5, 0, -3)} 
        orientation={new Euler(0, 0, 0)}
        direction="x"
        length={3} 
        min={0} 
        max={10} 
        floorPlane={floorPlane} 
        setIsSliding={setIsSliding}/>

    </>
  )
}

export default Scene
