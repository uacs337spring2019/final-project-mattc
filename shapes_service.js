/*
 * Matthew Coulombe
 * CSC 337
 * Homework 11
 * shapes_service.js
 * This program creates the server code for shapes.html. It has a post function that takes
 * the contents of the space and puts it in creations.txt and also gets a random creation
 * in creations.txt.
 */

"use strict";

const express = require("express");
const app = express();

const fs = require("fs");

const  bodyParser = require('body-parser');
const jsonParser = bodyParser.json();


/** Prevents CORS error **/
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
               "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use(express.static('public'));

/** Post request. Gets the shapes on the page and appends it to creations.txt **/
app.post('/', jsonParser, function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	let space = req.body.space; // Gets the shapes in the space
	fs.appendFile("creations.txt", "\n"+space, function(err) { // Appends to the file
	    	if(err) {
			console.log(err);
			res.status(400);
    	}
    	res.send("Creation Saved"); // Returns a success message that is sent to user
	});
});

/** Get request. Gets a random creation in creations.txt. **/
app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	let file = fs.readFileSync("creations.txt", 'utf8'); // Get file
	let json = {}; // Create json object
	let creations = []; // Create list for each creation
	let content = file.split("\n"); // Split the file based on the newline character
	for(let i = 0; i < content.length; i++){ // For each creation
		let creation = {}; // Create an object for the creation
		creation = content[i]; // Get the content
		creations.push(creation); // Put the creation in the list
	}
	json.creations = creations; // Put the creations as a json object
	res.send(JSON.stringify(json)); // Send the json object
});

app.listen(process.env.port);
