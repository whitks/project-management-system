import React from 'react'
import Login from './components/Login.js'
import "./components/styles/loginpage.css"
import cmcimage from "./assets/2.svg"
import NavBar from './components/NavBar.js'
function login() {
  return (
    <>
    <NavBar back = {"black"} colo="white"/>
    
    <div className='login-page'>
      
      <img src={cmcimage} />
      <Login/>
    </div></>
  )
}

export default login