import foodModel from "../models/Food.js";
import fs from 'fs' //importing the File System that is pre-built in the node.js

//add food item

const addFood = async (req, res) => {

    //variable to store the uploaded file
    let image_filename = `${req.file.filename}`; //here the image is coming in as a different variable body thats why its seperated
    //now to destructure the code coming from frontend, you know differently from how that booking app is
    const food = new foodModel ({
        name : req.body.name,
        description : req.body.description,
        category : req.body.category,
        price : req.body.price,
        image : image_filename,

    })

    try {
        await food.save();
        res.json({success:true, message:"Food Added Successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Food was not Successfully Added' }); //this is how we will be sending our error message to the frontend
    }

}

//this is the controller function we have here to add the food item 


//all foodlist 

const listFood = async(req, res) => {
    
    try {
        const foods = await foodModel.find({}) /*fetch all the food items in the database with an empty object(no condition) */
        res.json({success:true, data:foods}) /* res.send(foods) */
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Get all Foods Failed' }); //this is how we will be sending our error message to the frontend
        
        
    }

}

//remove fooditem in database

const removeFood = async(req, res) => {
     
    //const foodid = req.body.foodid
    //if we destructure then in the database query object

    try {
        //find the fooditem we want to delete
        const food = await foodModel.findById(req.body.foodid) //find the fooditem in the collection usind the food id
        fs.unlink(`Uploads/${food.image}`, ()=>{}) //to delete the foodimage in the upload folder that we are displaying in the frontend admin

        await foodModel.findByIdAndDelete(req.body.foodid) //find the and delete
        res.json({success:true, message:'Food Remove Successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Food not removed successfully' }); //this is how we will be sending our error message to the frontend

        
    }

}

export {addFood, listFood, removeFood}

//then we will go to the route folder to call the function

//add food item is successfully working... using this API we can add new fooditem in our database
//DONE WITH CREATING THE API ENDPOINT FOR SHOWING ALL ROOMS, DELETING ROOMS AND ADDROOMS NOW LETS GO TO CREATE ADMIN PANEL