import useStore from "@/helpers/store";
import Slider from "../layout/slider/slider";
import MultiRangeSlider from "../layout/slider/slider";

export default function Instructions() {
  return (
    <div
      className='absolute max-w-lg px-4 py-2 text-sm border-black rounded-lg pointer-events-none select-none max-w-{} bg-slate-400 md:text-base top-4 left-4 text-gray-50 transform'
    >
      <p className='hidden mb-8 md:block'>
        Test scene voor interactie in three.js
      </p>
      <Slider
        value={0}
        min={0}
        max={10}
        step={0.1}
        onChange={(value) => {
          useStore.setState({ width: value})
        }}
      />
      <div className='tracking-wider'>
        Step 1 - <span style={{ color: 'rgb(84, 90, 114)' }}>update:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}> @/pages/index </span>
        <br />
        Step 2 - <span style={{ color: 'rgb(84, 90, 114)' }}>update:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}>
          {' '}
          @/components/canvas/Shader/Shader{' '}
        </span>
        <br />
        Step 3 - <span style={{ color: 'rgb(84, 90, 114)' }}>delete:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}> @/pages/box </span>
        <br />
        Step 4 -{' '}
        <span style={{ color: 'rgb(84, 90, 114)' }}>update header:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}> @/config </span>
        <br />
        Step 5 - <span style={{ color: 'rgb(84, 90, 114)' }}>delete:</span>
        <span style={{ color: 'rgb(249, 196, 232)' }}>
          {' '}
          @/components/dom/Instructions
        </span>
      </div>
    </div>
  )
}
