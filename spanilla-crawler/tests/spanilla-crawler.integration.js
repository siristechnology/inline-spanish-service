const SpanillaCrawler = require('../index')

jest.setTimeout(20000)

describe('spanilla-crawler integration', () => {
	it('Integration test', async () => {
		await SpanillaCrawler(console, {})
	})
})
