import mongoose from "mongoose";

const fileUploadSchema = new mongoose.Schema({
  file_url: {
    type: String,
    require: true,
  },
  create_at: { type: Date, default: Date.now(), required: true },
});

const uploadImage = mongoose.model("uploadImage", fileUploadSchema);

export default uploadImage;
