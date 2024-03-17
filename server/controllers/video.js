const axios = require('axios')
const { google } = require('googleapis')

const apiKey = "AIzaSyA-cW0tndZx9xGmiqEoCss2zqFqGQzJl2o"
const baseApiUrl = "https://www.googleapis.com/youtube/v3"

console.log(apiKey)
console.log(baseApiUrl)

const youtube = google.youtube({
    version: 'v3',
    auth: apiKey,

})



const search = async (req, res, next) => {
    try {
        const searchQuery = req.query.search_query
        const response = await youtube.search.list({
            part: 'snippet',
            q: searchQuery,
            type: 'video',
        })
        const titles = response.data.items.map((item) => item.snippet.title)
        res.send(titles)
    } catch (error) {
        next(error)
    }

}

const searchById = async (req, res, next) => {

    try {
        const videoId = req.query.videoId;
        const response = await youtube.videos.list({
            part: 'snippet',
            id: videoId,
        });
        if (response.data.items.length === 0) {
            res.status(404).send('Video not found');
            return;
        }
        const videoTitle = response.data.items[0].snippet.title;
        res.send(videoTitle);
    } catch (error) {
        next(error);
    }

}

const searchQuery = async (req, res, next) => {
    try {
        const searchQuery = req.query.search_query
        url = `${baseApiUrl}/search?key=${apiKey}&type=video&part=snippet&q=${searchQuery}`
        const response = await axios.get(url)
        const titles = response.data.items.map((item) => item.snippet.title)
        res.send(response.data.items)
    } catch (error) {
        next(error)
    }


}

module.exports = {
    search,
    searchById,
    searchQuery
}
