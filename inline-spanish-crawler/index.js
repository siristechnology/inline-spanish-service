const TranslatedContentFetcher = require('../src/scrappers/translated-content-fetcher')
const articleDbService = require('../src/db-service/article-db-service')

module.exports = async function(context, myTimer) {
	var timeStamp = new Date().toISOString()

	if (myTimer.IsPastDue) {
		context.log('JavaScript is running late!')
	}

	const { articles } = await TranslatedContentFetcher.fetchTranslatedArticles()

	await articleDbService.saveArticles(articles)

	context.log('JavaScript timer trigger function ran!', timeStamp)
}
