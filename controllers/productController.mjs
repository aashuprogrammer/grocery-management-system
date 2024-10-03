import Product from "../model/product.mjs";
import cloudinary from "../imageUploader/imageUpload.mjs";
const createProduct = async (req, res) => {
  try {
    const reuslt = await cloudinary.uploader.upload(req.file.path, {
      folder: "imageUploder",
    });
    const adminCreateProduct = await Product.create({
      name: req.body.name,
      title: req.body.title,
      discription: req.body.discription,
      img: reuslt.secure_url,
      public_id: reuslt.public_id,
    })

      .then((p) => {
        res.json({
          adminCreateProduct: p,
          message: "Product Carete",
        });
      })
      .catch((err) => {
        return res.json({
          error: err,
        });
      });
  } catch (err) {
    return res.json(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const gProtuct = await Product.findById(req.body.id);
    res.json({
      gProtuct: gProtuct,
      message: "Get a Product",
    });
  } catch (err) {
    res.json(err);
  }
};

const getAllProduct = async (req, res) => {
  try {
    const allProduct = await Product.find(req.body);
    res.json({
      allProduct: allProduct,
      message: "Get All Product ",
    });
  } catch (err) {
    res.json(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const upProduct = await Product.findByIdAndUpdate(req.params.id);
    const data = {
      name: req.body.name,
      title: req.body.title,
      img: reuslt.secure_url,
      discription: req.body.discription,
    };
    if (req.body.img !== "") {
      const imgId = upProduct.img.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }
      const newImage = await cloudinary.uploader.upload(req.body.img, {
        folder: "imageUploder",
        width: "1000",
        crop: "scale",
      });
      data.img = {
        public_id: newImage.public_id,
        img: newImage.secure_url,
      };
    }
    res.json({
      upProduct: upProduct,
      message: "Product Update",
    });
  } catch (err) {
    res.json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deProduct = await Product.findByIdAndDelete(req.params.id);
    cloudinary.uploader.destroy(imageName, (err, reuslt) => {
      console.log(err, reuslt);
    });
    res.json({
      deProduct: deProduct,
      message: "Product Deleted",
    });
  } catch (err) {
    res.json(err);
  }
};

export {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
