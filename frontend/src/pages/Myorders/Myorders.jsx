import React, { useContext, useEffect, useState } from 'react'
import './Myorders.css'
import axios from 'axios'
import Loader from '../../components/LoadSucces/Loader'
import { StoreContext } from '../../Context/Storecontext';
import { assets } from '../../../frontend_assets/assets';
//setting up this page in our route app.jsx that is alreader in the verifyOrders navigate i created it before i created this one

const Myorders = () => {
    //now to add the logic of fetching the user data and saving it in a state variable
    const {serverUrl, token} = useContext(StoreContext);
    const [loading, setloading] = useState(false);
    const [data, setdata] = useState([]);

    const fetchOrders = async () => {
        try {
            setloading(true)
            const response = await axios.post(`${serverUrl}/api/order/userorders`,{},{headers:{token}})// in the body we dont have to send anything because its not needed in the backend but the token will be through headers
            setloading(false)
            setdata(response.data.data);//na so the data from the backend dey hide put for object inside response object na so data request coming from backend dey hide 
            //so what i am getting from the backend is all the orders made by the users in the orderModel
            // and remember each orders object with their _id has a item array of objects where all the items details they ordered are stored  
             
        } catch (error) {
            console.log(error)  
        }  
    }

    useEffect(()=>{//we will add if statement to check if the token is available
        if(token){//if the token is not available we will not run this function
            fetchOrders();
        }
        //suppose the user log in or log out on a webpage in that case we are again to execute this function
        
    },[token])//with the token present as a condition is what will make this useEffect load again 


  return (
    <div className='my-orders'>
        {loading && (<Loader /> )}
        <h2>My Order</h2>
        <div className="container">{/*we will use the data state variable to map the user orders */}
            {data.map((order,index) => { //iterating
                return (<div key={index} className='my-orders-order'> 
                <img src={assets.parcel_icon} alt="" />
                {/*Thus, the if condition is false for all items except the last one, which makes the else block run for those cases*/}
                <p>{order.items.map((orderitem,index) => {//
                    if (index === order.items.length-1){ //The conditional if (index === orderproperty.items.length - 1) is used to check if the current item is the last one, and if so, returns the string ${orderitem.name} X ${orderitem.quantity}.
                        //the index is used to check the position of the current element in the array its iterating over(starting with 0).... so the condition is if the last index is the same number with the last in of the array(array.length -1) overall checking if the current is the last item in the array then the code below will run
                        return `${orderitem.name} X ${orderitem.quantity}`//last item
                    }else{//as if iterating when the index !== to the length of the length of the array the else statement run If it is not the last item, it returns the name and quantity followed by a comma:
                         return `${orderitem.name} X ${orderitem.quantity},`
                    }
                })}</p>
                <p>₦{order.amount}</p>
                <p>Items: {order.items.length}</p>{/*getting the total number of items through the length of the item array */}
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button onClick={fetchOrders}>Track Order</button>
                

            </div>)
                
            })}

        </div>
      
    </div>
  )
}

export default Myorders
