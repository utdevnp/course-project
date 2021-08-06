const requireLogin = require("../middlewire/requireLogin");
const validateInput = require("../middlewire/validateInput"); 
const { Author, validateAuthor} = require("../models/authorModel");
const express = require("express");
const router = express.Router();


router.get("/", requireLogin, async (req,res)=>{
    const  author = await Author.find();
    res.send(author)
})

// insert author 
router.post("/", [requireLogin,validateInput(validateAuthor)], async (req,res)=>{

    // insert author
    const author = new Author({
        name:req.body.name,
        bio:req.body.bio,
        website:req.body.website
    });

    const authoradd = await author.save();
    res.send(authoradd);
})


module.exports = router