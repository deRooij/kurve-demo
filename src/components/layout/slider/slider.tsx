import { ChangeEvent, useCallback, useEffect, useState, useRef } from 'react'
import { clamp } from 'three/src/math/MathUtils'

interface SliderProps {
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
  onMouseDown: (value: boolean) => void
  onMouseUp: (value: boolean) => void
  listenerValue: number
}

const Slider = ({
  value,
  min,
  max,
  step,
  onChange,
  onMouseDown,
  onMouseUp,
  listenerValue,
}: SliderProps) => {
  const [currentValue, setcurrentValue] = useState(value)
  const valueRef = useRef<HTMLInputElement>(null)
  const track = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setcurrentValue(listenerValue)
  }, [listenerValue])

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  // Fill the track with the current value
  useEffect(() => {
    if (valueRef.current) {
      const minPercent = getPercent(min)
      const maxPercent = getPercent(currentValue)

      if (track.current) {
        track.current.style.width = `${maxPercent - minPercent}%`
      }
    }
  }, [min, currentValue, getPercent])

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = clamp(parseFloat(event.target.value), min, max)
      setcurrentValue(value)
      onChange(value)
    },
    [onChange, min, max]
  )

  const handleMouseDown = useCallback(() => {
    onMouseDown(true)
  }, [onMouseDown])

  const handleMouseUp = useCallback(() => {
    onMouseUp(false)
  }, [onMouseUp])

  return (
    <div className='flex justify-start h-14'>
      <input
        type='range'
        min={min}
        max={max}
        step={step}
        value={currentValue}
        ref={valueRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onChange={handleInputChange}
        className='absolute z-40 h-0 outline-none appearance-none pointer-events-none w-52 slider-thumb'
      />
      <div className='relative w-52'>
        <div className='absolute z-10 w-full h-1 bg-white rounded-sm'></div>
        <div
          ref={track}
          className='absolute z-20 h-1 bg-blue-500 rounded-sm'
        ></div>
        <div className='absolute mt-1 text-sm text-slate-100'>
          {currentValue} cm
        </div>
        <div className='absolute mt-1 text-sm text-slate-100 right-[-4px]'>
          {max}
        </div>
      </div>
    </div>
  )
}

export default Slider
