import React from 'react'
import './LayoutMain.css'

const LayoutMain = ({children}) => {
  return (
    <div className='LayoutMain'>
      {/* <Navbar /> */}
        {children}
      {/* <Footer /> */}
    </div>
  )
}

export default LayoutMain