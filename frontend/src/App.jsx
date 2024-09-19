import React, { useState } from 'react'
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Home/Homepage';
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/footer/footer';
import Login from './components/Loginpopup/Login';

function App() {
// to display the login pop up we will create a state variablec

    const [showlogin, setshowlogin] = useState(false) //we initialise it with false


  return (
    <>
    {/*we will add the login component above everything else for it to only display... now we will do the logic when the sign in button is clicked to appear with turnary operator */}
        {showlogin ? <Login setshowlogin={setshowlogin}/> : <></>} {/*that is if showlogin is true... render the component login if not/else return the fragment  */}
        <div className='app'>
            <Navbar setshowlogin={setshowlogin}/> {/*since the sign in button is in the navbar component we will pass the setshowlogin as props over there */}
            <Routes>
                <Route path='/' element={<Homepage/>} /> {/* the first opening page always goes with '/' */}
                <Route path='/cart' element={<Cart/>} /> 
                <Route path='order' element={<Placeorder/>} />
            </Routes>
        </div>
        <Footer/>
    </>
  )
}

export default App
