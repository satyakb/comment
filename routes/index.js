var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/views/partials/:name', function(req, res) {
	var name = req.params.name;
	console.log('NAME: ' + name);
	console.log('partials/' + name);
	res.render('partials/' + name);
})

module.exports = router;
