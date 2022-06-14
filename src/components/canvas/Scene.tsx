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

  const intersectPlane = new Plane(new Vector3(0, 1, 0), 0)

  return (
    <>
      <BoxComponent />

      <XSlider
        origin={new Vector3(1.7, 0, 0)}
        length={3}
        max={10}
        floorPlane={intersectPlane}
        setIsSliding={setIsSliding}
      />
      <YSlider
        origin={new Vector3(2, 0.3, 0)}
        length={3}
        max={10}
        intersectPlane={intersectPlane}
        setIsSliding={setIsSliding}
      />
      <ZSlider
        origin={new Vector3(2, 0, -0.3)}
        length={3}
        max={10}
        floorPlane={intersectPlane}
        setIsSliding={setIsSliding}
      />
    </>
  )
}

export default Scene
