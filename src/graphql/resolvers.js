const ArticleDbService = require('../db-service/article-db-service')

module.exports = {
	Query: {
		fetchArticles: async (parent, args) => {
			args.criteria = args.criteria || {}
			args.criteria.lastQueryDate = args.criteria.lastQueryDate || new Date('2001-01-01')

			const articles = await ArticleDbService.getArticles()
			return articles
		}
	}
}
