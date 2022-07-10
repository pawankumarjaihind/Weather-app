const request = require('request');
const constants = require('../../config');

const weatherData = (address , callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants.openWeatherMap.SECRET_KEY;
    request({url,json:true}, (error,{body})=>{
        console.log(body);
        if(error){
            callback(" Can't fetch data from open weather map api", undefined);
        }
        else if(!body.main || !body.main.temp || !body.name || !body.weather){
            callback("Unable to find required data from weather map api", undefined);
        }
        else{
            callback(undefined, {
                cityName : body.name,
                temperature : body.main.temp,
                feels_like : body.main.feels_like,
                temp_min : body.main.temp_min,
                temp_max : body.main.temp_max,
                pressure : body.main.pressure,
                humidity : body.main.humidity,
                windspeed : body.wind.speed,
                description : body.weather[0].description,
            })
        }
    })
}

module.exports = weatherData;