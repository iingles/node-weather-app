const path = require('path')
const express = require('express')
const hbs = require('hbs')

//DB and mongoose stuff
require('./database/mongoose')
const User = require('./models/user')

//install cors 
const cors = require('cors')
//npm dotenv package
// require('dotenv').config()



//npm body-parser package
const bodyParser = require('body-parser')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000


//Define paths for Express configuration
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors())

//set up the handlebars template engine
app.set('view engine', 'hbs')
//set our views path to templates folder location
app.set('views', viewsPath)
//set a path for our partial HTML stuff
hbs.registerPartials(partialsPath)

//Setup static directory to serve from
app.use(express.static(publicDirPath))

app.get('', (req, res)=> {
    res.render('index', {
        //values that I want the view to access
        pageTitle: 'Weather App', 
        name: 'Isaac',
    })
})

app.get('/about', (req, res)=> {
    res.render('about', {
        //values that I want the view to access
        pageTitle: 'About',
        title: 'About', 
        name: 'heyhey',
    })
})

app.get('/search', (req, res)=> {
    res.render('search', {
        //values that I want the view to access
        pageTitle: 'Search Database',
        title: 'search', 
        name: 'wow',
    })
})

app.get('/form', (req, res)=> {
    res.render('form', {
        //values that I want the view to access
        pageTitle: 'form'
    })
})

app.get('/help/*', (req, res)=>{
    //handle any page after help
    res.render('404',{
        pageTitle: 'No Help found',
        title: 'No help found',
        name: 'help path does not exist',
    })
})

app.get('/weather', (req, res)=> { 
    res.render('weather', {
        //values that I want the view to access
        pageTitle: 'Check the Weather',
        title: 'Weather', 
        name: 'Weather',
    })
})

app.get('/weather-response', (req, res,)=> {
    //error handling 
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a location.'
        })
    }
    geocode(req.query.address, (err, { latitude, longitude, location })=>{
        if(err) {
            return res.send({ err })
        }
        forecast(latitude, longitude, (err, forecastData) =>{
            if(err) {
                return res.send({ err })
            }
            res.json({
                forecast: forecastData,
                location,
                address: req.query.address.toUpperCase()
            })
        })
    })
})


//automatically parse incoming JSON
app.use(express.json())

app.post('/form', (req, res)=>{
    //create a new User instance
    const user = new User(req.body)

    /*
        save() doesn't take arguments;  returns a promise
        If things go well, save to database; if the don't, 
        return an error. __v: is the version of the document.
    */

    user.save().then(()=> {
        //Status 201 - created
        res.status(201).redirect('/form-post')
    }).catch((e)=> {
        //Send a status 400 - Bad Request
        //I can chain response methods
        res.status(400).send(e)
    })
})

app.get('/form-post', (req, res) =>{
    User.find({/* refine search here */}).then((users)=>{
        res.status(200).render('form-post', {users})
    }).catch((e) => {
        //500 - internal server error
        res.status(500).send()
    })
})

app.post('/remove-item', (req, res) => {
    //remove a user
    User.findById(req.body.id, (e, user) => {
        user.remove((e) => {
            res.redirect('/form-post')
        })
    })    
    
})

app.get('*', (req, res)=> {
    res.render('404', {
        //values that I want the view to access
        pageTitle: '404',
        title: '404 Not Found', 
        name: 'woah',
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})