const ArticleTranslator = require('../src/translate/articles-translator')
const ArticleDbService = require('../src/db-service/article-db-service')

module.exports = async function(context, myTimer) {
	var timeStamp = new Date().toISOString()

	if (myTimer.IsPastDue) {
		context.log('JavaScript is running late!')
	}

	const { articles } = await ArticleDbService.getArticles({ status: 'scrapped' })

	if (articles.length > 0) {
		await ArticleTranslator.translateArticles(articles)
		await ArticleDbService.saveArticles(articles).catch(reason =>
			context.log('printing save failure reason', reason)
		)
	}

	context.log('JavaScript timer trigger function ran!', timeStamp)
}
