require('dotenv').config()
const ArticleTranslator = require('../../translate/articles-translator')
const ArticleDbService = require('../../db-service/article-db-service')
const logger = require('../../config/logger')

module.exports = async function () {
	var timeStamp = new Date().toISOString()

	const articles = await ArticleDbService.getArticles({ status: 'scraped' })

	if (articles && articles.length > 0) {
		const { articles: translatedArticles } = await ArticleTranslator.translateArticles(articles.slice(0, 5))

		await ArticleDbService.updateArticles(translatedArticles).catch((error) =>
			logger.error('printing save failure reason', error)
		)
	}

	logger.info('Translate articles job finished!', { timeStamp })
}
