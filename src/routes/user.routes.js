import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";

import { upload } from "../middlewares/multer.middleware.js";

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

// export default router

// router.route("/register").post(registerUser)
// router.route("/hello").post(userHey)

// router.post("/register", registerUser);

export default router;
