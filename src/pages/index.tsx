import BoxComponent from '@/components/canvas/Box'
import Scene from '@/components/canvas/Scene'
import Slider3D from '@/components/canvas/Slider3D'
import Instructions from '@/components/dom/Instructions'
import { Vector3 } from 'three'


// const Box = dynamic(() => import('@/components/canvas/Box'), {
//   ssr: false
// })

// Html dom components go here:
const Page = (props) => {
  return (
    <>
      <Instructions />
    </>
  )
}

// Three.js canvas component go here:
Page.r3f = (props) => (
  <Scene />
)

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
