import React, { useContext } from 'react'
import './Fooddisplay.css'
import { StoreContext } from '../../Context/Storecontext'
import Fooditem from '../Fooditem/Fooditem'
import Loader from '../LoadSucces/Loader'

const Fooddisplay = ({category}) => {
// now we are getting the food list array using the context Api using REACT useContext
    const {food_list, loading} = useContext(StoreContext)
    

  return (
    <>
        {loading && (<Loader /> )} {/* the conditions is if loading is equal to true show loading component*/}
        <div className='food-display' id='food-display'>
            <h2>Top Dishes Near You</h2>
            <div className="food-display-list">
                {food_list.map((item,index)=>{ /*getting the foods one by one from the food_list as item  */
                    if(category==='All' || category === item.category) {
                        return (
                            <Fooditem key={index} id={item._id} name={item.name} description={item.description} price={item.price}
                            image={item.image} /> /*passing data on the food object as props and recieve them on the component folder through destructing */
                        ) 
                    }
                })}
            </div>
        </div>
    </>
  )
}

export default Fooddisplay
