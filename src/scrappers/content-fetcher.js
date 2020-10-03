const NewsCrawler = require('news-crawler')

module.exports = {
	fetchArticles: async function (maxArticlesPerPage) {
		const SourceConfig = require('../scrappers/config/source-configs.json')

		const articles = await NewsCrawler(SourceConfig.slice(0, 1), {
			maxArticlesPerPage,
			articleUrlLength: maxArticlesPerPage,
			headless: true
		})

		let modifiedArticles = []

		articles.forEach((article) => {
			article.status = 'scraped'
			article.source = article.sourceName
			article.contentText = article.content
			article.lead_image_url = article.imageLink

			if (article.contentText.length > 200) modifiedArticles.push(article)
		})

		return { articles: modifiedArticles }
	}
}
