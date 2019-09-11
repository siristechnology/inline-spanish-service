import ContentFetcher from '../scrappers/content-fetcher'
import GoogleTranslate from '../translate/google-translate'

export default {
	fetchTranslatedArticles: async function() {
		const { articles } = await ContentFetcher.fetchArticles()

		let translatedArticles = []

		for (const article of articles) {
			const translatedContent = await GoogleTranslate.translateArticle(article.contentText, 'es')
			const translatedArticle = { translatedContent }
			translatedArticles.push(translatedArticle)
		}

		return { articles: translatedArticles }
	}
}
