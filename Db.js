import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const Connect = async ()=>{
    try {
        await mongoose.connect(process.env.Mongodb
            // {
            //     useNewUrlParser: true,
            //     useUnifiedTopology: true,
            //     //useCreateIndex: true,
            // }
            )
        .then(()=>{
            console.log("MongoDB Connected Successfully");
            
        })
        
        
    } catch (error) {
        console.log(error);
    }

}

export default Connect