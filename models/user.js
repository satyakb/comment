var mongoose = require('mongoose');
var materializedPlugin = require('mongoose-materialized');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

/**
 * User Schema
 */
var UserSchema = new Schema({
	user_id: Number,
  	user_name: String,
  	email: String
});


UserSchema.plugin(materializedPlugin);

mongoose.model('User', UserSchema);