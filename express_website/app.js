var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');

var app = express();

// set up jade for view rendering
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
	// console.log('hello world'); 
	// res.send('<h1>Hello world</h1>');
	res.render('index', {title: 'Welcome'});
})

app.get('/about', function(req, res){
	res.render('about');
})

app.listen(3000);
console.log('server is running on port 3000');