import useStore from "@/helpers/store";
import { useEffect, useState } from "react";
import { Plane, Vector3 } from "three";
import BoxComponent from "./Box";
import Slider3D from "./Slider3D";

const Scene = () => {

  const controlsRef = useStore((state) => state.controlsRef)

  const floorPlane = new Plane(new Vector3(0, 1, 0), 0);

  const [isDragging, setIsDragging] = useState(false)

  useEffect(() => {
    if(controlsRef?.current)
    controlsRef.current.enabled = !isDragging
  }, [isDragging, controlsRef])

  return (
    <>
      <BoxComponent />
      <Slider3D origin={new Vector3(1.5, 0, -3)} width={3} min={0} max={10} floorPlane={floorPlane} setIsDragging={setIsDragging}/>
      <Slider3D origin={new Vector3(1.5, 0, -4)} width={3} min={0} max={10} floorPlane={floorPlane} setIsDragging={setIsDragging}/>
      <Slider3D origin={new Vector3(1.5, 0, -5)} width={3} min={0} max={10} floorPlane={floorPlane} setIsDragging={setIsDragging}/>
    </>
  )

}

export default Scene
