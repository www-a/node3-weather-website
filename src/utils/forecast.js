const request = require('request')

const forecast = (latitude, longitude , callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=a62e395f1f4731f535e81ace7ccdbea8&query='+latitude+','+longitude

    request(
        {url, json:true},
        (error, {body}) => {
            if(error){
                callback('API not accessible' ,undefined)
            } else if (body.error){
                callback('Unable to find location' ,undefined)
            } else{
                const data = body
                callback(undefined, data)
            }
        }
    )
}

module.exports = forecast