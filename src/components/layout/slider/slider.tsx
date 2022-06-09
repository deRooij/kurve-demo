import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useState,
  useRef
} from "react";

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange: Function;
}

const MultiRangeSlider: FC<MultiRangeSliderProps> = ({
  min,
  max,
  onChange
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef<HTMLInputElement>(null);
  const maxValRef = useRef<HTMLInputElement>(null);
  const range = useRef<HTMLDivElement>(null);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Precede with '+' to convert the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <div className="flex justify-center h-32">
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event: ChangeEvent<HTMLInputElement>) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        className="absolute z-40 h-0 outline-none appearance-none pointer-events-none w-52 slider-thumb"
      />

{/* className="relative z-30 w-5 h-5 mt-1 border-none rounded-full outline-none cursor-pointer pointer-events-auto bg-slate-100" */}
      <div className="relative w-52">
        <div className="absolute z-10 w-full h-1 bg-white rounded-sm"></div>
        <div ref={range} className="absolute z-20 h-1 bg-blue-200 rounded-sm"></div>
        <div className="absolute mt-5 text-sm text-slate-100">{minVal}</div>
        <div className="absolute mt-5 text-sm text-slate-100 right-[-4px]">{maxVal}</div>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
