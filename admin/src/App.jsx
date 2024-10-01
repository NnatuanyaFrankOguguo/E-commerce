import React from 'react'
import Navbar from './components/navbar/Navbar'
import Sidebar from './components/sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Listfoods from './pages/List/Listfoods'
import Orders from './pages/Orders/Orders'
import Add from './pages/Add/Addfood'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './pages/Users/Users'

const App = () => {

    const serverUrl = "https://e-commerce-backend-3iae.onrender.com" //BACKEND URL TO BE ACCESS EVERYWHERE AS PROPS (during development http://localhost:5000";)

  return (
    <div>
        <ToastContainer/>
        <Navbar/>
        <hr />
        <div className="app-content"> {/*adding the css properties for this classname in index.css */}
            <Sidebar/>
            <Routes>{/*we will now create multiple routes that will direct us to the other pages while the sidebar component will not change or be afftected  */}
                <Route path="/addfood" element={<Add serverUrl={serverUrl}/>}/>
                <Route path="/listfoods" element={<Listfoods serverUrl={serverUrl}/>}/>
                <Route path='/orders' element={<Orders serverUrl={serverUrl}/>}/>
                <Route path='/users' element={<Users serverUrl={serverUrl}/>}/>
            </Routes>
        </div>
    </div>
  )
}

export default App
