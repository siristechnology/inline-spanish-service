require('dotenv').config()
const mongoose = require('mongoose')
const { Article } = require('./mongooseSchema')

mongoose.promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = {
	saveArticles: async articles => {
		try {
			const savePromises = articles.map(article => Article.create(article))
			return await Promise.all(savePromises)
		} catch (error) {
			if (error.code === 11000 || error.code === 11001) {
				console.log('ignored duplicates')
			} else {
				console.log(error)
			}
		}
		return null
	},

	updateArticles: async articles => {
		try {
			const updatePromises = articles.map(article => {
				const articleUpdate = JSON.parse(JSON.stringify(article))
				delete articleUpdate._id

				return Article.updateOne({ _id: article.id }, { $set: { ...articleUpdate } })
			})
			return await Promise.all(updatePromises)
		} catch (error) {
			console.log(error)
		}
		return null
	},

	deleteArticles: async _ids => {
		return await Article.deleteMany({ _id: { $in: _ids } })
	},

	getArticles: async conditions => {
		return await Article.find(conditions)
			.lean()
			.sort({ _id: -1 })
			.limit(100)
	},

	doesExist: async newslink => {
		const count = await Article.count({ link: newslink })
		return count > 0
	}
}
