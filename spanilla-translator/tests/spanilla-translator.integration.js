const SpanillaTranslator = require('../index')

jest.setTimeout(20000)

describe('spanilla-translator integration', () => {
	it('run function', async () => {
		await SpanillaTranslator(console, {})
	})
})
