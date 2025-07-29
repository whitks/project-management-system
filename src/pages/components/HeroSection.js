  import React from 'react'
import "./styles/herosection.css"
import {useNavigate} from "react-router-dom"
import image from "../assets/3.svg"
function HeroSection() {
  const navigate = useNavigate()
  function handleClick(){
    navigate("/login")
  }
  return (
    <>
    <div className='herosection'>
      <div className='herosection-content'>
      <h1 id ="main-text">Project Management for Students</h1>
      <p>An integrated portal for final‑year projects. Coordinate teams, track milestones, and handle submissions from one intuitive dashboard—so you can focus on innovation, not administration.</p>
        <button onClick={handleClick}>Lets Go</button></div>
        <img id = "hero-image" style = {{height: "600px"}} src={image} alt="img" />
    </div>
    </>
  )
}

export default HeroSection