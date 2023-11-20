import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {AuthProvider} from '../../Context/authContext.js'
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