import TranslatedContentFetcher from '../scrappers/translated-content-fetcher'

exports.handler = async () => {
	const articles = await TranslatedContentFetcher.fetchTranslatedArticles()

	return { statusCode: 200, body: JSON.stringify({ success: 'true', articles }) }
}
