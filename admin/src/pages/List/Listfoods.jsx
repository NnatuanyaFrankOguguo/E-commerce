import React, { useEffect, useState } from 'react'
import './Listfoods.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';


const Listfoods = ({serverUrl}) => { //destructure the data being sent
   

// we have to store all the fooditems in a state variable
    const [foods, setfoods] = useState([]);

    const [loading, setloading] = useState(false)



    useEffect(() => {

        const fetchfood = async () => {

            try {
                setloading(true)
                const response = await axios.get(`${serverUrl}/api/foods/getallfoods`)
                setfoods(response.data.data) //storing the response from the backend into the state variable (its .data.data cos in the res.send we add the normal json object response in an object again)
                setloading(false)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.message) 
                setloading(false)
            }
            
        }

        fetchfood();

        
       

    },[]) //empty array meaning there is no state that will be updated before the code in the block runs, instead it will run immediatly the page loads

     //DELETING FOOD FUNCTIONALITY FROM THE DATABASE FOR WHEN THE X ITS BEING CLICKED
        
    const deletefood = async (foodid) => {
        try {
            const response = await axios.post(`${serverUrl}/api/foods/removefood`, {foodid}); //sending the foodid as object
            console.log(foodid)
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data.message) 
            console.log({foodid})  
        }
    } 

  return (
    <>
        {loading ? (<Loader height="100vh"/> ) :  <div className='list add flex-col'>
            <p>All  Foods List</p>

            <table className="list-table">
                <thead className='list-table-format title'>
                    <tr className='head'>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>

                <tbody className='list-table-format'>
                    {foods.length && (foods.map((fooditem,index) => {
                        return <tr>
                            <td><img src={`${serverUrl}/images/` + fooditem.image} alt="" /></td>{/*using string literals for the concatenation n backtick for the APi we can use the backtick for both but its understanding this way*/}
                            <td>{fooditem.name}</td>
                            <td>{fooditem.category}</td>
                            <td>₦{fooditem.price}</td>
                            <td><p onClick={()=>{deletefood(fooditem._id)}} className='cross'>X</p></td>
                        </tr>
                    }))}
                </tbody>
                
            </table>
        </div>}
       
    </>
  )
}

export default Listfoods

//NOW TO UPLOAD ALL THE 32PRODUCTS IN OUR FRONTEND TO THE DATABASE
//LATER I GO DO AM.. FOR NOW NA 1 ITEM DEY DATABASE