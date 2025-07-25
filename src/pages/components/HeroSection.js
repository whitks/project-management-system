import React from 'react'
import "./styles/herosection.css"
import Login from './Login'
function HeroSection() {
  return (
    <div className='herosection'>
      <div className='content'>
      <h1 id ="main-text">Get Started</h1>
        <button>Lets Go</button></div>
      <Login/>
    </div>
  )
}

export default HeroSection