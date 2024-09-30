import React, {useState, useEffect} from 'react'
import './Orders.css'
import Loader from '../../../../frontend/src/components/LoadSucces/Loader'
import axios from 'axios'
import { assets } from '../../../../frontend/frontend_assets/assets'
import {toast} from 'react-toastify'

const Orders = ({serverUrl}) => {

    const [loading, setloading] = useState(false)
    const [orders, setorders] = useState([])


    const fetchData = async () => {
        try {
            setloading(true)
            const response = await axios.get(`${serverUrl}/api/order/getallorders`)
            setloading(false)
            setorders(response.data.data)
            // console.log(response.data.data)
        } catch (error) {
            console.log(error)
        } 
            
    }

    useEffect(()=>{

        fetchData();

    },[])

     //creating functionality to handle the status being sent to the backend
    const  statusHandler = async(event,orderId) => {
        //we will add the logic that whenever we make the changes, that changes will be reflected in the database
        try {
            const response = await axios.post(`${serverUrl}/api/order/status`, {orderId, status:event.target.value})
            fetchData();
        } catch (error) {
            console.log(error)
        }
    }




  return (
    <div className='order add'>
        {loading && (<Loader /> )}
        <h3>Orders Page</h3>
        <div className='order-list'>
            {orders.map((order,index) => 
            (<div key={index} className='order-item'>
                <img src={assets.parcel_icon} alt="" />
                <div>
                    <p className='order-item-food'>
                        {order.items.map((item,index) => {
                            if (index===order.items.length-1){ //same logic we used in the myorders page... it will iterate thru all which means the else statement will first run and then the last logic will be true then the if statement will run last
                                return `${item.name} X ${item.quantity}`
                            } else {
                                return `${item.name} X ${item.quantity},`
                            }
                        })}
                    </p>
                    {/**-------------------- */}

                    <p className="order-item-name">{`${order.address.firstName} ${order.address.lastName}`}</p>

                    <div className="order-item-address">
                        <p>{`${order.address.street},`}</p>
                        <p> {`${order.address.city}`}</p>
                        <p>{`${order.address.state}.`}</p>
                    </div>

                    <p className='order-item-phone'>{order.address.phone}</p>
                </div>

                <div className='details'>
                    <p>Item : {order.items.length}</p>
                    <p>Date : {order.orderdate}</p>

                </div>

                <p>₦{order.amount}</p>
                {/*now we will create a select menu so that we can able to change the order status here to the backend by making api request to reflect in the frontend on the order.status element */}
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                    <option value="Food Processing">Food Processing</option>{/*by default status */}
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>

            </div>))}
        </div>
      
    </div>
  )
}

export default Orders
