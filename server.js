'use strict';

// TODO. set up dependencies

require('dotenv').config;
const { POINT_CONVERSION_COMPRESSED } = require('constants');
const express = require('express');
const superagent = require('superagent');
const app = express();

const KEY = process.env.MOVIE_KEY;


app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

const PORT = process.env.PORT || 3333;

// TODO set up get routs to render pages. 

//HOME
app.get('/', handleHome);

// favorites
//app.get(/favorites, handleWatchList);

// details
//app.get(/detail, handleDetail);



// TODO make constructor function.
function Movies(movie) {
    this.title = movie.title;
    this.image = movie.poster_path;
    console.log("Movies -> movie.poster_path", movie.poster_path)

}


// TODO catch all error
app.get('*', (req, res) => res.status(404).send('this page does not exist... fix something'));



//TODO make handler functions

function handleHome(req, res) {
    try {
        console.log('getting home.');
        // make api call
        const url = `https://api.themoviedb.org/3/trending/all/day?api_key=f538858c88b5943eaf749c0828984a1a`;
        superagent.get(url)
            .then(obj => {
                let movieInfo = obj.body.results;
                // send info through constructor
                let ListOfMovies = movieInfo.map((film => {
                    return new Movies(film);
                }))
                res.render('pages/home.ejs', { movie: ListOfMovies }); // the first word is declaring a variable we can use for the ejs
            })
            .catch(err => {
                console.error('return', err)
            });
    } catch (error) {
        res.status(400).send('home rout is messed up');
    }
}

// function handleWatchList(req, res){

//}

// function handleDetail(req, res){

//}

//TODO set up listening port
app.listen(PORT, () => {
    console.log(`port live on ${PORT}`);
});