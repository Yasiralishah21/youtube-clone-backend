const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
        .resolve(requestHandler(req, res, next))  //if promised succeed 
        .catch(err => next)                       //if promise failed then do this
    }
}

export { asyncHandler }

// HOC
// there are bascally 4 parameters we can pass (err, req, res, next next is used for middlewares)
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success : false,
//             message : err.message
//         })
//     }
// }


// THIS ABOVE ONE IS TRY CATCH METHOD
// TO DEVELOP THIS EXACT SAME IN PROMISE METHOD, IT IS DONW IN START AT TOP