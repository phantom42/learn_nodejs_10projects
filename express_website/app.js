var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res){
	// console.log('hello world'); 
	res.send('<h1>Hello world</h1>');
})

app.listen(3000);
console.log('server is running on port 3000');