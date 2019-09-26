const fetchLinks = require('./link-crawler')
const Mercury = require('@postlight/mercury-parser')
const htmlToText = require('html-to-text')

module.exports = {
	fetchArticles: async function() {
		const sourceConfigs = this.getConfigs()
		let { articleUrls } = await fetchLinks(sourceConfigs)

		articleUrls = articleUrls.slice(0, 500)

		let articles = []
		for (const articleUrl of articleUrls) {
			const article = await this.scrapeArticleLink(articleUrl)
			article.status = 'scraped'

			if (article.contentText.length > 200) articles.push(article)
		}

		return { articles: articles }
	},

	scrapeArticleLink: async function(url) {
		return new Promise((resolve, reject) => {
			Mercury.parse(url)
				.then(result => {
					result.contentText = htmlToText.fromString(result.content).replace(/\[[^\]]*\]/g, '')
					resolve(result)
				})
				.catch(reason => {
					console.log('Printing reason', reason)
					reject(reason)
				})
		})
	},

	getConfigs: function() {
		return require('../scrappers/config/source-configs.json')
	}
}
