const postman_request = require("postman-request");

const forecast = (latitude,longitude,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=1a4f42bc85ca30476d2226f1fa18b3d8&query=" + latitude + "," + longitude + "&units=f";
    postman_request({ url, json: true}, (error,{ body })=>{
        if(error) {
            callback("unable to connect to weather service",undefined)
        } else if(body.error){
            callback("Unable to find valid location",undefined)
        }else {
            callback(undefined,body.current.weather_descriptions[0] + " It is exactly " + body.current.temperature + " degrees out. It feels like " + body.current.feelslike + " degrees out")
        }
    })
} 

module.exports = forecast;