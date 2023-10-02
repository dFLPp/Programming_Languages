//Adicionando/enchendo a database com dados

require("dotenv").config()
const connectDB = require("./db/connectDB");
const productSchema = require("./models/productSchema");
const productsDS = require("./productsDS.json");

const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI);
        await productSchema.deleteMany();
        await productSchema.create(productsDS);
        console.log("connected...")
        process.exit(0);
    } catch (error) {
       console.log(error);
       process.exit(1);
    }
}

start()