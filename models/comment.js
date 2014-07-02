var mongoose = require('mongoose');
var materializedPlugin = require('mongoose-materialized');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
	deleted: Boolean,
	text: String,
  	date_posted: {type: Date, default: Date.now},
  	resource_id: Number,
  	user_id: {type: Number, ref: 'User'},
 	votes: [{
 		user_id: {type: Number, ref: 'User' },
 		vote_status: Number 
 	}],
 	flags: [{
 		user_id: {type: Number, ref: 'User' },
 		flag_status: String
 	}]
});


CommentSchema.plugin(materializedPlugin);

mongoose.model('Comment', CommentSchema);