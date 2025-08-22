import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
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
  const { fullName, email, username, password } = req.body;
  console.log("email", email);

  // //2.
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // //3 check that user already exists or not
  const existedUser = User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // //4 check for images and avatar
  const avatarLocalpath = req.files?.avatar[0]?.path;
  const coverImageLocalpath = req.files?.coverImage[0]?.path;

  if (!avatarLocalpath) {
    throw new ApiError(400, "Avatar file is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalpath);
  const coverImage = await uploadOnCloudinary(coverImageLocalpath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //     //6.
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || " ",
    email,
    password,
    username: username.toLowerCase(),
  });

  createdUser = await User.findById(user._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, " User registered Successfully"));
});



const changeCurrentPassword= asyncHandler(async(req,res)=>{
  const {oldPassword, newPassword} = req.body

  const user=await User.findById(req.user?._id)
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)

  if(!isPasswordCorrect){
    throw new ApiError(400, "Invalid old password")
  }

    user.password= newPassword
    await user.save({validateBeforeSaver : false})
     return res.status(200).json(new ApiResponse(200, {}, "Password changed successfully"))



})

const getCurrentUser= asyncHandler(async(req,res)=>{
 return  res.status(200).json(200 , req.user, "current user fetched successfully")
})
  
const updateAccountDetails= asyncHandler(async(req,res)=>{
  const {fullName, email}= req.body

  if(!fullName || !email){
    throw new ApiError(400, "All fiedls are required")
  }

  const user= User.findByIdAndUpdate(
    req.user?._id,
    {
      $set:{           //set tells that mongdb updated operator. it updates the users email and fullName
        fullName,
        email:email
      }
    }, {new: true}  //new: true here tells mongoose to return the updated document, not the old one
  ).select("-password")   //delete the pass field from the returned user object for security reasons

    return res.
    status(200).
    json(new ApiError(200, user, "Account details updated successfully") )
})


const updateUserAvatar = asyncHandler(async(req,res)=>{
  const avatarLocalpath = req.file?.path
  if(!avatarLocalpath){
    throw new ApiError(400, "Avatar file is missing")
  }

  const avatar= await uploadOnCloudinary(avatarLocalpath)

  if(!avatar.url){
    throw new ApiError(400, "Error while uploading on avatar")
  }

  const user= await User.findByIdAndUpdate(
     req.user?._id,
     {
      $set:{
        avatar:avatar.url
      }
     },{new: true}
   ).select("-password")
    return res.
   status(200).
   json(new ApiResponse(200, user, "Avatar updated successfully"))
}) 


const updateUserCoverImage = asyncHandler(async(req,res)=>{
  const coverImageLocalpath = req.file?.path
  if(!coverImageLocalpath){
    throw new ApiError(400, "Cover image file is missing")
  }

  const coverImage= await uploadOnCloudinary(coverImageLocalpath)

  if(!coverImage.url){
    throw new ApiError(400, "Error while uploading on avatar")
  }

  const user= await User.findByIdAndUpdate(
     req.user?._id,
     {
      $set:{
       coverImage:coverImage.url
      }
     },{new: true}
   ).select("-password")
   return res.
   status(200).
   json(new ApiResponse(200, user, "Cover image updated successfully"))
}) 


export { registerUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage  
 };



















// OR
// const registerUser = asyncHandler(async(req,res)=>{
//        res.status(200).json({
//         message:"hey this a function of controller"
//        })
// }
