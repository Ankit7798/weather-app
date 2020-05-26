const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast")


const app = express();

//Define path and views location
const dirPublic = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

//Setup a handler bar
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(dirPublic)) ;

app.get("", (req, res) =>{
    res.render("index",{
        title: "Weather App",
        name: "Ankit"
    })
})

app.get("/about",(req,res) =>{
    res.render("about",{
        title: "About",
        name: "Ankit"

    })
})

app.get("/help", (req,res) =>{
    res.render("help",{
        helpText: "This is helping Text",
        title:  "Help",
        name: "Ankit"
    })
})

app.get("/weather", (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: "You must provide some address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} ={}) =>{
        if(error) {
            return res.send({ error })
        }
    forecast(latitude, longitude, (error, forecastData) =>{
        if(error){
            return res.send({ error })
        }

        res.send({
            forecast : forecastData,
            location,
            address: req.query.address
        })
    })    

    })




    // res.send({ 
    //     forecast : "It is cloudy",
    //     location: "India",
    //     address: req.query.address

    // })
});

app.get("/help/*",(req,res) =>{
    res.render("404", {
        title: "404",
        name: "Ankit",
        errorMessage: "Help article not found"
    })
})

app.get("*",(req, res)=>{
    res.render("404", {
        title: "404",
        name: "Ankit",
        errorMessage: "Page not found"

    })
})

app.listen(3000, () =>{
    console.log("Server starts")
})