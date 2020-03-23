require('dotenv').config()
const axios = require('axios')
const cheerio = require('cheerio')
const URL = require('url')
const logger = require('../config/logger')

module.exports = async function(sourceConfigs) {
	try {
		let articleLinks = []

		for (const config of sourceConfigs) {
			let linksPerSource = []
			for (const link of config.links) {
				const response = await axios({
					url: link.url,
					headers: config.headers
				})

				let $ = cheerio.load(response.data)

				const baseUrl = `https://${URL.parse(link.url).host}`

				for (const linkSelector of link['links-selector']) {
					$(linkSelector).each(function(index, element) {
						let articleUrl = $(element).attr('href')

						if (!articleUrl.startsWith('https://')) {
							articleUrl = `${baseUrl}${articleUrl}`
						}
						linksPerSource.push({ articleUrl, source: config.name })
					})
				}
			}

			articleLinks = articleLinks.concat(
				linksPerSource.slice(0, process.env.MAX_NO_OF_ARTICLES_PER_SOURCE_PER_RUN || 5)
			)
		}

		return { articleLinks: articleLinks }
	} catch (error) {
		logger.error('Printing error', error)
		return { message: 'Error while crawling links' }
	}
}
