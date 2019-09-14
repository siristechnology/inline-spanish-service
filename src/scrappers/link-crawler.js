const axios = require('axios')
const cheerio = require('cheerio')
const URL = require('url')

module.exports = async function(config) {
	try {
		const response = await axios({
			url: config.url,
			headers: {
				'cache-control': 'max-age=0',
				accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
				'user-agent':
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) \
						Chrome/76.0.3809.132 Safari/537.36 OPR/63.0.3368.75'
			}
		})

		let $ = cheerio.load(response.data)

		const baseUrl = `https://${URL.parse(config.url).host}`

		let links = []
		$(config['links-selector']).each(function(index, element) {
			let link = $(element).attr('href')

			if (!link.startsWith('https://')) {
				link = `${baseUrl}${link}`
			}
			links.push(link)
		})

		return { links: links }
	} catch (error) {
		console.log('Printing error', error)
		return { message: 'Error while crawling links' }
	}
}
