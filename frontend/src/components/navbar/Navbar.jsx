import React, {useState} from "react";
import "./Navbar.css";
import { assets } from "../../../frontend_assets/assets";

function Navbar() {
    /*to create underline effect for the menu list we will use the state varialble */
    const [menu, setmenu] = useState('home')/*created a state variable & initialise it with home as default */
    


	return (
        /*see my long note */
		<div className="navbar">
			<img src={assets.logo} alt="" className="logo" />

			<ul className="navbar-menu">
				<li onClick={()=>setmenu("home")} className={menu==="home" ? "active" : ""}>Home</li>
				<li onClick={()=>setmenu("menu")} className={menu==="menu" ? "active" : ""}>Menu</li>
				<li onClick={()=>setmenu("mobile-app")} className={menu==="mobile-app" ? "active" : ""}>Mobile-app</li>
				<li onClick={()=>setmenu("contact-us")} className={menu==="contact-us" ? "active" : ""}>Contact Us</li>
			</ul>

			<div className="navbar-right">
				<img src={assets.search_icon} alt="" />

				<div className="navbar-search-icon">
                    <img src={assets.basket_icon} alt="" />

                    <div className="dot">
                        {/*we will design this as dot that whenever will be visual inside the basket 
                        that whenever we add product in this basket that dot will appear */}
                    </div>

                </div>

                <button>Sign in</button>
			</div>
            
		</div>
	);
}

export default Navbar;
