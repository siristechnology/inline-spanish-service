import ContentFetcher from '../scrappers/content-fetcher'
import GoogleTranslate from '../translate/google-translate'

export default {
	fetchTranslatedArticles: async function() {
		const { articles } = await ContentFetcher.fetchArticles()

		let translatedArticles = []

		for (const article of articles) {
			const translatedContent = await GoogleTranslate.translateArticle(article.contentText, 'es')

			const translatedArticle = {
				title: article.title,
				url: article.url,
				lead_image_url: article.lead_image_url,
				excerpt: article.excerpt,
				author: article.author,
				content: translatedContent,
				date_published: article.date_published
			}
			translatedArticles.push(translatedArticle)
		}

		return { articles: translatedArticles }
	}
}
