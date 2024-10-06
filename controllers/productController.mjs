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
      description: req.body.description,
      productTag_id: req.body.productTag_id,
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
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw new BadRequestError("product not found");
    }
    let myCloud;
    if (req.file) {
      if (product.public_id) {
        const { result } = await cloudinary.uploader.destroy(variant.public_id);
        if (result !== "ok") {
          throw new Error("Failed to delete old image.Try again later.");
        }
      }
      myCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "imageUploader",
      });
    }
    const productUpdateData = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
      productTag_id: req.body.productTag_id,
    };
    if (myCloud) {
      productUpdateData.img = myCloud.secure_url;
      productUpdateData.public_id = myCloud.public_id;
    }
    const upProduct = await Product.findByIdAndUpdate(
      req.params.id,
      productUpdateData,
      { new: true }
    );
    res.json({
      upProduct: upProduct,
      message: "Product Updated",
    });
  } catch (err) {
    res.json({ error: err.message });
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
