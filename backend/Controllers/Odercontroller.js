import orderModel from "../models/Order.js";
import userModel from "../models/User.js";
import flutterwave from 'flutterwave-node-v3';
import axios from 'axios'

//NOW TO SETUP THE FLUTERWAVE
const FLW_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

//now we will create one arrow function and the name will be placeorder using that we can place the user order
//placing user order from frontend


const placeOrder = async (req, res) => {

    //defining the frontend URl as success_page when the payment is a success formerly http://localhost:5173"
    //const frontend_url = "https://e-commerce-tomato.onrender.com"

    try {
        //we will add the new order  (remember userId is from the authmiddleware that decode the token that will generate the userId)
        const newOrder = new orderModel({
            userId : req.body.userId,
            items : req.body.items,
            amount : req.body.amount,
            address : req.body.address,
            
        })

        await newOrder.save(); //now it will save the NEWorder in our database and we now clear the user cartData
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: {}}) //setting the cartData with one empty object will clear the cart data

        //PREPARE  ITEMS FOR Flutterwave API
        const totalAmount = req.body.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5;
        const customer = await userModel.findById(req.body.userId);

        const payload = {
            tx_ref: `tx-${Date.now()}`, //Transaction reference
            amount: totalAmount, //Total amount
            currency: 'NGN', //Currency
            redirect_url: `https://e-commerce-tomato.onrender.com/verify?orderId=${newOrder._id}`, //: Flutterwave uses redirect_url to handle success or failure cases.
            customer: {
                email: customer.email,
                name: customer.name,
            },
            meta: {
                orderId: newOrder._id,
            },
            customizations: {
                title: "Order Payment",
                description: "Payment for order"
            }
        };//remember to remove flutterwave icon

        //send payment request to flutterwave
        const response = await axios.post('https://api.flutterwave.com/v3/payments', payload, {
            headers: {
                Authorization: `Bearer ${FLW_SECRET_KEY}`,
                'Content-Type': 'application/json',
            },
        });
        //send the payment link (redirect URL) to the frontend return the Flutterwave payment URL
        const paymentLink = response.data.data.link;
        res.json({success:true, session_url:paymentLink})

    //. It covers order creation, payment link generation, and cart clearing after the order is placed.
    } catch (error) {
          console.error("Error processing order:", error);
          return res.status(500).json({ error: 'Internal server error while processing your order.' }); //this is how we will be sending our error message to the frontend
        }


}

//WE WILL NOW VERIFY THE PAYMENT IF SUCCESSFUL OR NOT(FIND WAY TO VERIFY PAYMENT IN PAYSTACK) its still related to the former method in my hotel book app in verifying
const verifyOrder = async(req, res) => {
    //logic to verify the order payment...first we need the orderid and success
    const {orderId, status, transactionId} = req.body
    try {
        if(status === "successful"){//checking if status == successfull in query parameters then run this code below to verify the payment
            //making a request to flutter url database to confirm that the transaction was successfull
            const response = await axios.get(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {headers: {'Authorization': FLW_SECRET_KEY}})

            if(response.data.status === "success" && response.data.data.status === "successful"){//if the success is equal to true we will make the payment true
                console.log('payment successfull',response.data.data)

                await orderModel.findByIdAndUpdate(orderId, {payment:true}); //adding the ordermodel object._Id and property we want to update and the value
                return res.json({success:true,message:"paid"})

            }else{//if the payment success is not true it means we will hve to delete the order(but in my hotel booking app after verify there is no place to put if the success is not true we should delete the booking in the database will work on it later)
                // Payment failed or is not yet verified
                //console.log('Payment failed or unverified', response.data);
                await orderModel.findByIdAndDelete(orderId);
                return res.json({success:false, message: 'Not Paid' });
            }
        }else{//if the payment success is not true it means we will hve to delete the order(but in my hotel booking app after verify there is no place to put if the success is not true we should delete the booking in the database will work on it later)
            // Payment failed or is not yet verified
            await orderModel.findByIdAndDelete(orderId);
            return res.json({success:false, message: 'Not Paid' });
        }
    } catch (error) {
        console.error("Error processing order:", error);
        return res.status(500).json({success:false, message: 'Error.' });
    }                                
}
//NOW TO INTEGRATE THIS VERIFY ORDER API WITH OUR FRONTEND CREATE A NEW FOLDER UNDER PAGES NAMED VERIFY

//NOW TO CREATE THE FUNCTIONALITY FOR DISPLAYING THE USER ORDERS FOR FRONTEND
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId:req.body.userId}) //it will find all the orders of that user using the userid (thats why we are not using findOne)..parameter filter to find/findOne must be an object
        //now all the orders of the user will be saved in the orders variable and we will send it to the frontend
        return res.json({success:true, data:orders})
    } catch (error) {
        console.error("Error processing order:", error);
        return res.status(500).json({ success:false, message: 'Internal server error while processing your order.' }); //this is to the frontend
        
    }
    //SUCCESS
    
}

