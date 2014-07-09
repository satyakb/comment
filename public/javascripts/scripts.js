$(function() {

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
	
})