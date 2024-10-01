import React, { useEffect, useState } from 'react'
import Loader from '../../components/Loader';
import axios from 'axios';

const Users = ({serverUrl}) => {

    const [loading, setLoading] = useState(false); 
    const [users, setusers] = useState([])

    
    useEffect(() => {
      
        const fetchdata = async () => {
            
            try {
                setLoading(true)
                const response = await axios.get(`${serverUrl}/api/users/getallusers`) /*get request to collect userdata from the backend(already*/
                setusers(response.data.data)
                setLoading(false)
               
            } catch (error) {
                setLoading(false)
                console.log(error)
                setError(error)
                
            }
        }
        
        fetchdata();
      
    }, [])

  return (
    <>
        {loading ? (<Loader /> ) :  <div className='list add flex-col'>
            <p>All Users</p>

            <table className="user-table">
                <thead className='list-table-format title'>
                    <tr className='head'>
                        <th>UserId</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>

                <tbody className='list-table-format'>
                    {users.length && (users.map((useritem,index) => {
                        return <tr>
                            <td>{useritem._id}</td>
                            <td>{useritem.name}</td>
                            <td>{useritem.email}</td>
                        </tr>
                    }))}
                </tbody>
                
            </table>
        </div>}
    
    </>
  )
}

export default Users
