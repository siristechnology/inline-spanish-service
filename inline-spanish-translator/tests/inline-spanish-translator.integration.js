const InlineSpanishTranslator = require('../index')

jest.setTimeout(20000)

describe('inline-spanish-translator integration', () => {
	it('run function', async () => {
		await InlineSpanishTranslator(console, {})
	})
})
