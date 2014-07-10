var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/widget')
});

router.get('/views/partials/:name', function(req, res) {
	var name = req.params.name;
	res.render('partials/' + name);
})

module.exports = router;
