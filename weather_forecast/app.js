const express = require('express');
const https = require("https");
const http = require("http");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res){
    http.get("http://ip-api.com/json/", function(resp){
        resp.on("data", function(data){
            let location_input = req.body.cityName;
            let location_data = JSON.parse(data);
            let location = (location_input === ""? location_data.city: location_input);
            let api_key = "e3815529c60237bc782dd226c51de068";
            let metric_uom = "metric";
            let main_url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + api_key  + "&units=" + metric_uom;
            https.get(main_url, function(response){
                console.log(response.statusCode);
                response.on("data", function(data){
                    let weather_data = JSON.parse(data);
                    let temp = weather_data.main.temp;
                    let name = weather_data.name;
                    let description = weather_data.weather[0].description;
                    console.log(name + '  ' + temp);
                    res.write('<p>' + name + ' ' + temp + ' degrees.</p> <p>' + description + '</p>')
                    let icon = weather_data.weather[0].icon;
                    let icon_location = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                    res.write('<img src="' + icon_location + '" alt=""></img>');
                    res.send();
                })
            })
        })
        
        })
})
app.listen(3000, function(){
    console.log('server up and running');
})