import fetchLinks from '../link-crawler'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const fs = require('fs')
const path = require('path')

jest.setTimeout(10000)

describe('link-crawler', () => {
	it('should fetch links from medium.com successfully', async () => {
		const sourceConfigs = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '../config/source-configs.json'), 'utf8')
		)
		const mediumSourceConfig = sourceConfigs.filter(config => config.name === 'medium')
		const { articleLinks } = await fetchLinks(mediumSourceConfig)

		expect(articleLinks.length).toBeGreaterThan(2)

		expect(articleLinks.find(articleLink => articleLink.articleUrl.includes('medium.com'))).toBeTruthy()
	})

	it('should fetch links from bbc.com successfully', async () => {
		const sourceConfigs = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '../config/source-configs.json'), 'utf8')
		)
		const bbcSourceConfig = sourceConfigs.filter(config => config.name === 'bbc')
		const { articleLinks } = await fetchLinks(bbcSourceConfig)

		expect(articleLinks.length).toBeGreaterThan(5)

		expect(articleLinks.find(articleLink => articleLink.articleUrl.includes('bbc.com'))).toBeTruthy()
	})

	it('should fetch links from cnn.com/us successfully', async () => {
		const sourceConfigs = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '../config/source-configs.json'), 'utf8')
		)

		const cnnSourceConfig = sourceConfigs.filter(config => config.name === 'cnn')
		cnnSourceConfig[0].links = cnnSourceConfig[0].links.filter(link => link.url === 'https://www.cnn.com/us')

		const SampleCnnPage = fs.readFileSync(path.resolve(__dirname, 'cnn-us-sample-page.html'), 'utf8')

		const mock = new MockAdapter(axios)
		mock.onGet(cnnSourceConfig[0].links[0].url).reply(200, SampleCnnPage)

		const { articleLinks } = await fetchLinks(cnnSourceConfig)

		expect(articleLinks.length).toBeGreaterThan(5)

		expect(articleLinks.find(articleLink => articleLink.articleUrl.includes('cnn.com'))).toBeTruthy()
	})

	it('should fetch links from cnn.com/special successfully', async () => {
		const sourceConfigs = JSON.parse(
			fs.readFileSync(path.resolve(__dirname, '../config/source-configs.json'), 'utf8')
		)

		const cnnSourceConfig = sourceConfigs.filter(config => config.name === 'cnn')

		cnnSourceConfig[0].links = cnnSourceConfig[0].links.filter(
			link => link.url === 'https://www.cnn.com/specials/last-50-stories'
		)

		const SampleCnnPage = fs.readFileSync(path.resolve(__dirname, 'cnn-special-sample-page.html'), 'utf8')

		const mock = new MockAdapter(axios)
		mock.onGet(cnnSourceConfig[0].links[0].url).reply(200, SampleCnnPage)

		const { articleLinks } = await fetchLinks(cnnSourceConfig)

		expect(articleLinks.length).toBeGreaterThan(5)

		expect(articleLinks.find(articleLink => articleLink.articleUrl.includes('cnn.com'))).toBeTruthy()
	})
})
