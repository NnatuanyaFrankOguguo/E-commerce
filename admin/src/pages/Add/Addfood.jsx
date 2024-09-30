import React, { useState } from 'react'
import './Addfood.css'
import { assets } from '../../../admin_assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

const Addfood = ({serverUrl}) => { //destructure the data being sent
    

// to add the functionality that will enable us store the image in the upload and view are in the src upload area
    const [image, setimage] = useState(false)
    const [data, setdata] = useState({
        name: "",
        description: "",
        price: "",
        category: "", //default category as salad bcos its in the first option in the select element

    })


    const onChangeHandler = (event) => { //on which input field we will update, that event will be added in this function parameter 
        //from this event we will have to find the event name and value so will just write
        const name = event.target.name
        const value = event.target.value //it will extract the value

        setdata(prev=>({...prev,[name]:value}))
        /*setdata is a function typically provided by the useState hook in React. It's used to update the state of a component.
        The prev argument represents the previous state of the data object.
        ...prev spreads the previous state to ensure that all existing properties of the state object are retained.
        [name]: value is a computed property. It dynamically sets the property in the data object corresponding to the input field's name and assigns it the new value.
        This ensures that when the user types into any input field, only the corresponding field's value is updated in the state without overwriting other fields. */
    }

    //TO CHECK IF OUR DATA IS GETTING UPDATED WE WILL CREATE ONE USEEFFECT HOOK
    // useEffect(()=>{
    //     console.log(data)
    // }, [data]) //so each time our data is being updated the function inside will be executed clg

    //NOW THAT WE HAVE THE DATA FOR ALL THE FORMS LETS DO THE API CALL on the button
    const onSubmitHandler = async(event) => {
        event.preventDefault()
        //now to append all those state object variables into a new form data
        const formData = new FormData();
        //now we have to insert all the data one by one
        formData.append("name",data.name)
        formData.append("description",data.description)
        formData.append("price",Number(data.price))//we store this price value as Number in the backend now we have to convert it to number bcos its string
        formData.append("category",data.category)
        formData.append("image",image)
        //next to send the formData on our endpoint

       
        try {
             //response where we will store the response from the server
            const response = await axios.post(`${serverUrl}/api/foods/addfood`, formData) //sending all the input field data as body
            console.log(formData)
            //emptying the object state vairable after the form has been sent
            setdata({
                name: "",
                description: "",
                price: "",
                category: "Salad" })
            setimage(false)
            toast.success(response.data.message) /*response.data.message where we added the successful message that will be sent to the frontend in the backend foodcontroller */
        } catch (error) {
            console.log(error)  
            toast.error(error.response.data.message)  /* likewise here too response.data.message where we added the error message that will be sent to the frontend in the backend foodcontroller */
        }

    }




  return (
    <div className='add'>

        <form className='flex-col' onSubmit={onSubmitHandler}>

            <div className="add-img-upload- flex-col">
                <p>Upload Image</p>
                <label htmlFor='image'>{/*to upload image from file */}
                    <img src={image? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    {/*using the URL.createObjectUrl to make an image url display of the state variable image if true but if false to show the upload area */}
                </label>
                <input onChange={(e)=>setimage(e.target.files[0])} type='file' id='image' hidden required/>
                {/*the onchange function listening to an e event that when the it changes(a file being added it should save it to the state variable) */}
            </div>

            <div className='add-product-name flex-col'>
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
                {/*dynamically updating the input value to datastate variable */}
            </div>

            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder='Write content here' required></textarea>
            </div>

            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler} name='category' defaultValue=''>
                        <option disabled value="Select One">Select One</option>
                        <option value="Salad" >Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>

                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='₦35' />
                    {/*dynamically updating the input value to datastate variable */}
                </div>
            </div>

            <button type='submit' className='add-btn' >ADD</button>

        </form>
    
    </div>
  )
}

export default Addfood
