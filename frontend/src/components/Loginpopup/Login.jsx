import React, { useContext, useState } from 'react'
import './login.css'
import { assets } from '../../../frontend_assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesome component
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { StoreContext } from '../../Context/Storecontext';
import axios from 'axios'
import Loader from '../LoadSucces/loader';
import Success from '../LoadSucces/success';

const Login = ({setshowlogin}) => {
    const [loading, setloading] = useState(false)
    const [success, setsuccess] = useState()
    // for the password
    const [visible, setvisible] = useState(false);

    //destructing the serverUrl 
    const {serverUrl, token, settoken} = useContext(StoreContext)

    const [currentstate, setcurrentstate] = useState('Login')
    // creating the state variable object for the input fields 
    const [data, setdata] = useState({
        name: '',
        email: '',
        password: ''
    })
    //CREATING A FUNCTION THAT WILL TAKE THE VALUE FROM THE INPUT FIELD AND UPDATE IT IN THE STATE VARIABLE
    const onChangehandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setdata(prev=>({...prev,[name]:value}))//here we will update the data state object by passing all the previous data first then bracket,curly braces we will
        //put the prev data in an object and will change the [name] field and update it with the updated value wherever the onchangehandler function is called

    }

    // useEffect(()=>{ //to test if its working
    //     console.log(data)
    // },[data])

    //CREATING FUNCTION FOR SUBMITTING THE USER DETAILS
    //storing the backend url so it can be accessible to every file in the page using storecontext
    const onLogin = async (e) => {
        e.preventDefault()
        //first we will create an instance(like a copy of the serverUrl)
        let newUrl = serverUrl;
        //then pass an if statement
        if (currentstate === "Login"){
            newUrl += "/api/users/login"
        }else{//else which is signup
            newUrl += "/api/users/register"
        }
        //so if the currentstate is login the newUrl will be the login api
        //but if the currentstate is not login which is sign up the newUrl will be the register api

        try {
            setloading(true);
            const response = await axios.post(newUrl, data);
            setloading(false)
            setsuccess(true)
            localStorage.setItem("currentuser", JSON.stringify(response.data))
            settoken(response.data.token)//we will save the token using the settoken state update
            //after we are sucessfully logged in.... so we will use the setshowlogin to update te state to false and hide the login page
            setshowlogin(false)
            console.log(response.data.token)
        } catch (error) {
            alert(error.response.data.message)
            
        }

      


    }

  return (
    <div className='login'> {/*mount it in the app.js file */}

        {loading && (<Loader/> )} {/* the conditions is if loading is equal to true show loading component*/}
        
        <form onSubmit={onLogin} className="login-container">
            <div className="login-title">
            {success && (<Success message={currentstate==="Login" ? "Login Successfully" : "SignUp Successful"}/> )} {/*the conditions is if success is equal to true show success component sending in the props to appear in the success components as message*/}
                <h2>{currentstate}</h2>
                <img onClick={()=>{setshowlogin(false)}}  src={assets.cross_icon} alt="" />
            </div>

            <div className="login-inputs">
                {currentstate==="Login"?<></> : <input type='text' name='name' onChange={onChangehandler} value={data.name} placeholder='Your name' required/> }
                <input type='email' name='email' onChange={onChangehandler} value={data.email} placeholder='Your email' required/>
                {/*This refers to the email field in the data state object. As the user types, the value of data.email is updated through the onChangehandler function, maintaining a controlled input field in React. */}
                <input className='pass' type={visible ? 'text' : 'password'} name='password' onChange={onChangehandler} value={data.password}  placeholder='Your password' required/>
                <span onClick={()=> {setvisible( visibility => !visibility)}}><FontAwesomeIcon icon={ visible ? faEye : faEyeSlash} /></span>
                
            </div>

            <button type='submit'>{currentstate==="Sign Up"? "Create account" : "Login"}</button>

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

//login and register successfully created
//NOW WE WILL CREATE A LOGIC THAT WHEN WE ARE LOGGED IN THE SIGNIN BUTTON ON THE PROFILE WILL CHANGE USING TOKEN TO CHECK IF THERE IS USER OR NOT