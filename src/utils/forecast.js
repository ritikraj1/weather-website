const request = require('request')


const forecast= (latitude, longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=509ab80fdec0b48d3194cd2a89245412&query='+latitude+','+longitude+'&units=f'
    
    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }
        else if (body.error){
            callback('Unable to find location',undefined)
        }
        else{
            const {weather_descriptions,temperature,feelslike} = body.current
            callback(undefined,weather_descriptions[0] +'. It is currently ' + temperature+ ' degrees out. But feels like '+ feelslike + ' degrees.')
        }
    })

}

module.exports = forecast