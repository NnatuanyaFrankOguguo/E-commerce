import userModel from "../models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import 'dotenv/config'
//first off we will create two functions the first on will be
//login user

const loginUser = async (req, res) => {
    //now to login in the user we need to the user email and password
    const {email, password} = req.body;
    try {//first we will check if the user exists
        const user = await userModel.findOne({email})
        //if there is a user we will match the user password with that in the database

        if(!user){
            return res.status(500).json({ success: false, message: 'User Doesnt exist' }); //this is how we will be sending our error message to the frontend
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(500).json({ success: false, message: 'Invalid credentials' }); //this is how we will be sending our error message to the frontend
        }
  
        res.json({
            success : true,
            name : user.name,
            email : user.email, /*this is where we exclude the password details look at my note #16 for more info.. */
            token : generateToken(user._id)
        })/* res.send user to the frontend if the login is a success ELSE */
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'logging in failed' }); //this is how we will be sending our error message to the frontend
    }

}

/*writing the generate token function */
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : '2d'}); /*the id is the payload(user data(which is the user._id to generate the token)) */
}


//register user-- Sign up

const registerUser = async(req, res) => {
//to destructure the name, email, password from the frontend request body
    const {name, email, password} = req.body;
    try { //to check if user already exists with the email.. if user already exist we will generate one response
        const userExist = await userModel.findOne({email})
        if(userExist){
            return res.status(500).json({ success: false, message: 'User email already in use' }); //this is how we will be sending our error message to the frontend
        }

        //but if user doesnt exist we will now validate the email format and strong password(using validator)
        //later bcos of time we will use YUP validator in the frontend also before the user sends the details to the backend
        if(!validator.isEmail(email)){//if email is not valid then
            return res.status(500).json({ success: false, message: 'Email is not valid' }); //this is how we will be sending our error message to the frontend
        }

        if(password.length<8){ //if password is not strong
            return res.status(500).json({ success: false, message: 'Please enter a strong password' }); //this is how we will be sending our error message to the frontend
        }
        //now the user pass all the validator now this code will execute
        //Hashing userpassword
        const salt = await bcrypt.genSalt(10); //setting the range from 5-15, if we set 15 it will take time to encrypt the password
        const hashedPassword = await bcrypt.hash(password, salt) // Hash the password and be save with the user password variable
        
        const newuser = new userModel({ //using name and email we got from the req.body(since there are common key:value pair we can make it just name, and email... but i decided to do it double)
            name: name,
            email: email,
            password: hashedPassword
        })

        const user = await newuser.save() //saving the user to the database
        //after saving the user in the database we will save the user saved to this user variable and generate a token for it
        //now we go back up to create a token for the saved user
        if(user){ //for localstorage in the frontend
            const userData = {
                name : user.name,
                email : user.email,
                token : generateToken(user._id) /*passing the unique id of the user as augment to the function generatetoken invoke */
            }
        res.status(200).json(/*SENDING THE SAVED USER RESULT BACK TO THE FRONTEND THAT MADE THE API REQUEST IN THE SIGNUPSCREEN */
            userData )    
        }else {
            return res.status(500).json({ success: false, message: 'Signin failed due to email already in use' }); //this is how we will be sending our error message to the frontend
        }

    } catch (error) {
        return res.status(500).json({ success: false, message: 'Sign In Failed' }); //this is how we will be sending our error message to the frontend
    }
    //successfully created the resgister user
}

//now to integrate the register and login with the frontend


const getUsers = async(req, res) => {

    try {
        const users = await userModel.find({})
        res.send({success:true, data:users})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Get all Foods Failed' }); //this is how we will be sending our error message to the frontend   
    }
    

}


export {loginUser, registerUser, getUsers}