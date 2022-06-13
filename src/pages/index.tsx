import Scene from '@/components/canvas/Scene'
import Instructions from '@/components/dom/Instructions'

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
Page.r3f = (props) => <Scene />

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
