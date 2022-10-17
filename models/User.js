import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique: true
    },
    email:{
        type:String,
        unique: true
    },
    
    img:{
        type:String,
        default: "https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png"
    },
    phone:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default: false
    }
},{timestamps:true})

export default mongoose.model("User", UserSchema);