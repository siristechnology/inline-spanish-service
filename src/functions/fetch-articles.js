import ContentFetcher from '../scrappers/content-fetcher'

exports.handler = async () => {
	const articles = await ContentFetcher.fetchArticles()

	console.log('Printing links', articles)

	return { statusCode: 200, body: JSON.stringify({ success: 'true', articles }) }
}
