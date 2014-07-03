$(function() {
	var comment_id = '53b48f7ea1593f0000c31862';

	$('#send').on('click', function(e) {
		e.preventDefault();
		$.post('/resources/1/comments', {
			comment: $('#textbox').val()
		}, function(data) {
			$('#textbox').val('');
			console.log(data);
		})
	})

	$('#reply').on('click', function(e) {
		e.preventDefault();
		$.post('/resources/1/comments?parent_id=' + comment_id, {
			comment: $('#textbox').val()
		}, function(data) {
			$('#textbox').val('');
			console.log(data);
		})
	})

	$('#edit').on('click', function(e) {
		e.preventDefault();
		$.ajax({
			type: "PUT",
			url: "/resources/1/comments/" + comment_id,
			data: { comment: $('#textbox').val() },
			success: function(data) {
				console.log(data);
			}
		})
	})

	$('#delete').on('click', function(e) {
		e.preventDefault();
		$.ajax({
			type: "DELETE",
			url: "/resources/1/comments/" + comment_id,
			data: { comment: $('#textbox').val() },
			success: function(data) {
				console.log(data);
			}
		})
	})

	$('#upvote').on('click', function(e) {
		e.preventDefault();
		$.ajax({
			type: "PUT",
			url: "/resources/1/comments/" + comment_id + "/vote?vote_status=up",
			success: function(data) {
				console.log(data);
			}
		})
	})

	$('#downvote').on('click', function(e) {
		e.preventDefault();
		$.ajax({
			type: "PUT",
			url: "/resources/1/comments/" + comment_id + "/vote?vote_status=down",
			success: function(data) {
				console.log(data);
			}
		})
	})

	$('#novote').on('click', function(e) {
		e.preventDefault();
		$.ajax({
			type: "PUT",
			url: "/resources/1/comments/" + comment_id + "/vote?vote_status=none",
			success: function(data) {
				console.log(data);
			}
		})
	})

	var container = $('.container');

	function recurse(children) {
		for (key in children) {
			// console.log(key);
			if (children.hasOwnProperty(key)) {
				var path = children[key].path;
				var pathArr = path.split(",");
				var comment = $('<div/>', {
						id: key,
						text: children[key].text,
						"data-path": path,
					})
				if (pathArr.length === 1) {
					container.append(comment);
				} else {
					comment.addClass('child');
					// $('#' + pathArr[pathArr.length - 1]).append(comment);
					container.append(comment);
				}

				if (children[key].children) {
					recurse(children[key].children);
				}
			}
		}
	}

	$('#getComments').on('click', function(e) {
		e.preventDefault();
		$.ajax({
			type: "GET",
			url: "resources/1/comments",
			success: function(data) {
				console.log(data);
				data.forEach(function(c) {
					recurse(c);
				})
			}
		})
	})
})