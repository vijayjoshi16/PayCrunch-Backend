const axios = require('axios');
const VideoModel = require("./models/Video");

function getVideoFromAPI(){
    axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&order=date&publishedAfter=2021-12-14T00%3A00%3A00Z&type=video&key=${process.env.API_KEY}`,
    ).then(res=>{
        // console.log(res.data.snippet);
        let allVideos = res.data.items;
        allVideos = allVideos.map((video)=>{
            return {
                title: video.snippet.title,
                description: video.snippet.description,
                publishedAt: video.snippet.publishedAt,
                thumbnail: video.snippet.thumbnails.default.url
            }
        });
        console.log(allVideos);
        allVideos.forEach(video=>{
            const newVideo = new VideoModel(video);
            newVideo.save();
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

module.exports = getVideoFromAPI;