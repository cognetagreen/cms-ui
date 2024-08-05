import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer'

const Layout:React.FC<{children : React.JSX.Element}> = ({children}) => {
  return (
    <>
        <Navbar>
            <main>{children}</main>
        </Navbar>
        <Footer />
    </>
  )
}

export default Layout