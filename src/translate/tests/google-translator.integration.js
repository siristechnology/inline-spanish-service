import GoogleTranslator from '../google-translator'

jest.setTimeout(20000)

describe('google-translate', () => {
	it('googleTranslate should translate strings successfully', async () => {
		const translation = await GoogleTranslator.googleTranslate('My name is Suraj', 'es')

		expect(translation).toBe('Mi nombre es Suraj')
	})

	it('translateArticle should contain both english and spanish translation', async () => {
		const translation = await GoogleTranslator.translateArticle('My name is Suraj', 'es')

		expect(translation.originalContent).toContain('My name is Suraj')
		expect(translation.translatedContent).toContain('Mi nombre es Suraj')
	})

	it('breakLongTextIntoSentences should break long-text into sentences array', () => {
		const sentenceArray = GoogleTranslator.breakLongTextIntoSentences('My name is Suraj.\n Your name is Anil.\n')
		expect(sentenceArray[1]).toContain('Your name is Anil.')
	})

	it('translateArticle should return array of strings in english and spanish', async () => {
		const translation = await GoogleTranslator.translateArticle(
			'Static-site-generator tools like Gatsby are awesome',
			'es'
		)

		expect(translation.originalContent[0].includes('Static-site-generator tools like Gatsby are awesome')).toBe(
			true
		)
		expect(
			translation.translatedContent[0].includes(
				'Las herramientas generadoras de sitios estáticos como Gatsby son increíbles'
			)
		).toBe(true)

		expect(translation.originalContent.length).toEqual(translation.translatedContent.length)
	})
})
