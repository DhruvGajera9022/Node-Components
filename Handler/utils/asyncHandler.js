// Async handler using Promise
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise
            .resolve(requestHandler(req, res, next))
            .catch((err) => next(err))
    }
}

// Async handler using Try Catch
// const asyncHandler = (fn) = async (req, res, next) => {
//     try {
//         fn(req, res, next);
//     } catch (error) {
//         res.status(error.code).json({
//             success: false,
//             message: error.message
//         })
//     }
// }

module.exports = asyncHandler;