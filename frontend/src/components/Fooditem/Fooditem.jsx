import React, { useContext } from 'react'
import './Fooditem.css'
import { assets } from '../../../frontend_assets/assets'
import { StoreContext } from '../../Context/Storecontext'

const Fooditem = ({id, name, price, description, image}) => { /*just like that my other project roomscreen using the Room component */
// we will now create one add button using that we will add the food item into our cart
    //const [itemcount, setitemcount] = useState(0) //default value to 0(initialise it 0)
    // so we will get the access of cartitems, addtocart, removefromcart
    const {cartitems, addTocart, removeFromcart} = useContext(StoreContext)

    // we will do some changes where we have itemcount(cartitems(id)), setitemcount + 1(addtoCart), setitemcount -1(removefromcart)
    // we did itemcount as practice to check if it works not originally using the cart 

//AFTER CHANGING EVERYTHING WE WILL GO BACK TO STORECONTEXT FILE AND ADD USEEFFECT HOOK

    return (
    <div className='food-item'>
        <div className="food-item-img-container">
            <img className="food-item-image" src={image} alt="" />
            {/*adding turnary operator: checking if our fooditem count(cart) is zero in that case we will provide one add button(img)
            but if the count is greater than zero in that case we will provide onecounter(div) we will provide one counter */
              /*itemcount*/!cartitems[id] ? <img className='add' onClick={()=>/*setitemcount(prev=>prev + 1)*/addTocart(id)} src={assets.add_icon_white} alt=''/> : 
              <div className="food-item-counter"><img onClick={()=> /*{setitemcount(prev=>prev - 1)}*/ removeFromcart(id)} src={assets.remove_icon_red} alt=''/> <p>{/*itemcount*/cartitems[id]}</p> <img onClick={()=> /*{setitemcount(prev=> prev + 1)}*/addTocart(id)} src={assets.add_icon_green} /></div>

            }
        </div>

        <div className="food-item-info">
            <div className="food-item-name-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>

            <p className="food-item-description">
                {description}
            </p>

            <p className="food-item-price">
                ₦{price}
            </p>
        </div>
      
    </div>
  )
}

export default Fooditem

