import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useRef
} from "react";
import { clamp } from "three/src/math/MathUtils"

export interface SliderProps {
  value: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void;
}

const Slider = ({
  value,
  min,
  max,
  step,
  onChange
}: SliderProps) => {
  const range = useRef<HTMLInputElement>(null)
  const [currentValue, setCurrentValue] = useState(value);
  const valueReference = useRef<HTMLInputElement>(null);


   const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    if (valueReference.current) {
      const minPercent = getPercent(min);
      const maxPercent = getPercent(currentValue);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [min, currentValue, getPercent]);


  const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const input = parseFloat(event.target.value)
    if(Number.isNaN(input)) return
    const value = clamp(input, min, max)
    onChange(value)
    setCurrentValue(value)
    event.target.value = value.toString()
  },
  [onChange, min, max])

  return (
    <div className="flex justify-center h-32">
      <input
        type="range"
        min={min}
        max={max}
        value={clamp(value, min, max)}
        step={step}
        ref={valueReference}
        onChange={handleInputChange}
        className="absolute z-40 h-0 outline-none pointer-events-auto w-52"
      />
      <div className="relative w-52">
        <div className="absolute z-10 w-full h-1 bg-white rounded-sm"></div>
        <div ref={range} className="absolute z-20 h-1 bg-blue-200 rounded-sm"></div>
        <div className="absolute mt-5 text-sm text-slate-100">{currentValue}</div>
        <div className="absolute mt-5 text-sm text-slate-100 right-[-4px]">{max}</div>
      </div>
    </div>
  );
};

export default Slider;
