const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define path for Express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



app.get('', (req,res) =>{
    res.render('index',{
        title: 'Weather App',
        name: 'Ritik Raj'
    })
})

app.get('/about', (req,res) =>{
    res.render('about',{
        title: 'About me',
        name: 'Ritik Raj'
    })
})

app.get('/help', (req,res) =>{
    res.render('help',{
        helpText: 'Weather app created by Ritik',
        title: 'Help',
        name: 'Ritik Raj'
    })
})

app.get('/weather',(req,res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            return res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req,res) =>{
    res.render('error',{
        title:'Error Page',
        errorMessage: 'Help article not found',
        name: 'Ritk Raj'
    })
})

app.get('/*', (req,res) =>{
    res.render('error',{
        title:'Error Page',
        errorMessage: 'Page not found',
        name: 'Ritk Raj'
    })
})

app.listen(port, () =>{

})