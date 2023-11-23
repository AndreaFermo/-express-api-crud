const express = require("express");
const dotenv = require("dotenv").config();
const postsRouter = require("./routers/posts");
const routeNotFoundMiddleware = require("./middlewares/routeNotFound");
const errorsFormatterMiddleware = require("./middlewares/errorsFormatter");

const app = express();

app.use(express.json());

app.use("/posts", postsRouter);

app.use(errorsFormatterMiddleware);

app.use(routeNotFoundMiddleware);

app.listen(process.env.PORT || 3000, () => {
    console.log(`App listening on port http://localhost:${process.env.PORT}`)
})