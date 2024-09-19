import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/Storecontext'

function Cart() {
//first we will accessed our cart items, foodlists, removefromcart functionality, from our context
    const {cartitems, food_list, removeFromcart} = useContext(StoreContext)


  return (
    <div className='cart'>
        <div className="cart-items">

            <div className="cart-items-title">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <br />
            <hr />
            {/*(index,number of the array) below we will get all the foods one by one from the food_list as ITEM AND after that we will compare our cartitem and foodITEM if that foodITEM is 
            available in the cartitem then we will display it in the cartpage */}
            {food_list.map((item,index)=>{ 
                if(cartitems[item._id] > 0) { {/*the logic is if this cartitems(object) contains one product with this item._id as key in the object which means its greater than zero in than case we will return one div*/}
                    return (
                        <div className="cart-items-title cart-items-item">
                            <p>{item.name}</p>{/*the name of the product being clicked thats added to the cartitems object */}
                        </div>
                    )
                }
            })}


        </div>
      
    </div>
  )
}

export default Cart
