const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Article = mongoose.model(
	'Article',
	new Schema({
		title: { type: String, required: true, unique: true },
		url: { type: String, required: true, unique: true },
		lead_image_url: { type: String, required: true },
		excerpt: String,
		contentText: String,
		original_content: { type: [String], required: true },
		translated_content: { type: [String], required: true },
		likes: Number,
		source: String,
		category: String,
		author: String,
		status: String,
		date_published: { type: Date, default: Date.now },
		date_created: { type: Date, default: Date.now },
		date_modified: { type: Date, default: Date.now }
	})
)

module.exports = {
	Article
}
