/*well no too understand this one... but will definitely come back to it later..
StoreContext is created using createContext(null) to share data across components.
StoreContextProvider is a component that uses <StoreContext.Provider> to wrap child components and provide them with a shared contextValue.
The context value (contextValue) is an empty object in this case, but it can be customized to hold shared state or functions.
props.children ensures that any components inside StoreContextProvider will be rendered within the provider.
This setup is useful when you need to manage global state or share data across deeply nested components without passing props down manually.
THIS CONTEXT API is an front end API */

import { createContext, useEffect, useState } from "react"
import { food_list } from "../../frontend_assets/assets"

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {
//creating a state variable to store the cart item data and creating the functionality for add to cart and remove from cart
    const [cartitems, setcartitems] = useState({});
    //functionality to add to cart
    const addTocart = (itemId) => {
        //we will pass the itemid as parameter in the... first we will check if the user is adding the product first time to the cart which is
        if (!cartitems[itemId]) { // so if the cartitems[itemId] is not available then in that case we will use
            setcartitems((prev)=>({...prev,[itemId] :1})) // so if the user is adding the item first time in the cart this statement will be executed
        }else{ //suppose any product item is already available and quantiy is one in that case we will increase one
            setcartitems((prev)=>({...prev,[itemId]:prev[itemId]+1}))    
        }
    }

    const removeFromcart = (itemId) => {
        setcartitems((prev) => ({...prev, [itemId] : prev[itemId] -1}))

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
        getTotalCartAmount
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider