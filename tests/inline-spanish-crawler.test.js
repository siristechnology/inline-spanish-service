const InlineSpanishCrawler = require('../inline-spanish-crawler/index')
const TranslatedContentFetcher = require('../src/scrappers/translated-content-fetcher')
const articleDbService = require('../src/db-service/article-db-service')

jest.mock('../src/scrappers/translated-content-fetcher')
jest.mock('../src/db-service/article-db-service')

describe('inline-spanish-crawler', () => {
	it('function should call TranslatedContentFetcher and articleDbService', async () => {
		const articles = {}

		const spyFetchTranslatedArticles = jest
			.spyOn(TranslatedContentFetcher, 'fetchTranslatedArticles')
			.mockImplementation(() => articles)

		const spySaveArticles = jest.spyOn(articleDbService, 'saveArticles').mockImplementation(() => {})

		await InlineSpanishCrawler(console, {})

		expect(spyFetchTranslatedArticles).toHaveBeenCalled()
		expect(spySaveArticles).toHaveBeenCalled()
	})
})
