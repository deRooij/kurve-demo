import { useRouter } from 'next/router'
import useStore from '@/helpers/store'
import { useEffect } from 'react'
import Header from '@/config'
import Dom from '@/components/layout/dom'
import '@/styles/index.css'
import dynamic from 'next/dynamic'
import { softShadows } from '@react-three/drei'
import { Plane, Vector3 } from 'three'

const CanvasComponent = dynamic(() => import('@/components/layout/canvas'), {
  ssr: false,
})

function App({ Component, pageProps = { title: 'index' } }) {
  const router = useRouter()

  useEffect(() => {
    useStore.setState({ router })
  }, [router])

  return (
    <>
      <Header title={pageProps.title} />
      <Dom>
        <Component {...pageProps} />
      </Dom>
      {Component?.r3f && <CanvasComponent>{Component.r3f(pageProps)}</CanvasComponent>}
    </>
  )
}

export default App
