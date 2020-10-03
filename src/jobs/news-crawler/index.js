require('dotenv').config()
const ContentFetcher = require('../../scrappers/content-fetcher')
const articleDbService = require('../../db-service/article-db-service')
const logger = require('../../config/logger')

module.exports = async function (context) {
	const { articles } = await ContentFetcher.fetchArticles(process.env.MAX_NO_OF_ARTICLES_PER_PAGE || 1)

	if (articles && articles.length > 0) {
		await articleDbService
			.saveArticles(articles, context)
			.catch((error) => logger.error('printing save failure reason', error))
	}

	const timeStamp = new Date().toISOString()
	logger.info('crawl articles job finished!', { timeStamp })
}
