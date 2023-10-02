//requirements
const connectDB = require("./db/connect");
const express = require("express");
const  taskRouter  = require("./Router/taskRouter");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler")
require("dotenv").config()

const app = express();
const port = process.env.PORT || 3000;

//middlewares
    app.use(express.json());
    //router
    app.use('/api/v1/tasks', taskRouter);
    //static files
    app.use(express.static("./public"));
    //missing route middleware
    app.use(notFound);
    //custom error handler middleware
    app.use(errorHandler);

//Routes
//Nenhuma (só precisamos do root, que já é detectado no middleware "static")

//connect db
const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI);
        //if conected, start server
        app.listen(port, () => {
            console.log("Live in port 3000")
        })
    }
    catch(err){
        console.log(err)
    }
}

start();