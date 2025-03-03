const express = require("express");
const asyncHandler = require("./utils/asyncHandler");
const ApiError = require("./utils/errorHandler");
const ApiResponse = require("./utils/responseHandler");

const app = express();
const port = 3004;


// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
        });
    }

    // Fallback for unexpected errors
    return res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
});


// Normal route that wrapped through asyncHandler
app.get("/", asyncHandler((req, res) => {
    console.log("Main endpoint hit...");
}));


// This route throw the ApiError with asyncHandler
app.get("/protected", asyncHandler((req, res) => {
    const isAuthorized = true;
    if (isAuthorized) {
        throw new ApiError(401, "Unauthorized access");
    }
    res.json({ message: "Welcome to the protected route!" });
}));

app.get("/response", asyncHandler((req, res, next) => {
    const users = [
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
    ];
    return res.json(new ApiResponse(200, "Users fetched successfully", users));
}));


app.listen(port, () => console.log(`Server started at ${port}`))