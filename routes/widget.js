var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

/* GET widget template. */
router.get('/', function(req, res) {
	Comment.find({}, function(err, docs) {
		if (err) {
			console.log('error loading comments');
			res.send(500)
		} else {
			console.log(docs);
			res.send(200)	
		}
	})
	// res.render('index', { title: 'Express' });
});

module.exports = router;
