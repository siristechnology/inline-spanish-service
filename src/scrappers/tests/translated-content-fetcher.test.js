import TranslatedContentFetcher from '../translated-content-fetcher'

jest.setTimeout(20000)

describe('TranslatedContentFetcher', () => {
	it('fetchTranslatedArticles should fetch articles successfully', async () => {
		const { articles } = await TranslatedContentFetcher.fetchTranslatedArticles()

		expect(articles[0].originalContent.length).toBeGreaterThan(1)
		expect(articles[0].translatedContent.length).toBeGreaterThan(1)
		expect(articles.length).toBeGreaterThan(5)
	})
})
