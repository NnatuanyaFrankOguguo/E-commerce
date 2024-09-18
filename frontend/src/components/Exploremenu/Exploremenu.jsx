import React from 'react'
import './Exploremenu.css'
/*importing the array from the asset.js that was exported in the asset folder */
import { menu_list } from '../../../frontend_assets/assets'

function Exploremenu({category, setcategory}) {/*receiving the values here */
  return (
    <div className='explore-menu' id='explore-menu'>
        
        <h1>Explore Our Menu</h1>

        <p className='explore-menu-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur doloremque est nulla debitis, dolor non ex, laudantium neque possimus unde a facilis aut nostrum officiis, maiores vel cum dignissimos porro! Nihil.</p>

        <div className="explore-menu-list">
            {menu_list.map((item,index) => {return (/*look in note for explanation */
                <div onClick={()=> setcategory(prev=>prev===item.menu_name ? 'All' : item.menu_name)}   className="explore-menu-list-item">
                    <img className={category===item.menu_name ? 'active' : ''} src={item.menu_image} alt="" />
                    <p>{item.menu_name}</p>
                </div>
            )})}
        </div>

        <hr/>
    </div>
  )
}

export default Exploremenu
