import React from 'react'
import Navbar from "./components/navbar/Navbar";
import { Routes, Route } from 'react-router-dom';

import Homepage from './pages/Home/Homepage';
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/footer/footer';

function App() {
  return (
    <>
        <div className='app'>
            <Navbar/>
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
