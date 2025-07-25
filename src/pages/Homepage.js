import React from 'react'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import "./components/styles/homepage.css"
import Login from "./components/Login"
function Homepage() {
  return (
    <div className='homepage'>
        <NavBar/>
        <HeroSection/>
    </div>
  )
}

export default Homepage