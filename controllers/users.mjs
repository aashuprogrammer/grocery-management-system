import { User } from "../model/users.mjs";
import cloudinary from "../cloudinary.mjs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserSignup = async (req, res) => {
  try {
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

    res.status(200).json({ msg: "User created successfully", user });
  } catch (error) {
    res.status(409).json({ msg: "This Email Already Exists" });
  }
};

const UserLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ msg: "email is wrong" });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ msg: "Password is Wrong" });
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

    res.status(200).json({ msg: "Login Successfull", jwtToken });
  } catch (error) {
    res.send(error);
  }
};

const GetAllUser = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({ msg: "Get All User Success", user });
  } catch (error) {
    res.json(error);
  }
};

const UserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.status(200).json({ msg: "User Profile Successfull", user });
  } catch (error) {
    res.json(error);
  }
};

const ProfileDelete = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User Not Exists" });
    }
    res.json({ msg: "profile delete success", user });
  } catch (error) {
    res.send(error);
  }
};

const ProfileUpdate = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });

    if (req.file) {
      const del = await cloudinary.uploader.destroy(user.public_id, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("delete image successfully");
        }
      });
    }

    const newImg = await cloudinary.uploader.upload(req.file.path);

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
  } catch (error) {
    res.json(error);
  }
};

export {
  UserSignup,
  UserLogin,
  GetAllUser,
  UserProfile,
  ProfileDelete,
  ProfileUpdate,
};
