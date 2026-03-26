import { Router } from "express"
import { 
     changeCurrentPassword,
     getCurrentUser, 
     getUserChannelProfile, 
     getWatchHistory, 
     loginUser, 
     logoutUser, 
     refreshAccessToken, 
     registerUser, 
     updateAccountDetails, 
     updateUserAvatar, 
     updateUserCoverImage 
    } from "../controllers/user.controllers.js"
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

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

router.route("/login").post(loginUser)

//secured routes - user is logged in already
//verifyJWT is middleware here
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
//patch = only a signle object is changing
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/cover-image").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
//taking output from params
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)







export default router 

