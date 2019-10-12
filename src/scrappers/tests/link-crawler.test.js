import fetchLinks from '../link-crawler'
import sourceConfigs from '../config/source-configs.json'

jest.setTimeout(10000)

describe('link-crawler', () => {
	it('should fetch links from medium.com successfully', async () => {
		const mediumSourceConfig = sourceConfigs.filter(config => config.name === 'medium')
		const { articleLinks } = await fetchLinks(mediumSourceConfig)

		expect(articleLinks.length).toBeGreaterThan(2)

		expect(articleLinks.find(articleLink => articleLink.articleUrl.includes('medium.com'))).toBeTruthy()
	})

	it('should fetch links from bbc.com successfully', async () => {
		const bbcSourceConfig = sourceConfigs.filter(config => config.name === 'bbc')
		const { articleLinks } = await fetchLinks(bbcSourceConfig)

		expect(articleLinks.length).toBeGreaterThan(5)

		expect(articleLinks.find(articleLink => articleLink.articleUrl.includes('bbc.com'))).toBeTruthy()
	})

	it('should fetch links from cnn.com successfully', async () => {
		const cnnSourceConfig = sourceConfigs.filter(config => config.name === 'cnn')
		const { articleLinks } = await fetchLinks(cnnSourceConfig)

		expect(articleLinks.length).toBeGreaterThan(5)

		expect(articleLinks.find(articleLink => articleLink.articleUrl.includes('cnn.com'))).toBeTruthy()
	})
})
