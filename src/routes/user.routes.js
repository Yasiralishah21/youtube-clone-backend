import { Router } from "express"
import { registerUser } from "../controllers/user.controllers.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/register").post(
    //now we can send images, this upoad is from multer.
    upload.fields([
        {
            name: "avatar",
            maxCount : 1
        },
        {
            name: "coverImage",
            maxCount : 1
        }
    ]),
    registerUser)

export default router 