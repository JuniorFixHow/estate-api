import mongoose from "mongoose";

const BuildingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
   
    desc:{
        type:String,
        required:true
    },
    rooms:{
        type:Number,
        required:true
    },
    photos:{
        type:[String]
    },
    buildingNumbers:[{number:Number, unavailableDates:{type:[Date]}}],
    
    
},
{timestamps:true}
);

export default mongoose.model("Building", BuildingSchema);