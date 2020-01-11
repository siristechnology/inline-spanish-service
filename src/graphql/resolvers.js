const ArticleDbService = require('../db-service/article-db-service')
let Sources = require('../scrappers/config/source-configs.json')

module.exports = {
	Query: {
		fetchArticles: async (parent, args) => {
			args.criteria = args.criteria || {}
			args.criteria.lastQueryDate = args.criteria.lastQueryDate || new Date('2001-01-01')

			let articles = await ArticleDbService.getArticles({ status: 'translated' })
			articles = articles.slice(0, 100)

			const articlesWithSource = articles.map((article) => {
				Sources = Sources.map((s) => {
					return { ...s, logoLink: process.env.SERVER_BASE_URL + s.logoLink }
				})

				article.source = Sources.find((s) => s.name === article.source)
				return article
			})

			return articlesWithSource
		}
	}
}
