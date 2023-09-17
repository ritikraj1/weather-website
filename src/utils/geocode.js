const request =require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=a2dc67020973b5dd2ec33a6445a8c25c&query=' + address + '&limit=1'

    request({url, json:true}, (error, response) =>{
        const {data} = response.body
        if(error){
            callback('Unable to connect to geocode service',undefined)
        }else if (data.length===0){
            callback('Unable to find Geo Code', undefined)
        }else {
            callback(undefined,{
                latitude: data[0].latitude,
                longitude: data[0].longitude,
                location: data[0].label
            })
        }
    })
}

module.exports=geocode