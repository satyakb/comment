var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var ObjectId = mongoose.Types.ObjectId; 
var async = require('async');

// Temporary
var userId = 99;

/* GET comments for the resource-id. */
router.get('/:resource_id/comments', function(req, res) {
	Comment.find({resource_id: req.params.resource_id, parentId: null}, function(err, docs) {
		if (err) {
			console.log('error loading comments');
			return res.send(500);
		} else {
			var getTrees = [];

			console.log('DOCS: ' + docs);

			docs.forEach(function(root) {
				getTrees.push(function(callback) {
					root.getTree({
						sort: {date_posted: 1},
					}, function(err, tree) {
						callback(err, tree);
					})
				})
			})

			async.parallel(getTrees, function(err, trees) {
				if (err) {
					console.log('error getting comment tree');
					return res.send(500);
				} else {
					console.log('TREES: ' + JSON.stringify(trees, null, 4));
					return res.json(trees);
				}
			})
		}
	})
});

/* POST comment */
router.post('/:resource_id/comments', function(req, res) {
	var newComment = new Comment({
		text: req.body.comment,
		resource_id: req.params.resource_id,
		user_id: userId
	});
	if (req.query.parent_id) {
		Comment.findById(new ObjectId(req.query.parent_id), function(err, parent) {
			if (err) {
				console.log('Error finding parent: ' + err);
				return res.send(500);
			} else if (parent) {
				parent.appendChild(newComment, function(err, comm) {
					if (err) {
						console.log('Error appending child: ' + err);
						return res.send(500);
					} else {
						console.log('got here!')
						console.log(comm);
						return res.json(comm);
					}
				});
			} else {
				console.log('Parent_id invalid.')
				return res.send(500);
			}
		});
	} else {
		newComment.save(function(err, comm) {
			if (err) {
				console.log('Error posting comment: ' + err);
				return res.send(500);
			} else {
				console.log('whooo')
				console.log(comm);
				return res.json(comm);
			}
		});
	}
	// return res.send(200);
});

/* PUT Comment edit */
router.put('/:resource_id/comments/:comment_id', function(req, res) {
	Comment.findById(new ObjectId(req.params.comment_id), function(err, comment) {
		if (err) {
			console.log('Error finding comment to edit: ' + err);
			return res.send(500);
		} else {
			comment.text = req.body.comment;
			comment.save(function(err) {
				if (err) {
					console.log('Error editting comment: ' + err);
					return res.send(500);
				}
				return res.send(200);
			})
		}
	})
});

/* DELETE Comment delete */
router.delete('/:resource_id/comments/:comment_id', function(req, res) {
	Comment.findById(new ObjectId(req.params.comment_id), function(err, comment) {
		if (err) {
			console.log('Error finding comment to delete: ' + err);
			return res.send(500);
		} else {
			comment.deleted = true;
			comment.save(function(err) {
				if (err) {
					console.log('Error deleting comment: ' + err);
					return res.send(500);
				}
				return res.send(200);
			})
		}
	})
})

/* PUT Comment vote */
router.put('/:resource_id/comments/:comment_id/vote', function(req, res) {
	var voteStatus = req.query.vote_status;
	
	if (voteStatus === 'up') voteStatus = 1;
	else if (voteStatus === 'down') voteStatus = -1;
	else if (voteStatus === 'none') voteStatus = 0;

	Comment.findById(
		new ObjectId(req.params.comment_id), function(err, comment) {
		if (err) {
			console.log('Error voting on comment: ' + err);
		} else if (comment) {
			var voters = comment.votes;
			
			for (var i = 0; i < voters.length; i++) {
				if (voters[i].user_id === userId) {
					if (voteStatus === 0) voters.splice(i, 1);
					else voters[i].vote_status = voteStatus;

					comment.save(function (err) {
						if (err) {
							console.log('Error voting on comment: ' + err);
							return res.send(500);
						}
					})

					return res.send(200);
				}
			}
			
			if (voteStatus !== 0) {
				voters.push({
					user_id: userId,
					vote_status: voteStatus
				});
			}

			comment.save(function (err) {
				if (err) {
					console.log('Error voting on comment: ' + err);
					return res.send(500);
				}
			})
		}
		return res.send(200);
	})
});

module.exports = router;
