import TranslatedContentFetcher from '../translated-content-fetcher'

jest.setTimeout(20000)

describe('TranslatedContentFetcher', () => {
	it('fetchTranslatedArticles should fetch articles successfully', async () => {
		const { articles } = await TranslatedContentFetcher.fetchTranslatedArticles()

		expect(articles.length).toBeGreaterThan(5)
	})
})
