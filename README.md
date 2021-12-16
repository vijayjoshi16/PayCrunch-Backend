<h1 align="center">PayCrunch Youtube API Assignment - Backend</h1>

<h2>This backend API consists of the following:</h2>

- Server calling the youtube API to get the latest videos for a predefined search query and should store the data of videos (specifically these fields - Video title, description, publishing datetime, thumbnails URLs and any other fields you require) in a database
- A GET API which returns the stored video data in a paginated response sorted in descending order of published datetime.
- A basic search API to search the stored videos using their title and description.

## Backend API Link: 
https://paycrunch-backend-assignment.herokuapp.com/

## How to setup this project in the local system

- Clone this project: 
`git clone https://github.com/vijayjoshi16/PayCrunch-Backend.git`

- Change the current working directory:
`cd PayCrunch-Backend`

- Install all the required packages:
`npm install`

- Get your youtube api key from the google developers website or refer to the tutorial: https://www.youtube.com/watch?v=TE66McLMMEw

- Create a .env file and paste your API key in the following format
`API_KEY=YOUR_API_KEY`

- Log in to MongoDB and create a new cluster. Connect to the app by pasting the Mongo URI in the .env file in the format
`MONGO_URI=YOUR_MONGO_URI`

- Start the server using: `nodemon app.js`

## API's avaliable

- Get all videos(paginated)(GET api)
https://paycrunch-backend-assignment.herokuapp.com/query/all_videos/:skip/:limit
Returns the videos stored in the database sorted accroding to the descending order of publish datetime. To make the response paginateed it takes 2 extra parameters
  1. skip: the no. of videos to skip from the 1st video
  2. limit: the no. of videos to return
  
- Search API to search the stored videos using their title and description(POST)
https://paycrunch-backend-assignment.herokuapp.com/query/search_videos/
Returns the videos based on the title and description sent in the body. It runs in 2 modes:
  1. Exact mode: Returns videos with exactly matching title or description
  2. Smart mode: Returns videos which partially match the title or description using regular expressions on each word of title and description
#### Sample body for search api:
`{
    "title":"Play start",
    "description":"marriage scary",
    "mode":"smart"
}`

<h2 align="center">THANK YOU</h2>
