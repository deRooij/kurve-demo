import useStore from "@/helpers/store"
import { OrbitControls } from "@react-three/drei"
import React, { useEffect, useRef } from "react"

const Controls = () => {
  const dom = useStore((state) => state.dom)
  const controlsRef = useRef(null)

  useEffect(() => {
    if (controlsRef.current) {
      const domElement = dom.current
      const originalTouchAction = domElement.style['touch-action'] 
      domElement.style['touch-action'] = 'none'

      useStore.setState({ controlsRef })

      return () => {
        domElement.style['touch-action'] = originalTouchAction
      }
    }
  }, [dom, controlsRef])
  return <OrbitControls ref={controlsRef} domElement={dom.current} />
}

export default Controls
