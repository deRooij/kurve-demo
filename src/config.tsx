import Head from 'next/head'

const titleDefault = 'React Three Next Starter'
const url = 'https://react-three-next.vercel.app/'
const description =
  'The easiest and fastest way to create a 3D website using React Three Fiber and NextJS'
const author = 'Author'

const Header = ({ title = titleDefault }) => {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='language' content='english' />
        <meta httpEquiv='content-type' content='text/html' />
      </Head>
    </>
  )
}

export default Header
