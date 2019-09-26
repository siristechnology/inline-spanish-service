require('dotenv').config()
const ArticleDbService = require('../article-db-service')
const { Article } = require('../mongooseSchema')

describe('article-db-service', () => {
	it('updateArticles should update an article', async () => {
		const article = {
			title: `dummy title ${Math.random()}`,
			url: `url${Math.random()}`,
			contentText: 'contentText'
		}
		let articlesSaved = await ArticleDbService.saveArticles([article])

		expect.assertions(3)
		expect(articlesSaved[0]._id).not.toBeNull()
		expect(articlesSaved[0].date_created).not.toBeUndefined()

		articlesSaved[0].title = 'updated title'

		await ArticleDbService.updateArticles(articlesSaved)

		await new Promise(resolve => {
			setTimeout(async () => {
				const updatedArticle = await Article.findById(articlesSaved[0]._id)
				expect(updatedArticle.title).toContain('updated title')

				resolve()
			}, 3000)
		})

		await await ArticleDbService.deleteArticles([articlesSaved[0]._id])
	})
})
