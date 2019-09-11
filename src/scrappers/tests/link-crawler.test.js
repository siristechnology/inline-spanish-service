import fetchLinks from '../link-crawler'
import mediumConfig from '../config/medium-config.json'

jest.setTimeout(10000)

describe('link-crawler', () => {
	it(' should fetch links from medium.com successfully', async () => {
		const { links } = await fetchLinks(mediumConfig)
		expect(links.length).toBeGreaterThan(5)

		expect(links[0].includes('medium.com')).toBe(true)
	})
})
