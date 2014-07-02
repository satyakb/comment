$(function() {
	// $('.send-btn').on('click', function(e) {
	// 	$.post('/users/message', {
	// 		message: $('.send-input').val()
	// 	}, function(data) {
	// 		console.log(data.message);
	// 	})
	// 	e.preventDefault();
	// })

	var comment_id = '53b457c35112500000420711';

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

	$('#getComments').on('click', function(e) {
		e.preventDefault();
		$.ajax({
			type: "GET",
			url: "resources/1/comments",
			success: function(data) {
				console.log(data);
				// data.forEach(function(c) {
				// 	$('.container').append('<div>' + c.text + '</div>');
				// })
			}
		})
	})
})