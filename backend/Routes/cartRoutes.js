import express from 'express'
import { addToCart, removeFromCart, getCart } from '../Controllers/Cartcontroller.js'
import authMiddleware from '../Middleware/auth.js';

const cartRouter = express.Router();//using this router we will create multiple endpoint

//now we will add the middleware on this 
cartRouter.post('/add',authMiddleware, addToCart)

cartRouter.post('/remove', authMiddleware, removeFromCart)

cartRouter.post('/get', authMiddleware, getCart)

export default cartRouter

//now go to server.js to iniatlise the cartRouter with the APINAme or PATH