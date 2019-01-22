var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var xlsx = require("node-xlsx").default;
 
var app = express();
var jsonParser = bodyParser.json();
 

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
// получение списка данных
app.get("/", function(req, res){
     
    //if(typeof require !== 'undefined') xlsx = require('xlsx');
    var dataxlsx = xlsx.parse("src/test.xlsx");
    var content = fs.readFileSync("./src/data.json", "utf8");
    var data = JSON.parse(content);
    var dataall = {}
    dataall.tk = data
    dataall.xlsx = dataxlsx[0].data
    res.send(dataall)
});
app.post("/", jsonParser, function (req, res) {
     
    if(!req.body) return res.sendStatus(400);
     
    var numberTk = req.body.number;
    var cityTk = req.body.city;
    var adressTk = req.body.adress;
    var newTk = {number: numberTk, city: cityTk, adress: adressTk};
     
    var data = fs.readFileSync("./src/data.json", "utf8");
    var tk = JSON.parse(data);
     
    tk.push(newTk);
    var data = JSON.stringify(tk);
    fs.writeFileSync("./src/data.json", data);
    res.send(newTk);
});

app.listen(8081, function(){
    console.log("Сервер ожидает подключения...");
});