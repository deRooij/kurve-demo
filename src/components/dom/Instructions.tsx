import useStore from '@/helpers/store'
import { useEffect, useState } from 'react'
import Slider from '../layout/slider/slider'

const axes = {
  width: {
    name: 'width',
    func: (width: number) => {
      useStore.setState({ width })
    },
  },
  height: {
    name: 'height',
    func: (height: number) => {
      useStore.setState({ height })
    },
  },
  depth: {
    name: 'depth',
    func: (depth: number) => {
      useStore.setState({ depth })
    },
  },
}

export default function Instructions() {
  const controlsRef = useStore((state) => state.controlsRef)

  const [isSliding, setIsSliding] = useState<boolean>(false)

  useEffect(() => {
    if (controlsRef?.current) controlsRef.current.enabled = !isSliding
  }, [isSliding, controlsRef])

  const listeners = [
    useStore((state) => state.width),
    useStore((state) => state.height),
    useStore((state) => state.depth),
  ]

  return (
    <div className='absolute w-1/4 px-4 py-2 text-sm border-black rounded-lg pointer-events-none select-none max-w-{} bg-slate-400 md:text-base top-4 left-4 text-gray-50 transform'>
      <p className='hidden mb-3 md:block'>
        Use sliders to interact with the block:
      </p>

      {Object.values(axes).map((axis, index) => {
        return (
          <div key={axis.name}>
            <a className='mb-3 md:block first-letter:capitalize'>
              {axis.name}:
            </a>
            <Slider
              key={axis.name + '-slider'}
              value={1}
              min={0.1}
              max={10}
              step={0.1}
              onChange={(value) => {
                axis.func(value)
              }}
              onMouseDown={setIsSliding}
              onMouseUp={setIsSliding}
              listenerValue={parseFloat(listeners[index].toFixed(1))}
            />
          </div>
        )
      })}
    </div>
  )
}
