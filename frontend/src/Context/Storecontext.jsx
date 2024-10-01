/*well no too understand this one... but will definitely come back to it later..
StoreContext is created using createContext(null) to share data across components.
StoreContextProvider is a component that uses <StoreContext.Provider> to wrap child components and provide them with a shared contextValue.
The context value (contextValue) is an empty object in this case, but it can be customized to hold shared state or functions.
props.children ensures that any components inside StoreContextProvider will be rendered within the provider.
This setup is useful when you need to manage global state or share data across deeply nested components without passing props down manually.
THIS CONTEXT API is an front end API */

import React, { createContext, useEffect, useState } from "react"
import axios from 'axios'

//import { food_list } from "../../frontend_assets/assets" removing the food_list from the frontend asset but fetch it from the backend

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
//creating a state variable to store the cart item data and creating the functionality for add to cart and remove from cart
    const [cartitems, setcartitems] = useState([]);
    const [loading, setloading] = useState(false)

    //SAVING USERDETAILS IN THE LOCAL STORAGE AS USER
    const user = JSON.parse(localStorage.getItem("currentuser"))
    

    //BACKEND URL during development(http://localhost:5000')
    const serverUrl = 'https://e-commerce-backend-3iae.onrender.com'
    //store the register token being sent from the backend
    const [token, settoken] = useState('') 

    const [food_list, setfood_list] = useState([])

    //functionality to add to cart
    const addTocart = async (itemId) => {
        //we will pass the itemid as parameter in the... first we will check if the user is adding the product first time to the cart which is
        if (!cartitems[itemId]) { // so if the cartitems[itemId] is not available then in that case we will use
            setcartitems((prev)=>({...prev,[itemId] :1})) // so if the user is adding the item first time in the cart this statement will be executed
        }else{ //suppose any product item is already available and quantiy is one in that case we will increase one
            setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))    
        }
        //HERE WE ARE ADDING THE API INTEGRATION FOR THE USER CARTDATA DETAILS ADD/REMOVE/GET BECASUE WE HAVE THE FOODITEM ID PROVIDED HERE
        if(token){ //we will check if we have a token available in token state variable gotten from the currentuser save in the localstorage
            //whatever item is being added to the cart we will update that in the database also
            await axios.post(`${serverUrl}/api/cart/add`, {itemId},{headers:{token}}) //sending the user token to the backend as headers

            //when we hit the plus icon and this function runs.... Its making an api request
        }

    }

    const removeFromcart = async (itemId) => {
        setcartitems((prev) => ({...prev, [itemId] : prev[itemId] -1}))

        //HERE WE ARR ADDING THE API INTEGRATION FOR THE USERCART DATA DETAILS REMOVE
        if(token){
            await axios.post(`${serverUrl}/api/cart/remove`,{itemId}, {headers:{token}})
            //Api integration to remove from cart once we click the remove 
        }

    }

    // GET THIS ANYTIME YOU SEE AN OBJECT[KEY](ITS ACCESSING THAT PARTICULAR KEY'S VALUE)
    //LIKE FOR EXAMPLE above prev[itemId] and below cartitems[food] which is the cartitems product (quantity)
    //NOW TO ADD THE FUNCIONALITY THAT WILL CREATE THE WILL CALCULATE THE SUBTOTAL AND TOTAL IN THE CART PAGE
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const food in cartitems) { //we are using for loop to iterate through the key products in the cartitems object
            //(and the food holds the key(the food id) of all the cart products and the value of the key : is the quantity of which the product was added)
            if(cartitems[food] > 0) {
                let foodInfo = food_list.find((product)=>product._id === food) // a callback fuction for the find method 
                // product represent each item in the food list array. if our product._id is matching with our food(which is the key from the cartItems) that means the product is available in the foodlist
                //that correspond to the food item in the cart
                totalAmount += foodInfo.price * cartitems[food]
            }
        }
        return totalAmount
    }

    //FETCHING THE FOODDATA FROM THE DATABASE
    const fetchallFood = async () => {
        try {
            setloading(true)
            const response = await axios.get(`${serverUrl}/api/foods/getallfoods`)
            setfood_list(response.data.data)
            console.log(response.data)
            setloading(false)
        } catch (error) {
            console.log(error)
        }
       
    } 

//TO FIXED THE CART QUANTITY FROM GETTING REFRESH WHENEVER THE PAGE RELOAD WE WILL ADD THE FNCTIONALITY HERE using the GETCART api integration
    const loadCartData = async (token) => {
        const response = await axios.post(`${serverUrl}/api/cart/get`, {}, {headers:{token}} )//we dont need anything as the body so we sent empty
        //so we will save the response(cartdata)  in the cartitems state variable so it remains there
        setcartitems(response.data.cartData)
        //then we will run this function whenever the page reloads in the useeffect where the currentuser is stored also
    } 

    //SOLVING THE ERROR THAT WHEN OUR PAGE GETS RELOAD THE LOCALSTORAGE CLEARS
    useEffect(()=>{
        //we call the fecthallFood function whenever the page loads and 
        async function loadData() {
            await fetchallFood();
            if(user){
                settoken(user.token)
                await loadCartData(user.token)
            }
            //now it means that if currentuser is available then we will execute that the currentuser token will be updated in the settoken state variable
            //so that when we reload the webpage we will not get logout because the token state is getting updated from the data in the localstorage

        }

        loadData();

        
    },[])

    // useEffect(()=>{
    //     console.log(cartitems)

    // },[cartitems]) //so when the cartitems will be updated(clicked/added) we will console.log the cartitem state

    const contextValue = {
        /*if we add any element/function in this contextValue we can access the element anywhere using the context without having to pass down props manually */
        food_list, //using this context we can access the foodlist array anywhere... now to create another component food display
        cartitems,
        setcartitems,
        removeFromcart,
        addTocart, /*now we will access the cartitems, addtocart, removefromcart, functionality in our FOODITEM component using the context API */
        getTotalCartAmount,
        serverUrl,
        settoken,
        token,
        loading
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider