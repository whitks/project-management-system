import React from 'react'
import "./styles/login.css"
import { useGoogleLogin } from '@react-oauth/google';
function Login() {
    const login = useGoogleLogin({
    onSuccess: tokenResponse => console.log(tokenResponse),
  });

  return (
    <div className='full-form mt-100'>
      <form action="" >
          <h1>Login</h1>
        <input type="text" placeholder='Enter Email' required/>

        <input type="submit" id = "submit-button"/>

        <button onClick={() => login()}> <i class="fa-brands fa-google"></i> Sign in with Google</button>
      </form>
        </div>
      )
}

export default Login