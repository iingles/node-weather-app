const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express configuration
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//set up the handlebars template engine
app.set('view engine', 'hbs')
//set our views path to templates folder location
app.set('views', viewsPath)
//set a path for our partial HTML stuff
hbs.registerPartials(partialsPath)

//Setup static directory to serve from
app.use(express.static(publicDirPath))

app.get('', (req, res, next)=> {
    //render the template in ./views
    res.render('index', {
        //values that I want the view to access
        pageTitle: 'Weather App', 
        name: 'Isaac',
    })
})

app.get('/about', (req, res, next)=> {
    //render the template in ./views
    res.render('about', {
        //values that I want the view to access
        title: 'About', 
        name: 'heyhey',
    })
})

app.get('/help', (req, res, next)=> {
    //render the template in ./views
    res.render('help', {
        //values that I want the view to access
        title: 'help', 
        name: 'wow',
    })
})

app.get('/form', (req, res, next)=> {
    //render the template in ./views
    res.render('about', {
        //values that I want the view to access
        title: 'form', 
        name: 'woah',
    })
})

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})