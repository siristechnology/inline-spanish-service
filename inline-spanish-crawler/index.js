const ContentFetcher = require('../src/scrappers/content-fetcher')
const articleDbService = require('../src/db-service/article-db-service')

module.exports = async function(context, myTimer) {
	var timeStamp = new Date().toISOString()

	if (myTimer.IsPastDue) {
		context.log('JavaScript is running late!')
	}

	const { articles } = await ContentFetcher.fetchArticles()

	if (articles && articles.length > 0) {
		await articleDbService
			.saveArticles(articles, context)
			.catch(reason => context.log('printing save failure reason', reason))
	}

	context.log('JavaScript timer trigger function ran!', timeStamp)
}
