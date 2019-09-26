const InlineSpanishCrawler = require('../index')

jest.setTimeout(20000)

describe('inline-spanish-crawler integration', () => {
	it('Integration test', async () => {
		await InlineSpanishCrawler(console, {})
	})
})
