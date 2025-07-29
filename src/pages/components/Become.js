import React from 'react'
import "./styles/become.css"
import idea from "../assets/idea.svg"
import girl from "../assets/girl.svg"
import coder from "../assets/coder.svg"
function Become() {
  return (
    <div className='become'>
      <div className='become-card'>
        <img src = {girl}></img>
        <h2> Become a Team Leader</h2>
      </div>
      <div class="vl">

      </div>

      <div className='become-card'>
        <img src = {coder}></img>
        <h2> Become a Team Member</h2>
      </div>
    </div>
  )
}

export default Become