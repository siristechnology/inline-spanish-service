import fetchLinks from './link-crawler'
import Mercury from '@postlight/mercury-parser'

export default {
	fetchArticles: async function() {
		const config = this.getConfig('medium')
		let { links } = await fetchLinks(config)
		links = links.slice(0, 10)

		let artciles = []
		for (const link of links) {
			const artcile = await this.scrapeArticleLink(link)
			artciles.push(artcile)
		}

		return { articles: artciles }
	},

	scrapeArticleLink: async function(url) {
		return new Promise((resolve, reject) => {
			Mercury.parse(url)
				.then(result => {
					console.log('Printing result', result)
					resolve(result)
				})
				.catch(reason => {
					console.log('Printing reason', reason)
					reject(reason)
				})
		})
	},

	getConfig: function(source) {
		switch (source) {
			case 'medium':
				return require('./config/medium-config.json')
			default:
				break
		}
	}
}
