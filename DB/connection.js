import mongoose from "mongoose";



const connectDB = async() => {

    return await mongoose.connect(process.env.DB_CONNECTION).then(result => {

    console.log('Connected...');
    
    }).catch(error => {
        console.log(`Error connecting to database .. ${error}`);
    });
}

export default connectDB;