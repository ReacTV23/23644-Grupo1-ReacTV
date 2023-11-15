import React, { Children } from 'react';


export const Layout = ({Children}) => {
  return (
    <div>
        <Navbar/>
        {Children}    
        <Footer/>
    
    </div>
  )
}
