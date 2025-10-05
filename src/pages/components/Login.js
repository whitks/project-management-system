import React from 'react'
import "./styles/login.css"
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../slices/userSlice';
function Login() {
    const [email, setEmail] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const login = useGoogleLogin({
      onSuccess: tokenResponse => handleGoogleLogin(tokenResponse.access_token),
      onError: error => {
    console.error("Google Login Error:", error);
    setError("Google login failed. Try again.");
  }
    });
    async function handleGoogleLogin(access_token){

      const response = await fetch("https://prback.ct.ws/another/login.php", {
        method: "POST",
        headers:{"Content-Type": "application/json"},
        credentials: 'include',
        body:JSON.stringify({googleLogin:true, access_token})
      })
      const result = await response.json();
      console.log(result)
      if (result.status === 'failed'){
        setError("Authorization failed. Try again Later");
        return
      }
      // dispatch login success to redux
      try { dispatch(loginSuccess(result)); } catch (e) {}
      navigate("initials")
    }
    function handleChange(e){
      setEmail(e.target.value)
      setError("")
    }
    async function onSubmit(e){
      e.preventDefault()
      setError("")
      setEmail(prev=>prev.trim())
      let template = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!email | !template.test(email)){
        setError("Please enter a valid email address.")
        return
      }
      else if(!(email.endsWith("@skit.ac.in"))){
        setError("Please enter college email.")
        return
      }
      const response = await fetch("https://prback.ct.ws/another/login.php", {
        method: "POST",
          headers: {
        "Content-Type": "application/json"
          },
          credentials: 'include',
        body: JSON.stringify({ googleLogin:false, email })
      })
      const result = await response.json()
      if (result.status === 'failed'){
        setError("Authorization failed. Try again Later")
        return
      }
      console.log(result)
      try { dispatch(loginSuccess(result)); } catch (e) {}
      navigate("initials")
    }
  return (
    <div className='full-form mt-100'>
      <form action="">
          <h1>Login</h1>
          <p style={{color: 'red'}}>{error?error:""}</p>
        <input type="text" value = {email} placeholder='Enter Email' onChange={handleChange}/>

        <input type="submit" onClick={onSubmit} id = "submit-button"/>

        <button onClick={(e) => {e.preventDefault(); login()}}> <i class="fa-brands fa-google"></i> Sign in with Google</button>
      </form>
        </div>
      )
}

export default Login