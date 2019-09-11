import GoogleTranslate from '../google-translate'

jest.setTimeout(20000)

describe('google-translate', () => {
	it('googleTranslate should translate strings successfully', async () => {
		const translation = await GoogleTranslate.googleTranslate('My name is Suraj', 'es')

		expect(translation).toBe('Mi nombre es Suraj')
	})

	it('translateArticle should contain both english and spanish translation', async () => {
		const translation = await GoogleTranslate.translateArticle('My name is Suraj', 'es')

		expect(translation).toContain('My name is Suraj')
		expect(translation).toContain('Mi nombre es Suraj')
	})
})
