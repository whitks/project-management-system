import React from 'react'
import { Target, Brain, Handshake } from "lucide-react"
import "./styles/features.css"
function Features() {
  return (
    <div className='features mt-100' data-aos="fade-up">
      <div className="features-card" >
        <div className="features-heading">
          <h2 className='f-13'><span className="features-icon"><Target size={"50px"} color="#6c63ff" /></span>Seamless Team Management</h2></div>
        <div className='card-para'>
          <p>Your platform simplifies how students organize into teams and lets admins or mentors oversee the structure in real time.</p></div></div>

      <div className="features-card">
        <div className="features-heading">
          <h2 className='f-13'><span className="features-icon"><Brain size={"50px"} color="#6c63ff" /></span>Mentor-Guided Project Tracking</h2></div>
        <div className='card-para'>
          <p>The system ensures every team has a dedicated mentor and offers clear visibility into project stages and reviews.</p></div>
      </div>

      <div className="features-card">
        <div className="features-heading">
          <h2 className='f-13'><span className="features-icon"><Handshake size={"50px"} color="#6c63ff" /></span >Smart Approval Workflow</h2></div>
        <div className='card-para'><p>Pending teams and projects go through an efficient approval pipeline. Admins and mentors can review, approve, or request changes seamlessly.</p></div></div>
    </div>
  )
}

export default Features