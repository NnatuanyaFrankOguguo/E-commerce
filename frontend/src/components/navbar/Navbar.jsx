import React, {useContext, useState} from "react";
import "./Navbar.css";
import { assets } from "../../../frontend_assets/assets";
import { Link } from 'react-router-dom'
import shopping_cart from './shopping_cart.png'
import trolley_cart from './trolley_cart.png'
import { StoreContext } from "../../Context/Storecontext";
 
function Navbar({setshowlogin}) {
    /*to create underline effect for the menu list we will use the state varialble */
    const [menu, setmenu] = useState('home')/*created a state variable & initialise it with home as default */
    const {getTotalCartAmount} = useContext(StoreContext)
    


	return (
        /*see my long note */
		<div className="navbar">
			<Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>

			<ul className="navbar-menu">
				<Link to='/' onClick={()=>setmenu("home")} className={menu==="home" ? "active" : ""}>Home</Link>
				<a href="#explore-menu" onClick={()=>setmenu("menu")} className={menu==="menu" ? "active" : ""}>Menu</a>
				<a href="#mobile-app" onClick={()=>setmenu("mobile-app")} className={menu==="mobile-app" ? "active" : ""}>Mobile-app</a>
				<a href="#footer"  onClick={()=>setmenu("contact-us")} className={menu==="contact-us" ? "active" : ""}>Contact Us</a>
			</ul>

			<div className="navbar-right">
				<img src={assets.search_icon} alt="" />

				<div className="navbar-search-icon">
                    <Link to="/cart"><img className='shopping-cart' src={getTotalCartAmount()===0 ? `${shopping_cart}` : `${trolley_cart}`} alt="" /></Link>

                    <div className={getTotalCartAmount()===0 ? '' : 'dot'}>
                        {/*we will design this as dot that whenever will be visual inside the basket 
                        that whenever we add product in this basket that dot will appear */}
                    </div>

                </div>

                <button onClick={()=>{setshowlogin(true)}}>Sign in</button>
			</div>
            
		</div>
	);
}

export default Navbar;
