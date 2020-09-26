import ContentFetcher from '../content-fetcher'

jest.setTimeout(60000)

describe('content-fetcher', () => {
	it('fetchArticles should fetch articles successfully', async () => {
		const { articles } = await ContentFetcher.fetchArticles()

		expect(articles.length).toBeGreaterThan(2)
	})

	it('scrapeArticleLink should scrape a given article link', async () => {
		const article = await ContentFetcher.scrapeArticleLink(
			'https://medium.com/siristechnology/how-to-run-node-express-backend-for-gatsby-app-87ee63b14ee9'
		)

		expect(article.contentText.length).toBeGreaterThan(10)
	})
})
