var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

/* GET widget template. */
router.get('/', function(req, res) {
	res.render('widget', { title: 'Express' });
});

module.exports = router;
