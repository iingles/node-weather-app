 
if(document.getElementById('weatherForm')) {

    const weatherForm = document.getElementById('weatherForm')
    const search = document.getElementById('weatherInput')
    const weatherResponse = document.getElementById('weatherResponse')
    const weatherLocation = document.getElementById('weatherLocation')
    const weatherForecast = document.getElementById('weatherForecast')
    const weatherAddress = document.getElementById('weatherAddress')


    weatherForm.addEventListener('submit', e => {
        e.preventDefault()
        const location = search.value.toUpperCase()
        
        weatherLocation.textContent = ''
        weatherForecast.textContent = ''

        fetch(`/weather-response/?address=${location}`).then( (res) => {        
            res.json().then( (data) => {
                if(data.error) {
                    document.getElementById('addressError').textContent = data.error
                } else {
                    weatherResponse.style = 'visibility:visible'
                    weatherAddress.textContent = location
                    weatherLocation.textContent = data.location
                    weatherForecast.textContent = data.forecast
                    document.getElementById('addressError').innerHTML = ''
                }   
            })
        })
    })
}

userData = []