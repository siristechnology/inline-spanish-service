const NewsCrawler = require('news-crawler')
const SourceConfig = require('../config/source-configs.json')

jest.setTimeout(60000)

describe('content-fetcher', () => {
	it('Medium articles should be fetched successfully', async () => {
		const source = SourceConfig.filter((s) => s.sourceName === 'medium')

		const articles = await NewsCrawler(source, {
			maxArticlesPerPage: 2,
			articleUrlLength: 3,
			headless: true
		})

		console.log('printing articles', articles)

		expect(articles.length).toBeGreaterThan(0)
	})
})
