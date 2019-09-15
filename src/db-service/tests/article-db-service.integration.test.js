require('dotenv').config()
const articleDbService = require('../article-db-service')
const mongoose = require('mongoose')

mongoose.promise = global.Promise
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

describe('article-db-service', () => {
	it('saveArticle should save an article successfully.', async () => {
		const article = {
			title: 'dummy title',
			url: 'url',
			content: 'content'
		}
		const articlesSaved = await articleDbService.saveArticles([article])

		expect(articlesSaved[0]._id).not.toBeNull()
		expect(articlesSaved[0].date_created).not.toBeUndefined()
		expect(articlesSaved[0].date_modified).not.toBeUndefined()

		await articleDbService.deleteArticles({ _id: articlesSaved[0]._id })
	})

	it('saveArticle should not save publishedDate by default.', async () => {
		const article = {
			title: 'dummy title',
			link: 'link',
			imageLink: 'imageLink'
		}
		const articlesSaved = await articleDbService.saveArticles([article])

		expect(articlesSaved[0].publishedDate).toBeUndefined()

		await articleDbService.deleteArticles({ _id: articlesSaved[0]._id })
	})

	it('saveArticle should save given publishedDate.', async () => {
		const date1 = new Date(2013, 4, 30, 16, 5)
		const article = { title: 'dummy title', publishedDate: date1 }
		const articlesSaved = await articleDbService.saveArticles([article])

		expect(articlesSaved[0].publishedDate).to.equal(date1)
	})

	it('saveArticles() should save source too.', async () => {
		const date1 = new Date(2013, 4, 30, 16, 5)
		const sources = await articleDbService.getAllSources()
		const article = {
			title: 'dummy title',
			publishedDate: date1,
			source: sources[0]._id
		}
		const articlesSaved = await articleDbService.saveArticles([article])

		expect(articlesSaved[0].source._id).to.equal(sources[0]._id)
	})

	it('saveArticles() should save multile sources', async () => {
		const article1 = { title: 'dummy title' }
		const article2 = { title: 'dummy title 2' }
		const articlesSaved = await articleDbService.saveArticles([article1, article2])

		expect(articlesSaved[1]).to.not.be.undefined
	})
})

describe('newsDbService', () => {
	it('getArticles() should fetch news from mongodb.', async () => {
		const articles = await articleDbService.getArticles()
		expect(articles).to.have.length.greaterThan(0)
	})
})

describe('newsDbService', () => {
	it('getAllSources() should all sources.', async () => {
		const sources = await articleDbService.getAllSources()
		expect(sources).to.have.length.greaterThan(1)
	})
})
