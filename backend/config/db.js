// now we will create the logic to connect the backend with the database
import mongoose from "mongoose";
//mongodb+srv://nnatuanyafrank:9VQvWSiOwaWApVhJ@cluster0.bgh02.mongodb.net/?
import dotenv from 'dotenv';

// loading the environment of variables of .env using the dotenv package
//require('dotenv').config({env});
dotenv.config({ path: './.env' });


var mongoURL = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/food-del`

export const connectDB = async () => {
    await mongoose.connect(mongoURL)
    .then(()=>console.log('MongoDB connected successful'))
    .catch((error) => console.log('MongoDB connection failed'));
}

//MONGODB CONNECTED SUCCESSFULLY
// GO TO INPUT/CALL IT IN THE SERVER.JS,
//THEN GO AND CREATE THE FOOD MODELS FOR THE MONGO COLLECTION






