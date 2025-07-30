import React from 'react'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import "./components/styles/homepage.css"
import Features from './components/Features'
import Need from './components/Need'
import Faq from './components/Faq'
import wave from "./assets/wave-4.svg"
import Aos from 'aos'
import 'aos/dist/aos.css';
import { useEffect } from 'react'
import Footer from './components/Footer'
function Homepage() {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <div className='homepage'>
        <img src={wave}  id = "wave" style={{position:"absolute", zIndex:"-2"}}/>
        <NavBar colo="white"/>
        <HeroSection/>
        <Features/>
        <Need/>
        <Faq/>
        <Footer/>
    </div>
  )
}

export default Homepage