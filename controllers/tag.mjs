import { Tag } from "../model/tag.mjs";

const createTag = async (req, res)=>{
    const tag = new Tag({name:req.body.name});
    await tag.save();
    if (tag) {
        res.json({msg:"Tag Create Successfully", tag:tag});
        return
    };
    res.send("tag not created");
};

const getAllTag = async (req, res)=>{
    const tag = await Tag.find();
    if (tag) {
        res.json({msg:"Get All Tags Success", tags:tag});
        return
    };
    res.send("tag not found");
};

export {createTag, getAllTag}