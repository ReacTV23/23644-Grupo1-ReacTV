import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './LayoutMain.css'


const LayoutMain = ({children}) => {
  return (
    <div className='LayoutMain'>
      <Navbar/>
        {children}
      {/* <Footer /> */}
    </div>
  )
}

export default LayoutMain