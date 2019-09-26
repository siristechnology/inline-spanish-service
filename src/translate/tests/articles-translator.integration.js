import ArticleTranslator from '../articles-translator'

jest.setTimeout(20000)

describe('articles-translator', () => {
	it('translateArticles should translate articles successfully', async () => {
		const inputArticles = require('./sample-article.json')

		console.log('Printing inputArticles', inputArticles)

		const { articles } = await ArticleTranslator.translateArticles(inputArticles)

		console.log('Printing articles', articles)

		expect(articles[0].original_content.length).toBeGreaterThan(1)
		expect(articles[0].translated_content.length).toBeGreaterThan(1)
	})
})
