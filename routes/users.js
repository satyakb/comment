var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res) {
	res.render('index', { title: 'Test' });
});

router.post('/comment', function(req, res) {
	console.log(req.body);
	var newComment = new Comment({text: req.body.comment});
	newComment.save();
	// res.redirect('/');
	res.end();
})

module.exports = router;
