const request = require('request')

const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoid3d3LTE5MSIsImEiOiJja2VsamI3eHUwYmkzMnhscW84MXhua2Y2In0.FvocpJ1IF-1vxSBnaPyRuA&limit=1'

    request(
        {url , json: true},
        (error, {body}) => {
            if(error){
                callback('API not accessible', undefined)
            } else if(body.features.length === 0){
                callback('Unable to find geo code for the given location', undefined)
            } else {
                const data = body.features[0]
                callback(undefined, 
                         {longitude: data.center[0],
                          latitude: data.center[1]})
                // console.log('Longitude: '+ data.center[0] + ' Latitude: '+ data.center[1])
            }
        }
    )
}
module.exports = geocode