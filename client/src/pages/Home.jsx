import React from 'react'
import Header from '../components/Header';
import Steps from '../components/Steps';
import Description from '../components/Description';

const Home = () => {
  console.log('Home component rendered');

  return (
    <div>
     <Header/> 
     <Steps/>
     <Description/>
    </div>
  )
}

export default Home
