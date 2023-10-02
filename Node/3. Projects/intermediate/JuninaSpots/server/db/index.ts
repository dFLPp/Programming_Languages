import {connect} from 'mongoose'

const connectDB = async() => {
    try {
        const connection = await connect(`${process.env.MONGO_URI}`);
        console.log('mongo was connected');
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB