var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

router.get('/add', function(req, res, next) {

	res.render('addcategory', {
		'title': 'Add Category'
	});	
	
});

router.post('/add', function (req, res, next) {
	// get form values
	var name = req.body.name;

	// form validation
	req.checkBody('name', 'name field is required').notEmpty();

	// check errors
	var errors = req.validationErrors();

	if(errors){
		res.render('addcategory',{
			"errors": errors
		});
	} else {
		var posts = db.get('categories');
		posts.insert({
			"name": name
		}, function(err, post){
			if (err) {
				res.send(err);
			} else {
				req.flash('success','category added');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});

module.exports = router;
