const NewsCrawler = require('news-crawler')
const SourceConfig = require('../config/source-configs.json')

jest.setTimeout(60000)

describe('content-fetcher', () => {
	it('fetchArticles should fetch articles successfully', async () => {
		const source = SourceConfig.filter((s) => s.sourceName === 'bbc')

		const articles = await NewsCrawler(source, {
			maxArticlesPerPage: 2,
			articleUrlLength: 3,
			headless: true
		})

		expect(articles.length).toBeGreaterThan(0)
	})
})
