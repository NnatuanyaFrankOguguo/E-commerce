import React from 'react'
import './Sidebar.css'
import { assets } from '../../../admin_assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to="/addfood" className="sidebar-option">
                <img src={assets.add_icon} alt="" />
                <p>Add Item</p>
            </NavLink >

            <NavLink to="/listfoods" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>List Items</p>
            </NavLink >

            <NavLink to="/orders" className="sidebar-option">
                <img src={assets.order_icon} alt="" />
                <p>Orders</p>
            </NavLink >

            <NavLink to="/users" className="sidebar-option">
                <img className='User-icon' src={assets.user} alt="" />
                <p>Users</p>
            </NavLink >
        </div>
      
    </div>
  )
}

export default Sidebar
