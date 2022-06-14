import useStore from '@/helpers/store'

interface CalculationProps {
  min: number
  max: number
}

const Calculations = ({ min, max }: CalculationProps) => {
  const width = useStore((state) => state.width)
  const height = useStore((state) => state.height)
  const depth = useStore((state) => state.depth)

  return (
    <>
      <div className='absolute w-1/4 px-4 py-2 text-sm border-black rounded-lg pointer-events-none select-none bg-slate-400 md:text-base top-4 right-4 text-gray-50 transform'>
        <p className='hidden mb-3 text-lg font-extrabold md:block'>
          Berekeningen:
        </p>
        <h2 className='mb-2 font-bold'>Volume:</h2>
        <div className='mb-3'>
          Het volume van een kubus of balk bereken je simpel door alle zeiden
          met elkaar te vermenigvuldigen dus:
        </div>
        <div className='mb-3'>
          De som: {width.toFixed(1)} x {height.toFixed(1)} x {depth.toFixed(1)}
        </div>
        <div className='mb-5'>
          Maakt samen:{' '}
          {Math.round(((width * height * depth - min) / (max - min)) * 100) /
            10}
          cm³
        </div>
        <h2 className='mb-2 font-bold'>Oppervlakte:</h2>
        <div className='mb-2'>
          De oppervlakte van een kubus of balk bereken je door alle oppervlakte
          van alle 6 de zeiden bij elkaar op te tellen.
        </div>
        <div className='mb-2'>
          De twee kanten aan weerszijden van het blok zijn altijd gelijk.
        </div>
        <div className='mb-2'>De formule: 2bh + 2bl + 2hl = totaal cm²</div>
        <div className='mb-2'>
          De som: 2 * {width.toFixed(1)} * {height.toFixed(1)} + 2 *{' '}
          {width.toFixed(1)} * {depth.toFixed(1)} + 2 * {height.toFixed(1)} *{' '}
          {depth.toFixed(1)}
        </div>
        <div className='mb-2'>
          Maakt samen een oppervlakte van:{' '}
          {(
            2 * width * height +
            2 * width * depth +
            2 * height * depth
          ).toFixed(1)}{' '}
          cm²
        </div>
      </div>
    </>
  )
}

export default Calculations
