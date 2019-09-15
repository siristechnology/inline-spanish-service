require('dotenv').config()
const mongoose = require('mongoose')
const { Article } = require('./mongooseSchema')

mongoose.promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = {
	saveArticles: async articles => {
		try {
			return await Article.insertMany(articles, { ordered: true, strict: 'throw' })
		} catch (error) {
			if (error.code === 11000 || error.code === 11001) {
				console.log('ignored duplicates')
			} else {
				console.log(error)
			}
		}
		return null
	},

	deleteArticles: async _ids => {
		return await Article.deleteMany({ _id: { $in: _ids } })
	},

	getArticles: async () => {
		return await Article.find()
			.sort({ _id: -1 })
			.limit(50)
	},

	doesExist: async newslink => {
		const count = await Article.count({ link: newslink })
		return count > 0
	}
}
