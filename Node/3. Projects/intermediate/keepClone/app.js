require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");


const connectDB = require("./db/connectDB");
const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorHandlerMiddleware = require("./middleware/errorMiddleware");
const authMiddleware = require("./middleware/authMiddleware");

const authRouter = require("./routers/authRouter");
const noteRouter = require("./routers/noteRouter");

app.use(express.static("./public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set("trust proxy", 1);
app.use(rateLimiter({ windowMS: 15 * 60 * 1000, max: 100 }))
app.use(helmet());
app.use(cors());
app.use(xss());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/notes", authMiddleware, noteRouter);


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI)
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
};
  
start();