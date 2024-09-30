import express from 'express'
import { addFood, listFood, removeFood } from '../Controllers/Foodcontroller.js'
import multer from 'multer'
// with multer we will create the image storage system

const foodRouter = express.Router(); //the router package that has does the API like AXIOS in frontend

//now we will add the logic that the image sent from the frontend as part of the room details we will be added to the upload folder
//image storage engine
const storage = multer.diskStorage({
    destination: "Uploads",
    filename: (req,file,cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
/*so the parameterss will be request, file and CallBack. then we will return the callback function(null), using the `` to add unique name for each image being uploaded
by adding the date it was upload plus the name*/

//now to use the storage configuration.... now this middleware upload has created using tht we can store the image in the upload folder 
const upload = multer({storage:storage})


//we use POST request to send data to the on the data.. and after that our data will be processed and we will get a response back to the frontend
//now on this route we will add the middleware on this route... that after the endpoint. the image will be saved then the addfood(which the logic is in the controller folder)
foodRouter.post('/addfood',upload.single('image'), addFood) /*we will use the addFood controller section that we have added here */

foodRouter.get('/getallfoods', listFood)

foodRouter.post('/removefood', removeFood)



export default foodRouter

//after adding the APIname here in the routes then go to the server.js to set it up to the API endpoint
// like this api/apiname/apiendpoint