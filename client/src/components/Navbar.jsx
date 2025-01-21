import React from 'react'
import {assets} from '../assets/assets' ;

const Navbar = () => {
  return (
    <div>
      <img src={assets.logo} alt="" className='w-28 sm:w-32 lg:w-40' />
    </div>
  )
}

export default Navbar
