import { ProductTag } from "../model/productTag.mjs";

const createProductTag = async (req, res)=>{
    const pt = new ProductTag({tag_id:req.body.tag_id, product_id:req.body.product_id});
    await pt.save();
    if (pt) {
        res.json({msg:"ProductTag Create Successfully", productTag:pt});
        return
    };
    res.send("ProductTag not created");
};

const getAllProductTag = async (req, res)=>{
    const productTag = await ProductTag.find();
    if (productTag.length > 0) {
        res.json({msg:"Get all product tag success", productTags:productTag});
        return
    };
    
};

export{createProductTag, getAllProductTag}