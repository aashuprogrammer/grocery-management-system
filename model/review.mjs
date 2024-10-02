import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "users",
    select: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  massage:{
    type:String,
    required:true
  },
  created_at:{
    type:Date,
    default:Date.now(),
    required:true
  }
});

const Review = mongoose.model('reviews',reviewSchema)
export {Review}
