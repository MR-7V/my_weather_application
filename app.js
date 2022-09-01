const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query = req.body.cityName;
  const key = "dfdf4d7fd50d1a39d34adb85751edd58"
  const unit = "metric"
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units="+unit ;
  https.get(url,function(response){
      if(response.statusCode==200){
        response.on("data",function(data){
        const weatherData = JSON.parse(data);
        const description = weatherData.weather[0].description
        const temp = weatherData.main.temp
        const icon = weatherData.weather[0].icon
        const url = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
        res.write("<h1>Temp in "+query+" is " +temp+ " celcuis.</h1>");
        res.write("<p>"+description+"</p>");
        res.write("<img src="+url+"></img>");
        res.send();
      });
    }else{
      res.redirect(
        '/');
    }
  });
});

app.listen(3000,function(){
  console.log("server started")
});
