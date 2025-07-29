import React from 'react'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import "./components/styles/homepage.css"
import Features from './components/Features'
import Need from './components/Need'
import Faq from './components/Faq'
function Homepage() {
  return (
    <div className='homepage'>
        <NavBar/>
        <HeroSection/>
        <Features/>
        <Need/>
        <Faq/>
    </div>
  )
}

export default Homepage