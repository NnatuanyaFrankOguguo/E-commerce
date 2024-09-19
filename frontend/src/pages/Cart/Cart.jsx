import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/Storecontext'
import { useNavigate } from 'react-router-dom'

function Cart() {
//first we will accessed our cart items, foodlists, removefromcart functionality, from our context
    const {cartitems, food_list, removeFromcart, getTotalCartAmount} = useContext(StoreContext)

    const navigate = useNavigate()

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
                if(cartitems[item._id] > 0) { {/*the logic is if this cartitems(object) contains one or more product with this item._id as key in the object which means its greater than zero in than case we will return one div*/}
                    return (
                        <div>
                            <div className="cart-items-title cart-items-item">
                                <img src={item.image} alt="" />{/*to display the product being clicked thats added to the cartitems object */}
                                <p>{item.name}</p>
                                <p>₦{item.price}</p>
                                <p className='quantity'>{cartitems[item._id]}</p>
                                <p>₦{item.price*cartitems[item._id]}</p>
                                <p onClick={()=>{removeFromcart(item._id)}} className='cross'>X</p>
                            </div>
                            <hr />
                        </div>
                    )
                }
                
            })}

            {getTotalCartAmount()===0?<div style={{textAlign: 'center', marginTop: '10px'}}><h3>Your Cart Is Empty</h3> </div>: ''}

        </div>
        
        <div className='cart-bottom'>
            <div className="cart-total">

                <h2>Cart Totals</h2>

                <div>
                    <div className="cart-total-details">
                        <p>Subtotal</p>
                        <p>₦{getTotalCartAmount()}</p>
                    </div>
                    <hr />

                    <div className="cart-total-details">
                        <p>Delivery Fee</p>
                        <p>₦{getTotalCartAmount()===0?0:5}</p>
                    </div>
                    <hr />

                    <div className="cart-total-details">
                        <b>Total</b>
                        <b>₦{getTotalCartAmount()===0?0 :getTotalCartAmount() + 5}</b>
                    </div>
                    
                </div>
                <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
            </div>

            <div className="cart-promocode">
                <div>
                    <p>If you have have a promo code, Enter it here</p>

                    <div >
                        <form className='cart-promocode-input' action="">
                            <input type='text' placeholder='Promo Code' />
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Cart
