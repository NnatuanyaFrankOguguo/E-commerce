import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    // those four inputs fields we are taking from the user is what we are going put below
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true, //suppose one email id is use to create another account we cannot add that email id bcos we have use unique:true
    },

    password : {
        type : String,
        required : true,
    },

    cartData : { //where we will manage the user cart data
        type : Object,
        default : {},
    }
 
}, {minimize:false, timestamps:true})
//if we dont write minimize false this cart data we will not be created, because we have not added any data into the object
//you already know the reason for the timestamps

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
/*the reason for this is that incase the food collection is existed it will use this current existed model than creating a new one*/ 
export default userModel;

//userModel successfully created