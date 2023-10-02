require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean")
const rateLimiter = require("express-rate-limit")

const connectDB = require("./db/connect");
const authMiddleware = require("./middleware/authentication");
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const authRouter = require("./routers/authRouter");
const jobsRouter = require("./routers/jobsRouter");

//pre/"functional" middlewares
//security layer (só precisamos instalar os packages, importar e usar eles como middlewares, Só)
app.set("trust proxy", 1);
app.use(rateLimiter({ windowMS: 15 * 60 * 1000, max: 100 }))
app.use(helmet());
app.use(cors());
app.use(xss());

app.use(express.json());

//Routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authMiddleware, jobsRouter); //Acesso à CRUD oeprations em jobs só se estiver autenticado


//cleaning/"details" middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

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
