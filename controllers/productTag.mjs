import { CustomError, errorCapture } from "../error.mjs";
import { ProductTag } from "../model/productTag.mjs";

const createProductTag = errorCapture(async (req, res, next)=>{
    const pt = new ProductTag({tag_id:req.body.tag_id, product_id:req.body.product_id});
    await pt.save();
    if (pt) {
        res.json({msg:"ProductTag Create Successfully", productTag:pt});
        return
    };
    throw new CustomError(null, 500, "ProductTag not created");
});

const getAllProductTag = errorCapture(async (req, res, next)=>{
    const productTag = await ProductTag.find();
    if (productTag.length > 0) {
        res.json({msg:"Get all product tag success", productTags:productTag});
        return
    };
    throw new CustomError(null, 404, "Product Tag not found");
});

export{createProductTag, getAllProductTag}