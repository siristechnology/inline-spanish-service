import fetchLinks from '../link-crawler'
import sourceConfigs from '../config/source-configs.json'

jest.setTimeout(10000)

describe('link-crawler', () => {
	it(' should fetch links from medium.com successfully', async () => {
		const { articleUrls } = await fetchLinks(sourceConfigs)

		expect(articleUrls.length).toBeGreaterThan(5)
		expect(articleUrls[0].includes('medium.com')).toBe(true)
	})
})
