import { Router } from "express";
import { getUserChannelProfile, getWatchHistory, registerUser, updateAccountDetails } from "../controllers/user.controllers.js";
// import {verifyJwt} from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js";
// import { verify } from "jsonwebtoken";

const router = Router();

//fields return array

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    // {
    //   name: "coverImage",
    //   maxCount: 1,
    // },
  ]),
  registerUser
);


// router.route("/change-password").post(verifyJwt, changeCurrentPassword)
// router.route("/current-user").get(verifyJWT, getCurrentUser)
// router.route("/update-account").patch(verifyJWT, updateAccountDetails)
// router.route("/avatar").patch(verifyJWT, upload.single("avatar", updateUserAvatar))
// router.route("/coverImage").patch(verifyJWT, upload.single("coverImage", updateUserCoverImage))
// router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
// router.route("/history").get(verifyJWT, getWatchHistory)

export default router;

