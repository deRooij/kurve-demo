import BoxComponent from '@/components/canvas/Box'
import Instructions from '@/components/dom/Instructions'
import dynamic from 'next/dynamic'


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
  <>
    <BoxComponent route='/' />
  </>
)

export default Page

export async function getStaticProps() {
  return {
    props: {
      title: 'Index',
    },
  }
}
