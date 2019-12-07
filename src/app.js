const path = require('path')
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

const publicDirPath = path.join(__dirname, '../public')

app.use(express.static(publicDirPath))

app.get('/', (req, res) => {
    res.send('Index page')
})

app.get('/help', (req, res) => {
    res.send('Help page')
})

app.get('/about', (req, res) => {
    res.send('About page')
})

app.get('weather', (req, res) => {
    res.send('your weather')
})


app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})