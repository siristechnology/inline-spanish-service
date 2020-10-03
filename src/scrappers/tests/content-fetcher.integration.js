import ContentFetcher from '../content-fetcher'

jest.setTimeout(60000)

describe('content-fetcher', () => {
	it('fetchArticles should fetch articles successfully', async () => {
		const { articles } = await ContentFetcher.fetchArticles()

		console.log('printing articles', articles)

		expect(articles.length).toBeGreaterThan(2)
	})
})
