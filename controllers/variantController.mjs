import Variant from "../model/variant.mjs";
import cloudinary from "../imageUploader/imageUpload.mjs";

const createVariant = async (req, res) => {
  try {
    const imgresult = await cloudinary.uploader.upload(req.file.path, {
      folder: "imageUploder",
    });
    const creVariant = await Variant.create({
      product_id: req.body.product_id,
      name: req.body.name,
      title: req.body.title,
      price: req.body.price,
      discount: req.body.discount,
      description: req.body.description,
      quantity: req.body.quantity,
      img: imgresult.secure_url,
      public_id: imgresult.public_id,
    })
      .then((v) => {
        res.json({
          creVariant: v,
          message: "Create Variant",
        });
      })
      .catch((err) => {
        return res.json(err);
      });
  } catch (err) {
    res.json(err);
  }
};

const getVariant = async (req, res) => {
  try {
    const GetVariant = await Variant.findById(req.body.id);
    res.json({
      GetVariant: GetVariant,
      message: "Get Variant",
    });
  } catch (err) {
    res.json(err);
  }
};

const getAllVariant = async (req, res) => {
  try {
    const allVariant = await Variant.find(req.body);
    res.json({
      allVariant: allVariant,
      message: "Get All Variant",
    });
  } catch (err) {
    res.json(err);
  }
};

// const updateVariant = async (req, res) => {
//   try {
//     const upVariant = await Variant.findByIdAndUpdate(req.params.id, {
//       product_id: req.body.product_id,
//       name: req.body.name,
//       title: req.body.title,
//       price: req.body.price,
//       discount: req.body.discount,
//       description: req.body.description,
//       quantity: req.body.quantity,
//       img: myCloud.secure_url,
//       public_id: myCloud.public_id,
//     });
//     const { result } = await cloudinary.v2.uploader.destroy(public_id);
//     if (result === "not found")
//       throw new BadRequestError("Please provide correct public_id");
//     if (result !== "ok") throw new Error("Try again later.");
//     const myCloud = await cloudinary.v2.uploader.upload(req.file.img, {
//       public_id: req.public_id,
//     });
//     console.log(myCloud);
//     res.json({
//       upVariant: upVariant,
//       message: "Vaniant Update",
//     });
//   } catch (err) {
//     res.json(err);
//   }
// };

const updateVariant = async (req, res) => {
  try {
    const variant = await Variant.findById(req.params.id);
    if (!variant) {
      throw new BadRequestError("Variant not found");
    }

    let myCloud;
    if (req.file) {
      // Delete the old image if it exists
      if (variant.public_id) {
        const { result } = await cloudinary.uploader.destroy(variant.public_id);
        if (result !== "ok") {
          throw new Error("Failed to delete old image. Try again later.");
        }
      }

      // Upload the new image
      myCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "imageUploader", // You might want to organize your uploads in folders
      });
    }

    const updateData = {
      product_id: req.body.product_id,
      name: req.body.name,
      title: req.body.title,
      price: req.body.price,
      discount: req.body.discount,
      description: req.body.description,
      quantity: req.body.quantity,
    };

    // Only update image fields if a new image was uploaded
    if (myCloud) {
      updateData.img = myCloud.secure_url;
      updateData.public_id = myCloud.public_id;
    }

    const upVariant = await Variant.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json({
      upVariant: upVariant,
      message: "Variant Updated",
    });
  } catch (err) {
    res.json({ error: err.message });
  }
};

const deleteVariant = async (req, res) => {
  try {
    const deVariant = await Variant.findByIdAndDelete(req.params.id);
    res.json({
      deVariant: deVariant,
      message: "Delete variant",
    });
  } catch (err) {
    res.json(err);
  }
};
export {
  createVariant,
  getVariant,
  getAllVariant,
  updateVariant,
  deleteVariant,
};
