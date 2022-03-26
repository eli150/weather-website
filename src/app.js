const path = require("path");
const request = require('request');
const express = require("express");
const hbs = require("hbs");
const app = express();
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup hbs and view locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//setup static dir to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Grayson",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Nightwing",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    msg: "Fix the damn Batsignal",
    name: "Grayson",
  });
});

app.get("/weather", (req, res) => { 
  if (!req.query.address) {
    return res.send({
      error: "pls provide an address",
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({
        error: error,
      }); // can be {error} instead because its the same name
    }
    //can use destructure here but also set default value of empty object up above^
    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error: error,
        });
      }
      // console.log(data.location);
      // console.log(forecastData);
      res.send({
        address: req.query.address,
        location: data.location,
        weather: forecastData,
      });
    });
  });

  
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error",
    msg: "Help article not found",
    name: "Grayson",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error",
    msg: "Page not found",
    name: "Grayson",
  });
});

app.listen(3000, () => {
  console.log("app is running on port 3000");
});
