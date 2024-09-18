import React from 'react'
import './Mobileapp.css'
import { assets } from '../../../frontend_assets/assets'

const Mobileapp = () => {
  return (
    <div className='mobile-app' id='mobile-app'>
        <p>For Better Experience Download <br /> Tomato App </p>
        <div className="mobile-app-platforms">
            <img src={assets.play_store} alt="" />
            <img src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default Mobileapp
