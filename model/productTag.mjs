import mongoose, { Schema } from "mongoose";

const productTagSchema = new mongoose.Schema({
    tag_id:{
        type:Schema.Types.ObjectId,
        ref:'tags',
        Select:false,
        required:true
    },
    product_id:{
        type:Schema.Types.ObjectId,
        ref:'product',
        Select:false,
        required:true
    }
});

const ProductTag = mongoose.model('product_tags', productTagSchema);
export{ProductTag}