//get all orders for admin panel
const allOrders = async(req,res) => {
    try {
        const allorders = await orderModel.find({})
        return res.json({success:true, data:allorders}) 
    } catch (error) {
        console.error("Error processing order:", error);
        return res.status(500).json({ success:false, message: 'Internal server error while getting all orders.' }); //this is to the frontend
    }
}

//UPDATING THE ORDER STATUS FROM THE BACKEND
const updateStatus = async(req,res) => {
    try {//finding the order by using the order._id we will get from the frontend
        const particularOrder = await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})//updating it by the status values coming from the frontend
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.error("Error processing order:", error);
        return res.status(500).json({ success:false, message: 'Internal server error while updating the error' }); //this is to the frontend    
    }

}


export {placeOrder, verifyOrder, userOrders, allOrders, updateStatus}
//next we will go the routefolder to create the placeOrder API endpoint

//   // Prepare Paystack payment request payload
//   const payload = {
//     email: customer.email,
//     amount: totalAmount * 100, // Amount in kobo
//     callback_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, //that verify apipath is what we will use to create the frontend page and add the verify path name to app.js
//     metadata: {
//       orderId: newOrder._id,
//       custom_fields: [{ display_name: "Order ID", variable_name: "order_id", value: newOrder._id }]
//     }
//   };

//   // Send payment request to Paystack
//   const response = await axios.post('https://api.paystack.co/transaction/initialize', payload,
//     {
//       headers: {
//         Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     }
//   );

//   const paymentLink = response.data.data.authorization_url;
//   res.json({ success: true, session_url: paymentLink });


//   if (response.data.status !== 'success') {
//       return res.status(400).json({ success: false, error: 'Payment processing failed. Please check your details and try again.' });
//   }
  
// } catch (error) {
//   console.error("Error processing order:", error);
//   return res.status(500).json({ error: 'Internal server error while processing your order.' }); //this is how we will be sending our error message to the frontend
// }
//------------------------------------------------------------------------------------------------------
        // import React, { useState } from 'react';
        // import axios from 'axios';
        
        // const Checkout = () => {
        //   const [loading, setLoading] = useState(false);
        //   const [error, setError] = useState(null);
        
        //   // Example order data
        //   const orderData = {
        //     userId: 'user123', // Replace with actual user ID
        //     items: [
        //       { name: 'Pizza', price: 2000, quantity: 2 },
        //       { name: 'Burger', price: 1000, quantity: 1 }
        //     ],
        //     amount: 5000, // Total order amount
        //     address: '123 Street, Lagos, Nigeria'
        //   };
        
        //   const handleCheckout = async () => {
        //     setLoading(true);
        //     setError(null);
        
        //     try {
        //       // Send the order data to the backend
        //       const response = await axios.post('http://localhost:5000/api/orders/checkout', orderData);
        
        //       // The backend will return the Flutterwave payment URL
        //       const { session_url } = response.data;
        
        //       // Redirect the user to Flutterwave's payment page
        //       window.location.href = session_url;
        //     } catch (error) {
        //       setError('Error processing payment, please try again.');
        //       console.error(error);
        //     } finally {
        //       setLoading(false);
        //     }
        //   };
        
        //   return (
        //     <div>
        //       <h2>Complete your order</h2>
        
        //       {/* Render loading spinner */}
        //       {loading && <p>Loading...</p>}
        
        //       {/* Render error if there's any */}
        //       {error && <p style={{ color: 'red' }}>{error}</p>}
        
        //       <button onClick={handleCheckout} disabled={loading}>
        //         Pay Now
        //       </button>
        //     </div>
        //   );
        // };
        
        // export default Checkout;
        

//\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

// const totalAmount = req.body.items.reduce((sum, item) => sum + item.price * item.quantity, 0) + 5; // +5 for delivery
// const customer = await userModel.findById(req.body.userId);

// const itemsList = req.body.items.map(item => ({
//     name: item.name,
//     quantity: item.quantity,
//     price: item.price
// }));

// const payload = {
//     tx_ref: `tx-${Date.now()}`, //Transaction reference
//     amount: totalAmount, //Total amount
//     currency: 'NGN', //Currency
//     redirect_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`, //: Flutterwave uses redirect_url to handle success or failure cases.
//     customer: {
//         email: customer.email,
//         name: customer.name,
//     },
//     meta: {
//         orderId: newOrder._id,
//         items : itemsList //adding items to the meta
//     },
//     customizations: {
//         title: "Order Payment",
//         description: "Payment for order"
//     }
// };

// //send payment request to flutterwave
// const response = await axios.post('https://api.flutterwave.com/v3/payments', payload, {
//     headers: {
//         Authorization: `Bearer ${FLW_SECRET_KEY}`,
//         'Content-Type': 'application/json',
//     },
// });
// //send the payment link (redirect URL) to the frontend return the Flutterwave payment URL
// const paymentLink = response.data.data.link;
// res.json({success:true, session_url:paymentLink})