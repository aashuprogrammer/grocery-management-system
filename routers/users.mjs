import express from "express";
import {
  GetAllUser,
  ProfileDelete,
  ProfileUpdate,
  UserLogin,
  UserProfile,
  UserSignup,
} from "../controllers/users.mjs";
import { upload } from "../middleware/multer.mjs";

const userRoute = express.Router();

userRoute.post("/signup", upload.single("image"), UserSignup);
userRoute.post("/login", UserLogin);
userRoute.get("/get_all_users", GetAllUser);
userRoute.get("/profile/:id", UserProfile);
userRoute.patch("/profile_update/:id", ProfileUpdate);
userRoute.delete("/profile_delete/:id", ProfileDelete);
export { userRoute };
