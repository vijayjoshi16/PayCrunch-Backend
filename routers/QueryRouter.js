const express = require('express');
const queryRouter = express.Router();
const expressAsyncHandler = require('express-async-handler');
const { all } = require('express/lib/application');
const Video = require('../models/Video');

queryRouter.get(
    '/all_videos/:skip/:limit',
    expressAsyncHandler(async (req,res)=>{
        try{
            const allVideos = await Video.find({}).sort({publishedAt: -1})
            .skip(parseInt(req.params.skip))
            .limit(parseInt(req.params.limit));
            
            res.status(200).send({
                message: "Success",
                videos: allVideos
            });
        }catch(err){
            console.log(err);
            res.status(500).send({
                message:"Some Error Occured"
            })
        }
    })
);

queryRouter.post(
    '/search_videos',
    expressAsyncHandler(async (req,res)=>{
        try{
            const title = req.body.title;
            const description = req.body.description;
            const mode = req.body.mode;
            if(mode=="exact"){
                //This is the exact mode where we'll only check
                //for exactly matching title or description
                const allVideos = await Video.find({
                    $or: [{title: title}, {description: description}]
                });

                res.status(200).send({
                    message:"Success",
                    videos: allVideos
                });
            }else{
                //This is the smart mode where we'll use
                //regular expressions to perform advanced search

                //Splitting the title and description space-wise to do word by word analysis
                const allTitleWords = title.split(" ");
                const allDescriptionWords = description.split(" ");

                //Preparing regular expressions for the entire string as well as that for each word
                const titleRegex = [{title: {$regex: `${title}+`, $options:"i"}}];
                const descriptionRegex = [{description: {$regex: `${description}+`, $options:"i"}}];

                //inserting regular expression for each word in the array
                allTitleWords.forEach(keyword=>{
                    titleRegex.push({title: {$regex: `${keyword}+`, $options:"i"}});
                })

                allDescriptionWords.forEach(keyword=>{
                    descriptionRegex.push({description: {$regex: `${keyword}+`, $options:"i"}})
                })

                //Performing the final query with the prepared set of regular expressions
                const allVideos = await Video.find({
                    $or: [
                        ...titleRegex,
                        ...descriptionRegex
                    ]
                });
                
                res.status(200).send({
                    message:"Success",
                    videos: allVideos
                });
            }
        }catch(err){
            console.log(err);
            res.status(500).send({
                message:"Some Error Occured"
            })
        }  
    })
);

module.exports = queryRouter;