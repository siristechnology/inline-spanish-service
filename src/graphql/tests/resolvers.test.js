require('dotenv').config()
import resolvers from '../resolvers'
import ArticleDbService from '../../db-service/article-db-service'

jest.mock('../../db-service/article-db-service')

describe('resolvers', () => {
	it('fetchArticles Query should call ArticleDbService.getArticles', async () => {
		const spyGetArticles = jest.spyOn(ArticleDbService, 'getArticles')

		const args = { criteria: {} }
		resolvers.Query.fetchArticles(null, args)

		expect(spyGetArticles).toHaveBeenCalled()
	})
})
