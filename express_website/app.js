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

app.get('/contact', function(req, res){
	res.render('contact');
})

app.post('/contact/send', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'phantom42@gmail.com',
			pass: //password
		}
	});

	var mailOptions = {
		from: 'Joe <phantom42@gmail.com>',
		to: 'phantom42@gmail.com',
		subject: 'website submission',
		text: 'you have a submission with the following details... Name: ' +req.body.name+ ' Email: ' + req.body.email + ' Message: ' + req.body.message,
		html: '<p>you have a submision wiht the following details...</p><ul><li>' + req.body.name + '</li><li>' + req.body.email + '</li><li>' + req.body.message + '</li></ul>'
	}
	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('message sent: ' + info.response);
			res.redirect('/');
		}
	})
})

app.listen(3000);
console.log('server is running on port 3000');