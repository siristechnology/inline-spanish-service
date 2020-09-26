const ArticleDbService = require('../db-service/article-db-service')
let Sources = require('../scrappers/config/source-configs.json')
const logger = require('../config/logger')
const getWeather = require('../weather')

Sources = Sources.map((s) => {
	return { ...s, logoLink: process.env.SERVER_BASE_URL + s.logoLink }
})

module.exports = {
	Query: {
		fetchArticles: async (parent, args) => {
			args.criteria = args.criteria || {}
			args.criteria.lastQueryDate = args.criteria.lastQueryDate || new Date('2001-01-01')

			let articles = await ArticleDbService.getArticles({ status: 'translated' })
			articles = articles.slice(0, 100)

			const articlesWithSource = articles.map((article) => {
				article.source = Sources.find((s) => s.name === article.source)
				return article
			})

			return articlesWithSource
		},

		getWeatherInfo: async (parent, args, { ipAddress }) => {
			try {
				if (ipAddress === '::1' || ipAddress === '::ffff:127.0.0.1') ipAddress = '27.111.16.0'
				logger.debug(`Printing ip: ${ipAddress}`)

				const weatherInfo = await getWeather(ipAddress)
				weatherInfo.ipAddress = ipAddress

				return {
					ipAddress: ipAddress,
					temperature: weatherInfo.main.temp,
					condition: weatherInfo.weather[0].main,
					description: weatherInfo.weather[0].description,
					place: weatherInfo.name
				}
			} catch (error) {
				logger.error({ error: error.stack })
				throw error
			}
		}
	}
}
