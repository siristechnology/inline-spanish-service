require('dotenv').config()
const articleDbService = require('../article-db-service')
const mongoose = require('mongoose')

mongoose.promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

describe('article-db-service', () => {
	it('saveArticle should save an article successfully.', async () => {
		const article = {
			title: 'dummy title',
			url: `url${Math.random()}`,
			content: 'content'
		}
		const articlesSaved = await articleDbService.saveArticles([article])

		expect(articlesSaved[0]._id).not.toBeNull()
		expect(articlesSaved[0].date_created).not.toBeUndefined()
		expect(articlesSaved[0].date_modified).not.toBeUndefined()

		await await articleDbService.deleteArticles([articlesSaved[0]._id])
	})

	it('saveArticle should not save date_published by default.', async () => {
		const article = {
			title: 'dummy title',
			url: `url${Math.random()}`,
			content: 'content'
		}
		const articlesSaved = await articleDbService.saveArticles([article])

		expect(articlesSaved[0].date_published).toBeUndefined()

		await await articleDbService.deleteArticles([articlesSaved[0]._id])
	})

	it('saveArticle should save given date_published.', async () => {
		const date1 = new Date(2013, 4, 30, 16, 5)
		const article = {
			title: 'dummy title',
			url: `url${Math.random()}`,
			content: 'content',
			date_published: date1
		}

		const articlesSaved = await articleDbService.saveArticles([article])

		expect(articlesSaved[0].date_published).toEqual(date1)

		await articleDbService.deleteArticles([articlesSaved[0]._id])
	})

	it('saveArticles should save multile articles', async () => {
		const article1 = {
			title: 'dummy title',
			url: `url${Math.random()}`,
			content: 'content'
		}
		const article2 = {
			title: 'dummy title',
			url: `url${Math.random()}`,
			content: 'content'
		}
		const articlesSaved = await articleDbService.saveArticles([article1, article2])

		expect(articlesSaved[0]).toBeDefined()
		expect(articlesSaved[1]).toBeDefined()

		await articleDbService.deleteArticles([articlesSaved[0]._id, articlesSaved[1]._id])
	})
})

describe('article-db-service', () => {
	it('getArticles should fetch news from mongodb.', async () => {
		const article1 = { title: 'dummy title', url: `url${Math.random()}`, content: 'content' }
		const articlesSaved = await articleDbService.saveArticles([article1])

		const articles = await articleDbService.getArticles()
		expect(articles.length).toBeGreaterThan(0)

		await articleDbService.deleteArticles([articlesSaved[0]._id])
	})
})
