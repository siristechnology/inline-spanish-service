const InlineSpanishCrawler = require('../index')
const ContentFetcher = require('../../src/scrappers/content-fetcher')
const articleDbService = require('../../src/db-service/article-db-service')
require('mongoose')

jest.mock('../../src/scrappers/content-fetcher')
jest.mock('../../src/db-service/article-db-service')
jest.mock('mongoose')

describe('inline-spanish-crawler unit', () => {
	it('function should call ContentFetcher and articleDbService', async () => {
		const articles = [{}]

		const spyFetchArticles = jest.spyOn(ContentFetcher, 'fetchArticles').mockImplementation(() => {
			return { articles }
		})

		const spySaveArticles = jest.spyOn(articleDbService, 'saveArticles').mockImplementation(() => {
			return { catch: jest.fn() }
		})

		await InlineSpanishCrawler(console, {})

		expect(spyFetchArticles).toHaveBeenCalled()
		expect(spySaveArticles).toHaveBeenCalled()
	})
})
