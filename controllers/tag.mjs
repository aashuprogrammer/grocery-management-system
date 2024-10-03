import { CustomError, errorCapture } from "../error.mjs";
import { Tag } from "../model/tag.mjs";

const createTag = errorCapture(async (req, res, next)=>{
    const tag = new Tag({name:req.body.name});
    await tag.save();
    if (tag) {
        res.json({msg:"Tag Create Successfully", tag:tag});
        return
    };
    throw new CustomError(null, 500, "tag not created");
});

const getAllTag = errorCapture(async (req, res, next)=>{
    const tag = await Tag.find();
    if (tag) {
        res.json({msg:"Get All Tags Success", tags:tag});
        return
    };
    throw new CustomError(null, 404, "tag not found");
});

export {createTag, getAllTag}