const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const axios = require("axios");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", function(req, res){
    res.render("index");
})

app.post("/", function(req, res){
    const t = req.body.movie;
    var key = "312e715c";
    var url = "https://www.omdbapi.com?t="+ t +"&apikey=" + key;

    // console.log(url);  -------> url worked.

    axios.get(url).then(function(response){
        if(response.data.Response === "True"){
            res.render("movie", {
                title : response.data.Title,
                year : response.data.Year,
                released : response.data.Released,
                duration : response.data.Runtime,
                genre : response.data.Genre,
                director : response.data.Director,
                writer : response.data.Writer,
                actors : response.data.Actors,
                plot : response.data.Plot,
                language : response.data.Language,
                poster : response.data.Poster,
                imbdrating : response.data.imdbRating,
                boxoffice : response.data.BoxOffice
            });
        }
    })
    // res.render("movie");  -------> worked.
})



app.listen(3000, function(){
    console.log("server started");
})