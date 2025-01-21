import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/Buycredit'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-100 to-orange-50'>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Result' element={<Result/>}/>
        <Route path='/Buy' element={<BuyCredit/>}/>
      </Routes>
    
    </div>
  )
}

export default App
