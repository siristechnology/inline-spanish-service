const ContentFetcher = require('../src/scrappers/content-fetcher')
const articleDbService = require('../src/db-service/article-db-service')
require('dotenv').config()

module.exports = async function (context) {
	var timeStamp = new Date().toISOString()

	const { articles } = await ContentFetcher.fetchArticles(process.env.MAX_NO_OF_ARTICLES_PER_PAGE || 1)

	if (articles && articles.length > 0) {
		await articleDbService
			.saveArticles(articles, context)
			.catch((reason) => context.log('printing save failure reason', reason))
	}

	context.log('crawl articles job finished!', timeStamp)
}
