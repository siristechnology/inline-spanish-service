const ContentFetcher = require('../scrappers/content-fetcher')
const GoogleTranslate = require('../translate/google-translate')

module.exports = {
	fetchTranslatedArticles: async function() {
		const { articles } = await ContentFetcher.fetchArticles()

		let translatedArticles = []

		for (const article of articles) {
			const shortenedText = article.contentText.slice(0, 5000)
			const translateResult = await GoogleTranslate.translateArticle(shortenedText, 'es')

			const translatedArticle = {
				title: article.title,
				url: article.url,
				lead_image_url: article.lead_image_url,
				excerpt: article.excerpt,
				author: article.author,
				content: shortenedText,
				original_content: translateResult.originalContent,
				translated_content: translateResult.translatedContent,
				date_published: article.date_published
			}
			translatedArticles.push(translatedArticle)
		}

		return { articles: translatedArticles }
	}
}
