const { Article } = require('./mongooseSchema')

module.exports = {
	saveArticles: async articles => {
		try {
			return await Article.insertMany(articles, { ordered: false, strict: 'throw' })
		} catch (error) {
			if (error.code === 11000 || error.code === 11001) {
				console.log('ignored duplicates')
			} else {
				console.log(error)
			}
		}
		return null
	},

	deleteArticles: async conditions => {
		return await Article.deleteMany(conditions)
	},

	getArticles: async () => {
		const newsArticles = await Article.find()
		return newsArticles
	},

	doesExist: async newslink => {
		const count = await Article.count({ link: newslink })
		return count > 0
	}
}
