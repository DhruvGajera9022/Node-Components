const express = require("express");
const logger = require("./logger");
const morgan = require("morgan");

const app = express();
const port = 3003;

const morganFormat = ':method :url :status :response-time ms';

app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3],
            };
            logger.info(JSON.stringify(logObject));
        }
    }
}))

app.get("/", (req, res) => {
    logger.info("Home endpoint hit...");
    logger.warn("Home endpoint warning...");
    logger.error("Home endpoint error...");
    logger.debug("Home endpoint debug...");
    res.send("Hello");
});


app.listen(port, () => logger.info(`Server started at ${port}`))