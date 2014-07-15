(function() {

	var cmntApp = angular.module('cmntApp', ['ngRoute', 'angularMoment']);

	cmntApp.constant('angularMomentConfig', {});

	cmntApp.controller('CommentController', ['$scope' ,'$http', function($scope, $http) {
		
		$scope.comments = [];

		$scope.sendComment = function() {
			if ($('#textbox').val() !== '') {
				$http.post('/resources/1/comments', {
					comment: $('#textbox').val()
				}).then(function(result) {

					$('#textbox').val('');

					var newComm = {};
					newComm[result.data._id] = result.data;
					newComm[result.data._id].voteCount = 0;

					$scope.comments.push(newComm);

				})
			}
		}

		$scope.hide = function(c) {
			var id = c._id;
			if (!('hidden' in c)) {
				c.hidden = true;
			} else {
				c.hidden = !c.hidden;
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
						c.date_posted = new Date(c.date_posted);
						if (c.deleted) c.text = '[deleted]';

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
					voteCounter(comm);
				})
			});

		
	}])

	cmntApp.controller('OptionsController', ['$scope' ,'$http', function($scope, $http) {
		$scope.replying = false;
		$scope.editting = false;
		$scope.replyText = '';
		$scope.editText = '';

		$scope.showReply = function(c) {
			$scope.editting = false;
			$scope.replying = !$scope.replying;
		}

		$scope.showEdit = function(c) {
			$scope.replying = false;
			$scope.editText = c.text;
			$scope.editting = !$scope.editting;
		}

		/***************************************************************************************************************/
		/************************************ NEED TO FIGURE OUT CURRENT USER STUFF ************************************/
		/***************************************************************************************************************/
				
		$scope.upVoteComment = function(c) {
			var id = c._id;

			c.voteCount++;

			$http.put("/resources/1/comments/" + id + "/vote?vote_status=up")
				.then(function(result) {
					console.log(result)
				})
		}
		$scope.downVoteComment = function(c) {
			var id = c._id;

			c.voteCount--;

			$http.put("/resources/1/comments/" + id + "/vote?vote_status=down")
				.then(function(result) {
					console.log(result)
				})
		}

		$scope.delComment = function(c) {
			var id = c._id;
			$http.delete('/resources/1/comments/' + id)
				.then(function(result) {
					c.text = '[deleted]'
					c.deleted = true;
					console.log(result)
				})
		}

		$scope.editSubmit = function(c) {
			var id = c._id;
			if ($scope.editText) {
				$http.put('/resources/1/comments/' + id, {
					comment: $scope.editText
				}).then(function(result) {
					c.text = $scope.editText;
					$scope.editText = '';
					$scope.editting = false;
					console.log(result);
				})
			}
		}

		$scope.replySubmit = function(c) {
			var id = c._id;
			if ($scope.replyText) {
				$http.post('/resources/1/comments?parent_id=' + id, {
					comment: $scope.replyText,
				}).then(function(result) {

					$scope.replyText = '';
					$scope.replying = false;

					var newComm = result.data;
					newComm.voteCount = 0;
					
					if (!c.children) {
						c.children = {};
					}

					c.children[newComm._id] = newComm;
					
				})
			}
		}
	}])

})();