import React from 'react'
import "./styles/become.css"
import girl from "../assets/girl.svg"
import coder from "../assets/coder.svg"

function Become({setCurrPoint}) {
  function handleClick(param){
    if (param == "leader"){
      setCurrPoint(2);
    }
    else if(param == "member"){
      setCurrPoint(0);
    }
  }
  return (
    <div className='become'>
      <div className='become-card' onClick={()=> handleClick("leader")}>
        <img src = {girl}></img>
        <h2> Become a Team Leader</h2>
      </div>
      <div class="vl">

      </div>

      <div className='become-card' onClick={()=> handleClick("member")}>
        <img src = {coder} ></img>
        <h2> Become a Team Member</h2>
      </div>
    </div>
  )
}

export default Become