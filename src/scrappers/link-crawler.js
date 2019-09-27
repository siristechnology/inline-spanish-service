const axios = require('axios')
const cheerio = require('cheerio')
const URL = require('url')

module.exports = async function(sourceConfigs) {
	try {
		let articleLinks = []

		for (const config of sourceConfigs) {
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
						articleLinks.push({ articleUrl, source: config.name })
					})
				}
			}
		}

		return { articleLinks: articleLinks }
	} catch (error) {
		console.log('Printing error', error)
		return { message: 'Error while crawling links' }
	}
}
