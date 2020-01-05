import fetchLinks from '../link-crawler'

jest.setTimeout(60000)

describe('content-fetcher', () => {
	it('fetchLinks show return list of links', async () => {
		process.env.MAX_NO_OF_ARTICLES_PER_SOURCE_PER_RUN = 5

		const sourceConfig = require('../config/source-configs.json')
		const { articleLinks } = await fetchLinks(sourceConfig)

		expect(articleLinks.filter(a => a.source == 'cnn').length).toEqual(5)
	})
})
