//we will create one basic express server that will be a type : module server where we will use ES6 feature
//to use the ES6 feature we will open the package.json and put "type" : "module"
/*
Since you're using ES modules ("type": "module" in your package.json), you need to import the dotenv package differently, as require is only supported in CommonJS modules.
You can replace require('dotenv').config() with the ES module syntax like this: like my other code i wont be using REQUIRE just const this or that to import files or libraries like in frontend */

import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import foodRouter from "./Routes/foodRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import cartRouter from "./Routes/cartRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";
import sanitize from 'express-mongo-sanitize'
import xss from 'xss-clean';



// app config
const app = express()
const port = process.env.PORT || 5000;

// middleware
app.use(express.json()) /*using this middleware whenever we will get the request from frontend to backend that will be passed as json */

app.use(cors()) /*using this we can access/communicate with any frontend from the backend */
//done initailising the middleware

// Security middleware //that sanitize we initialise is going to store a function and it will return a middleware
app.use(sanitize()); // Prevents NoSQL injection attacks
app.use(xss()); // Prevents XSS attacks

//MONGODB connection(just call the connectDB function here that was defined in the db.js file to connect it to the backend)
connectDB(); 

//API ENDPOINTS food
app.use('/api/foods', foodRouter) //APi name address

/*to make the URl of the image in the site which is to be able to access the file we will create endpoint for it and add the image unique filename created in the Uploads folder */
app.use('/images', express.static('Uploads')) //express.static will look for the requested file inside the upload directory.. so this will be use to enable us display the image again on the frontend admin in displaying all food as an URL not a file as was sent in the addfood form

//SETING UP THE USER API PATH/NAME
app.use('/api/users', userRouter) //API name/path address

//SETTING UP THE CART API PATH/NAME
app.use('/api/cart', cartRouter)

//SETTING UP THE ORDER API PATH/NAME
app.use('/api/order', orderRouter)




app.get('/', (req,res) => {
    res.send('Welcome to API Backend server!')
})

// we will run the express server now by using app.listen
app.listen(port, ()=> { console.log(`Server started on port using nodemon http://localhost:${port}`)})

//backend setup successfully(now we will set the database for the backend )