import { Canvas } from '@react-three/fiber'
import useStore from '@/helpers/store'
import Controls from '../controls/controls'

const LCanvas = ({ children }) => {

  const height = useStore((state) => state.height)

  const dom = useStore((state) => state.dom)

  return (
    <Canvas
      mode='concurrent'
      style={{
        position: 'absolute',
        top: 0,
      }}
      onCreated={(state) => state.events.connect(dom.current)}
    >
      <Controls />
      <Preload all />
      {children}
    </Canvas>
  )
}

export default LCanvas
