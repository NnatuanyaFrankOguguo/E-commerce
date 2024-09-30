//to be able to access the mongodb 
import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    //so in our food data structure object to be pass to the database will be
    name : { //so if we tried to save a data without name it will not get stored bcos we have type required true
        type : String, 
        required : true
    },

    description: {
        type : String,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    image: { /* for image url */
        type : String,
        required : true
    },

    category : {
        type : String,
        required : true
    }
}, {
    timestamps : true,
})

const foodModel = mongoose.models.food /*the reason for this is that incase the food collection is existed it will use this current existed model than creating a new one*/ || mongoose.model('foods', foodSchema)

export default foodModel;

//now we will create the backend API in route to add the NEW food item in our database
//to the controllers