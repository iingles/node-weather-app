const request = require('request')

const geocode = (address, callback) => {
    console.log(address)
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiaWluZ2xlcyIsImEiOiJjazN3Y3g1bDAweDl1M2VzMWdhNHBwM3o3In0.N3UF_YijnJPNgK6rPe_OXQ'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode