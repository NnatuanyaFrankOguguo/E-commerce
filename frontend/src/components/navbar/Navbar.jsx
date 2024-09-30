import React, {useContext, useState} from "react";
import "./Navbar.css";
import { assets } from "../../../frontend_assets/assets";
import { Link } from 'react-router-dom'
import shopping_cart from './shopping_cart.png'
import trolley_cart from './trolley_cart.png'
import { StoreContext } from "../../Context/Storecontext";
import { Navigate } from "react-router-dom";
 
function Navbar({setshowlogin}) {
    /*to create underline effect for the menu list we will use the state varialble */
    const [menu, setmenu] = useState('home')/*created a state variable & initialise it with home as default */
    const {getTotalCartAmount, token, settoken} = useContext(StoreContext)

    const user = JSON.parse(localStorage.getItem("currentuser"))

    //to capitalise first letter of the user name
    const capitalisefirstletter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1)
      }

    
    
    
    //creating the funtionality for userlogout that when the user clicks logout the localstorage will be deleted
    const logout = () => {
        localStorage.removeItem('currentuser');
        settoken('')
        window.location.href = '/'
        
    }
    

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
                {/*we will add one turnary operator here to check if token exists and if it does we will display the username and the profile icon*/}
                {!token ?  <button onClick={()=>{setshowlogin(true)}}>Sign in</button>
                 : <div className="navbar-profile"> {/*div that will dispaly if token exists */}
                        <div className="profile-details">
                            <img src={assets.profile_icon} alt=""/><span>{capitalisefirstletter(user.name)}</span>
                        </div>
                       <ul className="nav-profile-dropdown">
                            <Link to="/myorders"><li><img src={assets.bag_icon} alt="" /><p>Orders</p></li></Link>
                            <hr />
                            <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
                       </ul>
                   </div>}
                {/*so if token is not available we will provide that sign in button but if token is available then we will add the icon */}

               
			</div>
            
		</div>
	);
}

export default Navbar;
