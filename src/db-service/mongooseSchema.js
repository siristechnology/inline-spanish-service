const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Article = mongoose.model(
	'Article',
	new Schema({
		title: { type: String, required: true },
		url: { type: String, required: true, unique: true },
		lead_image_url: String,
		excerpt: String,
		content: { type: String, required: true },
		source: String,
		author: String,
		date_published: Date,
		date_created: { type: Date, default: Date.now },
		date_modified: { type: Date, default: Date.now }
	})
)

module.exports = {
	Article
}
