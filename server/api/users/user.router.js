'use strict';

var router = require('express').Router(),
	_ = require('lodash');

var HttpError = require('../../utils/HttpError');
var User = require('./user.model');

router.param('id', function (req, res, next, id) {
	User.findById(id).exec()
	.then(function (user) {
		if (!user) throw HttpError(404);
		req.requestedUser = user;
		next();
	})
	.then(null, next);
});

router.get('/', function (req, res, next) {
	User.find({}).exec()
	.then(function (users) {
		res.json(users);
	})
	.then(null, next);
});

router.post('/', function (req, res, next) {
	User.create(req.body)
	.then(function (user) {
		res.status(201).json(user);
	})
	.then(null, next);
});

router.post('/login', function (req, res, next) {
	User.findOne({ email: req.body.email })
	.then(function (user) {


		if(user) {
			if(req.body.password === user.password) {
				req.session.userId = user._id; 
			}
			res.status(200).json(user);
		} else {
			res.status(401).end();
		}
	});
});

router.post('/signup', function (req, res, next) {
	User.create({ email: req.body.email, password: req.body.password })
	.then(function (user) {
		res.status(200).json(user);
	})
	.then(null, function(err) {
		err.status(401);
		next(err);
	});
});

router.get('/logout', function(req, res, next) {
	req.session.userId = null; 
	console.log('logged out'); 
	res.status(200).send('Session ended'); 	
})

router.get('/:id', function (req, res, next) {
	req.requestedUser.getStories()
	.then(function (stories) {
		var obj = req.requestedUser.toObject();
		obj.stories = stories;
		res.json(obj);
	})
	.then(null, next);
});

router.put('/:id', function (req, res, next) {
	_.extend(req.requestedUser, req.body);
	req.requestedUser.save()
	.then(function (user) {
		res.json(user);
	})
	.then(null, next);
});

router.delete('/:id', function (req, res, next) {
	req.requestedUser.remove()
	.then(function () {
		res.status(204).end();
	})
	.then(null, next);
});

module.exports = router;