const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { response } = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars ands views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))




app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Marcelo'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Marcelo'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'help message',
        name: 'Marcelo'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Location not informed'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error: error})
            }

            res.send({
                location: location,
                forecast: forecastData
            })            
          })
    })    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
    
    
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Marcelo',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Marcelo',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)    
})

