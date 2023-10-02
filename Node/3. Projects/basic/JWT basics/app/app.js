//Basic setup for express
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const mainRouter = require("./Router/mainRouter");

const customErrorMiddleware = require("./Middleware/customErrorMiddleware");
const notFindMiddleware = require("./Middleware/notFindMiddleware");

//aplicando os middlewares
app.use(express.static("./public"))
app.use(express.json());
app.use("/api/v1", mainRouter);
app.use(customErrorMiddleware);
app.use(notFindMiddleware);

const port = process.env.PORT || 3000
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  } catch (error) {
    console.log("Cannot connect to dataBase")
  }
}
start()





