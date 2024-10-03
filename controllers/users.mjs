import { User } from "../model/users.mjs";
import cloudinary from "../cloudinary.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { CustomError, errorCapture } from "../error.mjs";

const UserSignup = errorCapture(async (req, res, next) => {
  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "clodinary_folder_name",
  });

  const { name, email, password, phone, address } = req.body;

  const hashPass = await bcrypt.hash(password, 10);

  const user = new User({
    name,
    email,
    password: hashPass,
    phone,
    address,
    image: result.secure_url,
    public_id: result.public_id,
  });
  await user.save();
  if (user) {
    return res.send({ msg: "user created succesfully", user });
  }
  throw new CustomError(null, 403, "user not created ");
});

const UserLogin = errorCapture(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new CustomError(null, 404, "user not found");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new CustomError(null, 401, "Password is Wrong");
  }

  const jwtToken = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      image: user.image,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.send({ msg: "Login Successfull", jwtToken });
});

const GetAllUser = errorCapture(async (req, res) => {
  const user = await User.find().select("-password");
  if (!user) {
    throw new CustomError(null, 404, "user not found");
  }
  res.send({ msg: "Get All User Success", user });
});

const UserProfile = errorCapture(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    throw new CustomError(null, 404, "user not found");
  }
  res.send({ msg: "User Profile Successfull", user });
});

const ProfileDelete = errorCapture(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    throw new CustomError(null, 404, "user not found");
  }
  res.json({ msg: "profile delete success", user });
});

const ProfileUpdate = errorCapture(async (req, res) => {
  const user = await User.findById({ _id: req.params.id });

  if (!user) {
    throw new CustomError(null, 404, "user not found");
  }

  if (req.file) {
    const del = await cloudinary.uploader.destroy(user.public_id, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("delete image successfully");
      }
    });
  }

  const newImg = await cloudinary.uploader.upload(req.file.path, {
    folder: "cloudinary_image_name",
  });

  const data = await User.findByIdAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      image: newImg.secure_url,
      public_id: newImg.public_id,
    }
  ).select("-password -email -role");
  res.json({ msg: "User Profile Update Successfull", data });
});

export {
  UserSignup,
  UserLogin,
  GetAllUser,
  UserProfile,
  ProfileDelete,
  ProfileUpdate,
};
