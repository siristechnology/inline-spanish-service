const GoogleTranslator = require('./google-translator')

module.exports = {
	translateArticles: async function(articles) {
		for (const article of articles) {
			const shortenedText = article.contentText.slice(0, 1000)

			if (shortenedText.length > 200) {
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
