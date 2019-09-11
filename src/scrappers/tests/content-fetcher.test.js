import ContentFetcher from '../content-fetcher'

jest.setTimeout(20000)

describe('content-fetcher', () => {
	it(' should fetch articles successfully', async () => {
		const { articles } = await ContentFetcher.fetchArticles()

		console.log('Printing articles', articles)

		expect(articles.length).toBeGreaterThan(5)
	})
})
