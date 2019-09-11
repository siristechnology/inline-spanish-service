import TranslatedContentFetcher from '../scrappers/translated-content-fetcher'

exports.resolver = {
	Query: {
		fetchArticles: async (parent, args) => {
			console.log('Printing args', args)

			args.criteria = args.criteria || {}
			args.criteria.lastQueryDate = args.criteria.lastQueryDate || new Date('2001-01-01')

			const articles = await TranslatedContentFetcher.fetchTranslatedArticles()
			return articles
		}
	}
}
