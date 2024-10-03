import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    enum:['customer','admin'],
    default:'customer',
    required:true
  },
  address: {
    type: String,
    required: true,
  },
  public_id:{
    type:String,
  },
  created_at: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

const User = mongoose.model("users", userSchema);
export { User };
