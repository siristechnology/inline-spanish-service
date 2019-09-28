const ArticleDbService = require('../db-service/article-db-service')
const Sources = require('../scrappers/config/source-configs.json')

module.exports = {
	Query: {
		fetchArticles: async (parent, args) => {
			args.criteria = args.criteria || {}
			args.criteria.lastQueryDate = args.criteria.lastQueryDate || new Date('2001-01-01')

			let articles = await ArticleDbService.getArticles()

			const articlesWithSource = articles.map(article => {
				article.source = Sources.find(s => s.name === article.source)
				return article
			})

			return articlesWithSource
		}
	}
}
