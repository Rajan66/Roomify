const express = require('express')
const dotenv = require('dotenv')

const videoRoutes = require('./routes/video')

const app = express()

dotenv.config()

const PORT = process.env.PORT || 5000

app.use('/videos', videoRoutes)

app.get('/', (req, res) => {
    res.send('Server is running')
})


app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`))
