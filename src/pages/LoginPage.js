import React from 'react'
import Login from './components/Login.js'
import "./components/styles/loginpage.css"
import cmcimage from "./assets/1.png"
function login() {
  return (
    <div className='login-page'>
      <img src={cmcimage} />
      <Login/>
    </div>
  )
}

export default login