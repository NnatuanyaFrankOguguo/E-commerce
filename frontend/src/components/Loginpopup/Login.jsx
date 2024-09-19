import React, { useState } from 'react'
import './login.css'
import { assets } from '../../../frontend_assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome component
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = ({setshowlogin}) => {
    // for the password
    const [visible, setvisible] = useState(false);

    const [currentstate, setcurrentstate] = useState('Sign Up')

  return (
    <div className='login'> {/*mount it in the app.js file */}

        <form action="" className="login-container">
            <div className="login-title">
                <h2>{currentstate}</h2>
                <img onClick={()=>{setshowlogin(false)}}  src={assets.cross_icon} alt="" />
            </div>

            <div className="login-inputs">
                {currentstate==="Login"?<></> : <input type='text' placeholder='Your name' required/> }
                <input type='email' placeholder='Your email' required/>
                <input className='pass' type={visible ? 'text' : 'password'} placeholder='Your password' required/>
                <span onClick={()=> {setvisible( visibility => !visibility)}}><FontAwesomeIcon icon={ visible ? faEye : faEyeSlash} /></span>
                
            </div>

            <button>{currentstate==="Sign Up"? "Create account" : "Login"}</button>

            <div className="login-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
            </div>

            {currentstate==="Login" ? <p>Create a account? <span onClick={()=>setcurrentstate("Sign Up")}>Click here</span></p> : <p>Already have an account? <span onClick={()=>setcurrentstate("Login")}>Login here</span></p> }
            

        </form>
    </div>
  )
}

export default Login
