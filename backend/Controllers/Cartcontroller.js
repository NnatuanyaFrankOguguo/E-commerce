import userModel from "../models/User.js";


//first we will create three arrow function..addtocart, removefromcart, getcart

//add items to user cart
const addToCart = async (req, res) => {
    try {//we will have to find and get the user data
        let userData = await userModel.findOne({_id : req.body.userId }) //the userId we will get using the middleware.. that is we decode the token and remove the userid(WISE)
        //we will now extract the cartdata from the userdata gotten from the database
        let cartData = await userData.cartData;
        //we will now modify the data in the cartData by let's say when a user will have to add the data in the cart then they will send the token and with that, they will send 
        //the item._id
        if(!cartData[req.body.itemId]){//that is if in the cartData there is no entry with the itemid then we will create the code below
            cartData[req.body.itemId] = 1 //just like how we did the logic for cartitems in storecontext... so it will create a new entry with the cartData[itemid} as key and the value as the quantity
        } else{
            cartData[req.body.itemId] += 1; //if itemid is there already just increment it by 1
        }
        //so after the item has been added to the cart.. then we have to update the Usercart by passing the userid and with this new "cartData" as parameters 
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true, message:" Added to cart & Updated user cartData successfully"})


    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Error' }); //this is how we will be sending our error message to the frontend
    }
}// to use the same logic for removecart function


//remove items from user cart
const removeFromCart = async (req, res) => { 

    try {
        let userData = await userModel.findOne({_id:req.body.userId}); //we can use findById or findOne(anyone can go)
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){ //checking if the cartdataitem the quantity is greater than 1 so it can be removed
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData})
        res.json({success:true, message:" removed from cart & Updated user cartData successfully"})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Error' }); //this is how we will be sending our error message to the frontend
        
    }//SUCCESSFULLY CREATED THE REMOVE AND ADD TO CART FUNCTIONALITY

}

//fetch user data
const getCart = async(req, res) => {
    //we can fetch the user all the cart data
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true, cartData}) //it will send the userdata to the front end
    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Error' }); //this is how we will be sending our error message to the frontend
    }
}

export {addToCart, removeFromCart, getCart}

//now go to cartroute to create the api endpoint

//sucessfully created to getcart and remove from cart and to cart
//NOW TO INTEGRATE THIS API IN OUR FRONTEND