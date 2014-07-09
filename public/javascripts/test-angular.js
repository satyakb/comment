(function() {

	var cmApp = angular.module('myapp', ['ngRoute']);

	cmApp.controller('CommentController', ['$scope' ,'$http', function($scope, $http) {
		$scope.comments = [];
		$scope.addComment = function(c) {
			var id = c.id;
			if ($('#textbox').val() !== '') {
				$http.post('/resources/1/comments?parent_id=' + id, {
					comment: $('#textbox').val()
				}).then(function(result) {
					$('#textbox').val('');
					var newComm = result.data;
					if (!c.children) {
						c.children = {};
					}
					c.children[newComm._id] = newComm;
					console.log(c)
				})
			}
		}
/***************************************************************************************************************/
/************************************ NEED TO FIGURE OUT CURRENT USER STUFF ************************************/
/***************************************************************************************************************/
		$scope.upVoteComment = function(c) {
			var id = c.id;
			console.log(id);

			c.voteCount++;

			$http.put("/resources/1/comments/" + id + "/vote?vote_status=up")
				.then(function(result) {
					console.log(result)
				})
		}
		$scope.downVoteComment = function(c) {
			var id = c.id;
			console.log(id);

			c.voteCount--;

			$http.put("/resources/1/comments/" + id + "/vote?vote_status=down")
				.then(function(result) {
					console.log(result)
				})
		}

		$scope.delComment = function(id) {
			$http.post('/resources/1/comments?parent_id=' + id, {
				comment: $('#textbox').val()
			}).then(function(result) {
				$('#textbox').val('');
				getComments();
				console.log(result)
			})
		}

		$scope.hide = function(c) {
			var id = c.id;
			if (!('hidden' in c)) {
				c.hidden = true;
			} else {
				c.hidden = !c.hidden;
			}

			if (c.hidden) {
				$('#' + id + " .child-list").hide();
			} else {
				$('#' + id + " .child-list").show();
			}
		}

		$http.get('/resources/1/comments')
			.then(function(result) {
				$scope.comments = result.data;
				var comments = $scope.comments;

				// console.log('COMMENTS:', comments)

				function voteCounter(comment) {
					// console.log(comment);
					for(comm in comment) {
						// console.log(comment[comm])
						var c = comment[comm];
						var votes = c.votes;
						c.voteCount = 0;

						if (votes !== []) {
							votes.forEach(function(vote) {
								c.voteCount += vote.vote_status;
							})
						}

						if ('children' in comment[comm]) {
							voteCounter(comment[comm].children)
						}
					}
				}

				comments.forEach(function(comm) {
					// console.log(comm);
					voteCounter(comm);
				})

				// console.log('FINAL:', $scope.comments)
			});

		
	}])

})();