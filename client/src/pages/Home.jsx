import React from 'react'
import Header from '../components/Header';
import Steps from '../components/Steps';

const Home = () => {
  console.log('Home component rendered');

  return (
    <div>
     <Header/> 
     <Steps/>
    </div>
  )
}

export default Home
