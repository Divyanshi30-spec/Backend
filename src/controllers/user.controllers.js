import {asyncHandler} from "../utils/asyncHandler.js"
// import {ApiError} from "../utils/ApiError.js"
// import {user} from "../models/user.model.js"
// import {uploadOnCloudinary} from "../utils/cloudinary.js"
// import { ApiResponse } from "../utils/ApiResponse.js"

// const registerUser= asyncHandler(async (removeEventListener,res)=>{
//     //1.get user details from frontend
//     //2.validation - not empty
    //3.check if user already exists: username, email
    //4.check for images, check for avatar
    //5.upload them to cloudinary
    //6.create user object - create entry in db
    //7.remove password and refresh token fiekd from response
    //8.check for user creation
    //return res


// //1. if data comes from form then it will found in req.body
//     // const {fullName, email, username, password} = req.body
//     // console.log("email", email);


// //2. 
// if(
//     [fullName , email, username, password].some((field)=>
//         field?.trim() === "")
//     ){
//         throw new APiError(400, "All fields are required")

//     }

    
// //3 check that user already exists or not
//     const  existedUser= User.findOne({
//            $or : [{username},{email}]
//         })
//     if (existedUser){
//         throw new ApiError(409,"User with email or username already exists")
//     }
     

// //4 check for images and avatar   
//     const avatarLocalpath= req.files?.avatar[0]?.path
//     const coverImageLocalpath = req.files?.coverImage[0]?.path;

//     if (!avatarLocalpath){
//         throw new ApiError(400,"Avatar file is required")
//     }

//     const avatar= await uploadOnCloudinary(avatarLocalpath)
//     const coverImage = await uploadOnCloudinary(coverImageLocalpath)
    
//     if (!avatar){
//         throw new ApiError(400, "Avatar file is required")
//     }
    

//     //6.
//     const user = await User.create({
//         fullName,
//         avatar: avatar.url,
//         coverImage: coverImage?.url ||  " ",
//         email,
//         password,
//         username
//     })

//     createdUser=await User.findById(user._id).select(
//         "-password -refreshToken"
//     )

//     if(!createdUser){
//         throw new ApiError(500, "Something went wrong while registering the user")
//     }
//     return res.status(201).json(
//         new ApiResponse(200, createdUser , " User registered Successfully")

//     )
// }) 


// export {registerUser}

const registerUser = asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"OK"
    })
})


const userHey= asyncHandler(async (req,res)=>{
      res.json({
        message:"successful"
      })
})


export {
    registerUser,
    userHey,
}

