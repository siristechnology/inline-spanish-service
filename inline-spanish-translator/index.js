const ArticleTranslator = require('../src/translate/articles-translator')
const ArticleDbService = require('../src/db-service/article-db-service')

module.exports = async function(context, myTimer) {
	var timeStamp = new Date().toISOString()

	if (myTimer.IsPastDue) {
		context.log('JavaScript is running late!')
	}

	const articles = await ArticleDbService.getArticles({ status: 'scraped' })

	if (articles && articles.length > 0) {
		const { articles: translatedArticles } = await ArticleTranslator.translateArticles(articles.slice(0, 20))

		await ArticleDbService.updateArticles(translatedArticles).catch(reason =>
			context.log('printing save failure reason', reason)
		)
	}

	context.log('JavaScript timer trigger function ran!', timeStamp)
}
