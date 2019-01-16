const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
const express = require('express')
const bodyParser= require('body-parser')
const app = express();
const ejsLint = require('ejs-lint');
var urlencodedParser = app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/assets'));

var database;
var path = require('path');
const mongoClient = require('mongodb').MongoClient;

// gridfs packages
var mongoose = require('mongoose');
var Grid = require("gridfs-stream");
Grid.mongo = mongoose.mongo;
var ObjectID = require('mongodb').ObjectID;
var Base64Encode = require('base64-stream');
var fs = require('fs');


// connecting to mongodb 
var url = "mongodb://ks4049:project123@ds227332.mlab.com:27332/project";
var url1 = "mongodb://ks4049:project123@ds157493.mlab.com:57493/gridfs";

//var url = "mongodb://localhost:27017/";
//var url1 = "mongodb://localhost:27017/gridfs";
mongoose.connect(url1);
var conn = mongoose.connection;
mongoClient.connect(url, function(err, client){
	if (err) return console.log(err);
	console.log("Connecting.."+client);
	database = client.db("project", function(err, db){
		if (err) throw err;
		console.log("Connected to db");
	});
});

// the home page
app.get('/',function(req, res){
	res.sendFile(path.join(__dirname+'/views/index.html'));
})

//Get all restaurants based on search
app.get('/restaurants', (req, res) => {
	var searchText =  req.query.searchText;
	var searchParam =req.query.searchParam;
	if(searchParam == "all"){
		var regexText = new RegExp(".*"+searchText+".*", 'i');
		var findQuery = [{"Restaurant Name" : regexText}, {"Restaurant ID": regexText}, {"Country": regexText}, {"Cuisines": regexText}, {"Address": regexText}];
		database.collection('restaurants').find({$or: findQuery}).toArray(function(err, results){
			if(err) throw err;
			res.send(results);
		});
	}
	else{
		database.collection('restaurants').find({[searchParam]: new RegExp(".*"+searchText+".*", 'i')}).toArray(function(err, results){
			if(err) throw err;
			res.send(results);
		});	
	}
});

//Get the restaurant by ID
app.get('/getRestaurantById',function(req, res){
	var restID = parseInt(req.query["Restaurant ID"]);
	database.collection('restaurants').findOne({"Restaurant ID": restID}, function(err, result){
		if(err) throw err;
		//get the restaurant Image
		var restaurantImg = result["Image ID"];
		var gfs = Grid(conn.db);
		gfs.collection("images").findOne({"_id": restaurantImg}, function(err, imageFile){
			if (err) throw err;
			var readstream = gfs.createReadStream({_id: imageFile["_id"]});
			readstream.on('data', (chunk) => {
	    	res.render("displayRestaurant.ejs", {restaurantInfo: result, image: chunk.toString('base64') });
	  		})
		 });
	});
});

//Add review for restaurants
app.post('/addReviewToRestaurant', function(req, res){
	var reviewText = req.body["reviewText"];
	var restaurantId = ObjectID(req.query["_id"]);
	var updateOperation = {$push:{"comments": reviewText}};
	//add comments
	var updateStatus = database.collection("restaurants").updateOne({"_id":restaurantId},updateOperation, function(err, result){
		if (err) throw err;
		console.log("Updated successfully");
		res.send(result);
	});
});

//get Restaurants based on Location
app.get('/getRestaurantsByLocation',function(req, res){
	var longit = parseFloat(req.query.longitude);
	var lat = parseFloat(req.query.latitude);
	var longLat = [];
	longLat.push(longit);
	longLat.push(lat);
	var searchText = req.query.searchText;
	var regexText = new RegExp(".*"+searchText+".*", 'i');
	var findQuery = [{"Restaurant Name" : regexText}, {"Restaurant ID": regexText}, {"Country": regexText}, {"Cuisines": regexText}, {"Address": regexText}];
	var geoQuery = {"loc": {$near:{$geometry:{"type":"Point", "coordinates": longLat}, $maxDistance: 500000}}};
	//database.collection('restaurants').createIndex({point:"2dsphere"});
	var cursor = database.collection('restaurants').find({$and:[geoQuery, {$or:findQuery}]}).toArray(function(err, results){
		if (err) throw err;
		res.send(results);
	});
});

app.listen(port, hostname);
console.log('Search based application');