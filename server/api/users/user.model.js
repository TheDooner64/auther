'use strict'; 

var mongoose = require('mongoose'),
	shortid = require('shortid'),
	_ = require('lodash');

var db = require('../../db');
var Story = require('../stories/story.model');

var User = new mongoose.Schema({
	_id: {
		type: String,
		unique: true,
		default: shortid.generate
	},
	name: String,
	photo: {
		type: String,
		default: '/images/default-photo.jpg'
	},
	phone: String,
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: String,
	google: {
		id: String,
		name: String,
		email: String,
		token: String
	},
	twitter: {
		id: String,
		name: String,
		email: String,
		token: String
	},
	github: {
		id: String,
		name: String,
		email: String,
		token: String
	},
	isAdmin: {
		type: Boolean,
		default: false
	}
});

User.methods.getStories = function () {
	return Story.find({author: this._id}).exec();
};

User.statics.findOrCreate = function(profile) {
	return this.findOne({email: profile.emails[0].value})
	.then(function(user) {
		if(user) {
			return user;
		} else {
			this.create({ email: profile.emails[0].value})
			.then(function(newUser) {
				return newUser;
			})
		}
	})
};

module.exports = db.model('User', User);