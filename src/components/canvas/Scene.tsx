import useStore from '@/helpers/store'
import { useEffect, useState } from 'react'
import { Euler, Plane, Vector3 } from 'three'
import BoxComponent from './Box'
import XSlider from './XAxisSlider'
import YSlider from './YAxisSlider'
import ZSlider from './ZAxisSlider'

const Scene = () => {
  const controlsRef = useStore((state) => state.controlsRef)

  const [isSliding, setIsSliding] = useState(false)

  useEffect(() => {
    if (controlsRef?.current) controlsRef.current.enabled = !isSliding
  }, [isSliding, controlsRef])

  return (
    <>
      <BoxComponent />
      <XSlider
        origin={new Vector3(1.7, 0, -3)}
        orientation={new Euler(0, 0, 0)}
        direction='x'
        length={3}
        min={0}
        max={10}
        floorPlane={new Plane(new Vector3(0, 1, 0), 0)}
        setIsSliding={setIsSliding}
      />
      <YSlider
        origin={new Vector3(2, 0.3, -3)}
        orientation={new Euler(0, 0, -Math.PI * 0.5)}
        direction='y'
        length={3}
        min={0}
        max={10}
        floorPlane={null}
        setIsSliding={setIsSliding}
      />
      <ZSlider
        origin={new Vector3(2, 0, -3.3)}
        orientation={new Euler(0, 0, -Math.PI * 0.5)}
        direction='y'
        length={3}
        min={0}
        max={10}
        floorPlane={null}
        setIsSliding={setIsSliding}
      />
    </>
  )
}

export default Scene
