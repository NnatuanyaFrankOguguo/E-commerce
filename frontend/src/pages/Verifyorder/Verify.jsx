import React, { useContext, useEffect, useState } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../Context/Storecontext'
import Loader from '../../components/LoadSucces/Loader'
import axios from 'axios'
//we will now connect this page to the route .. App.jsx

const Verify = () => {//we will create the logic where we will get the parameters by using useSearchParam

    //const {orderId, transaction_id, status} = useParams().. it will not work cause its not being written in the path parameter in the app.jsx
    const [searchParams, setsearchParams] = useSearchParams() //this is how we will extract the values from the query parameter
    const status = searchParams.get("status")//the status is what it will extract from the parameter and storing it in the searchparam statevariable
    const orderId = searchParams.get("orderId")//the orderId is what it will extract from the parameter  and storing it in the searchparam statevariable
    const transactionId = searchParams.get("transaction_id")//the transaction_id is what it will extract from the parameter  and storing it in the searchparam statevariable
    
    const navigate = useNavigate()
    const [loading, setloading] = useState(false)//we will set the loader(the scooter until the payments gets verified)

    const {serverUrl} = useContext(StoreContext)
    console.log(status,orderId, transactionId)
    
    const verifyPayment = async () => {
        try {
            setloading(true)
            const response = await axios.post(`${serverUrl}/api/order/verify`, {status, orderId, transactionId})//send the values through the body. if its an header we will put {headers:{}}
            setloading(false)
            if(response.data.success){ //if the res. data we are sending from the backend to the frontend is true then we will navigate the user to the /myorders page
                //with a pop message order made successfully sweet alert
                navigate("/myorders")
            }else{//payment failed navigate the user to homepage //sweetalert error
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }

    //we will run the code immediately the code is loaded
    useEffect(()=>{
        verifyPayment();
    },[])




  return (//this is where we will do the frontend api request that will verify the payment if its successful or not
    <div className='verify'>
        {loading && (<Loader /> )} {/* the conditions is if loading is equal to true show loading component*/}
    </div>
  )
}

//VERIFICATION SUCCESSFUL


export default Verify
