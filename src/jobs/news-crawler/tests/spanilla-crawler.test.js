const SpanillaCrawler = require('../index')
const ContentFetcher = require('../../../scrappers/content-fetcher')
const articleDbService = require('../../../db-service/article-db-service')

require('mongoose')

jest.mock('../../../scrappers/content-fetcher')
jest.mock('../../../db-service/article-db-service')
jest.mock('mongoose')

describe('spanilla-crawler unit', () => {
	it('function should call ContentFetcher and articleDbService', async () => {
		const articles = [{}]

		const spyFetchArticles = jest.spyOn(ContentFetcher, 'fetchArticles').mockImplementation(() => {
			return { articles }
		})

		const spySaveArticles = jest.spyOn(articleDbService, 'saveArticles').mockImplementation(() => {
			return { catch: jest.fn() }
		})

		await SpanillaCrawler(console, {})

		expect(spyFetchArticles).toHaveBeenCalled()
		expect(spySaveArticles).toHaveBeenCalled()
	})
})
