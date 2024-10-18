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
      return res.json({ error: "Product not found" });
    }

    let myCloud;
    if (req.file) {
      // Delete the old image if it exists
      if (product.public_id) {
        const { result } = await cloudinary.uploader.destroy(product.public_id);
        if (result !== "ok") {
          throw new Error("Failed to delete old image. Try again later.");
        }
      }

      // Upload the new image
      myCloud = await cloudinary.uploader.upload(req.file.path, {
        folder: "imageUploader",
      });
    }

    const productUpdateData = {
      name: req.body.name,
      title: req.body.title,
      description: req.body.description,
    };

    // Only update image fields if a new image was uploaded
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

// const deleteProduct = async (req, res) => {
//   try {
//     const deProduct = await Product.findById(req.params.id);

//     if (!deProduct) {
//       return res.json({ error: "Product not found" });
//     }

//     // Delete image from Cloudinary if it exists
//     if (deProduct.public_id) {
//       const result = await cloudinary.uploader.destroy(deProduct.public_id);
//       if (result.result !== "ok") {
//         throw new Error("Failed to delete image from Cloudinary");
//       }
//     }

//     // Delete the product from the database
//     await Product.findByIdAndDelete(req.params.id);

//     res.json({
//       message: "Product and associated image deleted successfully",
//     });
//   } catch (err) {
//     console.error("Error deleting product:", err);
//     res.json({ error: err.message });
//   }
// };
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Delete image from Cloudinary if it exists
    if (product.public_id) {
      const { result } = await cloudinary.uploader.destroy(product.public_id);
      if (result !== "ok") {
        console.error("Failed to delete image from Cloudinary:", result);
        // Optionally, you can choose to throw an error here if you want to prevent
        // the product from being deleted when the image deletion fails
        // throw new Error("Failed to delete image from Cloudinary");
      }
    }

    // Delete the product from the database
    await product.deleteOne();

    res.status(200).json({
      message: "Product and associated image deleted successfully",
      deletedProduct: product,
    });
  } catch (err) {
    console.error("Error in deleteProduct:", err);
    res
      .status(500)
      .json({ error: "Failed to delete product", details: err.message });
  }
};

export {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
};
