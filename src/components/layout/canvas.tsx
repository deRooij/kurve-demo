import { Canvas } from '@react-three/fiber'
import useStore from '@/helpers/store'
import Controls from '../controls/controls'
import { Preload } from '@react-three/drei'
import Stage from './stage'

const CanvasComponent = ({ children }) => {
  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      shadows
      style={{
        position: 'absolute',
        top: 0,
      }}
      camera={{position:[0, 2.5, -5]}}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <Controls />
      <Preload all />
      {children}
      <Stage />
    </Canvas>
  )
}

export default CanvasComponent
