import {Router} from "express"
import { registerUser,userHey } from "../controllers/user.controllers"
// import {upload} from "../middlewares/multer.middleware.js"

const router= Router()

// router.route("/register").post(
//     upload.fields([
//         {
//             name:"avatar",
//             maxCount: 1
//         },
//         {
//             name:"coverImage",
//             maxCount:1
//         }
//     ]),
//     registerUser)

// router.route("/hey").get(
//     res.send(hello)
// )    


// export default router

// router.route("/register").post(registerUser)
// router.route("/hello").post(userHey)

router.post("/register", registerUser)
router.post("/hello", userHey)

export default router

