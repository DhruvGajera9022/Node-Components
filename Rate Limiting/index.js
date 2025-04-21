import express from "express";
import { rateLimit } from "express-rate-limit";

const app = express();
const port = 3001;

app.use(express.json());

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    limit: 5,
    message: "Too many requests. Please try after some time (1 min)",
    standardHeaders: "draft-8",
    legacyHeaders: false,
    validate: true
})

app.use(limiter);

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(port, () => console.log(`Server running on port ${port}`));
