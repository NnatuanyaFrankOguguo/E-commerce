import React, { useContext, useEffect, useState } from 'react'
import './Placeorder.css'
import { StoreContext } from '../../Context/Storecontext';
import axios from 'axios'
import Loader from '../../components/LoadSucces/Loader'
import { useNavigate } from 'react-router-dom'





function Placeorder() {
    //(in the last part)NOW HANDLING THE PAYMENT PROCESS.... FIRST WE WILL GET THE TOKEN FROM STORECONTEXT,foodlist, cartitems and so on

    const{getTotalCartAmount, token, food_list, cartitems, serverUrl} = useContext(StoreContext)
    //we will create the state variable where we will store this information from the form field

    const[loading, setloading] = useState(false)

    const [data, setdata] = useState({
        firstName: "",
        lastName:"",
        email:"",
        city:"",
        state:"",
        phone:"",
        street: "",
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setdata(prev=>({...prev,[name]:value}))
    }

    //now to add the functionality PLACEORDER that will direct us to the payment gateway
    const orderAway = async (event) => {
        event.preventDefault()
        //structure the orders data as we have created in the backend model and api
        let orderItems = [] //we will add cartitems related data(what the users ordered)
        food_list.map((item)=>{ //in the if condition we will check if our cartitem[itemid] have the product of the itemid
            if (cartitems[item._id] > 0){
                let itemInfo = item; //this item is one object
                //we will now add one property which is the quantity
                itemInfo["quantity"] = cartitems[item._id] //this then here itemInfo now contains all the property in the original fooditem object
                orderItems.push(itemInfo)

            }
        })
        //creating one order data variable
        let orderData = { //the data state variable will be store in the address property, items is the orderitem where we are adding the data using the mapping
            address : data,
            items : orderItems,
            amount : getTotalCartAmount() + 5,
        
        }
        try {//THIS IS WHERE WE INITIATE THE API OPERATION THAT WILL RUN THE FLUTTERWAVE PAYMENT GATE IN THE BACKEND AND ALSO PLACE THE ORDER AS WRITTEN ABOVE
            setloading(true)
            let response = await axios.post(`${serverUrl}/api/order/placeorder`, orderData, {headers:{token}})
            setloading(false)
            //after calling the api and getting a response we will check if 
            if(response.data.success){
                //we will get one session/redirect URL from the backend to the paymentLink and we will have to destructure it
                const {session_url} = response.data;
                //now we will send the user to this session_url we will use the code below to acheive that
                window.location.replace(session_url);
            } else{
                console.error("Payment initiation error:", error);
                alert("There was an error initiating the payment. Please try again.");
            }
        } catch (error) {
            console.log(error)
            
        }
       
    }
    const navigate = useNavigate()
// ADDING THE FUNCTIONALITY IF THE USER IS NOT LOGGED IN HE CANNOT ACCESS THE PLACEORDER PAGE
    useEffect(()=>{
        if(!token){//if token is not available(user not signed in) it will navigate the user to the cart page
            navigate('/cart')
        }
        else if(getTotalCartAmount()===0){//and also if the cart is empty but user is signed in we will again send them to the cart page.. you cant order empty item
            navigate('/cart')
        }

    },[token])//it will be executed whenever our token gets updated



  return (
    <form onSubmit={orderAway} className="place-order">
        {loading && (<Loader /> )} {/* the conditions is if loading is equal to true show loading component*/}
        <div className="place-order-left">
            <p className="title">Delivery Information</p>

            <div className="multi-fields">
                <input name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder="First Name" />
                <input type="text" name='lastName'  onChange={onChangeHandler} value={data.lastName}  placeholder="Last Name" />
            </div>

            <input type="email" name="email"  onChange={onChangeHandler} value={data.email} placeholder="Email address" />
            <input type="text" name="street" onChange={onChangeHandler} value={data.street} placeholder="Street address" />

            <div className="multi-fields">
                <input type="text" name='city'  onChange={onChangeHandler} value={data.city} placeholder="City" />
                <input type="text" name='state'  onChange={onChangeHandler} value={data.state} placeholder="State" />
            </div>

            <input type="tel" name='phone' onChange={onChangeHandler} value={data.phone} placeholder="Phone" />

            {/* <div className="multi-fields">
                <input type="text" placeholder="Zip code" />
                <input type="text" placeholder="Country" />
            </div> */}

             {/* Display user's location */}
        
        </div>

        <div className="place-order-right">

            <div className="cart-total">
                <h2>Cart Totals</h2>

                <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>₦{getTotalCartAmount()}</p>
                    </div>
                    <hr />

                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>₦{getTotalCartAmount()===0? 0 : 5}</p>
                    </div>
                    <hr />

                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>₦{getTotalCartAmount()===0? 0 : getTotalCartAmount() + 5}</b>
                    </div>
                </div>
                
                <button type='submit'>
                    PROCEED TO PAYMENT
                </button>
            </div>

        </div>
    </form>
  );
}

export default Placeorder
