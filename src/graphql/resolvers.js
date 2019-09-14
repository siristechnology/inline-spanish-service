const TranslatedContentFetcher = require('../scrappers/translated-content-fetcher')

module.exports = {
	Query: {
		fetchArticles: async (parent, args) => {
			args.criteria = args.criteria || {}
			args.criteria.lastQueryDate = args.criteria.lastQueryDate || new Date('2001-01-01')

			const { articles } = await TranslatedContentFetcher.fetchTranslatedArticles()
			return articles
		}
	}
}
