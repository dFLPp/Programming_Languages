//pre-reqs
require("dotenv").config()
require("express-async-errors")
const express = require("express");
const app = express();
const port = process.env.PORT || 5000
const connectDB = require("./db/connectDB");

//middlewares
const notFoundMiddleware = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error-handler")
const productsRouter = require("./routes/productsRouter");
const { connect } = require("mongoose");
app.use(express.json());

//Router
app.use('/api/v1/products', productsRouter);

//routes
app.get("/", (req, res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
})

//'util' middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//power-on
const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
        console.log(`Listening on ${port}`)
    })
    }
    catch(error){
        console.log(error)
    }
}
start()