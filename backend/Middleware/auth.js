import jwt from 'jsonwebtoken'

const authMiddleware = async(req, res, next) => {//taking a callback function next as parameter
    //first we will take the token from the users using the headers
    //then we will destructure the token from the request.header so we write
    const {token} = req.headers;
    //we will check if we got the token or not
    if(!token){
        return res.status(500).json({ success: false, message: 'Not Authorised Login Again' }); //this is how we will be sending our error message to the frontend
    }
    //decode the token if its there
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);//after that our token will be decoded
        //so when we decode the token we will get that user.id we use to create the at first
        req.body.userId = token_decode.id;
        //we will now call the callback function
        next();

    } catch (error) {
        console.log(error)
        return res.status(500).json({ success: false, message: 'Error' }); //this is how we will be sending our error message to the frontend

    }

    //so this middleware will basically take the token and convert it in the user ID and using that userid we can add, remove or
    //get the data from the cart, so first we will add the add to cart functionality using that we can add the data in the cart

}

export default authMiddleware;

//to connect it with the cartRoute