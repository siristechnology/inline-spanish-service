const GoogleTranslator = require('./google-translator')

module.exports = {
	translateArticles: async function(articles) {
		for (const article of articles) {
			const shortenedText = article.contentText.slice(0, 5000)

			if (shortenedText.length > 100) {
				const translateResult = await GoogleTranslator.translateArticle(shortenedText, 'es')

				if (translateResult.status !== 'fail') {
					article.original_content = translateResult.originalContent
					article.translated_content = translateResult.translatedContent
					article.status = 'translated'
				}
			}
		}

		return { articles: articles }
	}
}
