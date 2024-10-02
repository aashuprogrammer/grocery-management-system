import mongoose from "mongoose";

const TagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
});

const Tag = mongoose.model("tags", TagSchema);
export {Tag}