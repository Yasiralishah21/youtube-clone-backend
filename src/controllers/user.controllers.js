import { asyncHandler } from "../utils/asyncHandler.js"

//register a user
const registerUser = asyncHandler (async (req, res) => {
    res.status(200).json({
        message: "registerd user"
    })
})

export {registerUser,}