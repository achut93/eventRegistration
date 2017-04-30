// index.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

app.use('/pages', express.static('pages'));

var uri = "mongodb://nandama:Achut$93@nandama-shard-00-00-caejc.mongodb.net:27017,nandama-shard-00-01-caejc.mongodb.net:27017,nandama-shard-00-02-caejc.mongodb.net:27017/records?ssl=true&replicaSet=nandama-shard-0&authSource=admin";
MongoClient.connect(uri, (err, db) => {
  db.close();
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);