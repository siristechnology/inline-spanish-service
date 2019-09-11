import fetchLinks from './link-crawler'

export default {
	fetchArticles: async function() {
		const config = this.getConfig('medium')
		const links = await fetchLinks(config)
		return links
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
