const express = require('express');
const queryRouter = express.Router();
const expressAsyncHandler = require('express-async-handler');
const Video = require('../models/Video');

queryRouter.get(
    '/all_videos/:skip/:limit',
    expressAsyncHandler(async (req,res)=>{
        try{
            const allVideos = await Video.find({}).sort({publishedAt: -1})
            .skip(parseInt(req.params.skip))
            .limit(parseInt(req.params.limit));
            console.log(allVideos.length)
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

module.exports = queryRouter;