import express from 'express'
import { allOrders, placeOrder, updateStatus, userOrders, verifyOrder } from '../Controllers/Odercontroller.js'
import authMiddleware from '../Middleware/auth.js'

const orderRouter = express.Router();

orderRouter.post('/placeorder', authMiddleware, placeOrder)
orderRouter.post('/verify', verifyOrder)
orderRouter.post('/userorders',authMiddleware, userOrders ) //we are using the authmiddleware where we need the userId to perform an action in the backend like quering the database to get data or updates
orderRouter.get('/getallorders', allOrders)
orderRouter.post('/status', updateStatus)


export default orderRouter
//now that we have successfully created the orderRouter(api endpoint) we will now go to the server.js and set up the API PATH/NAME