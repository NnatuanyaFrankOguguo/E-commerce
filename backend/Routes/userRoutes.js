import express from 'express'
import { loginUser, registerUser, getUsers } from '../Controllers/Usercontroller.js'

const userRouter = express.Router();

userRouter.post('/register', registerUser) //api endpoint name

userRouter.post("/login", loginUser)

userRouter.get("/getallusers", getUsers)

export default userRouter
