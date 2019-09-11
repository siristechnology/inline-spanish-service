import fetchLinks from '../link-crawler'
import mediumConfig from '../config/medium-config.json'

describe('link-crawler', () => {
	it(' should fetch links successfully', async () => {
		const { links } = await fetchLinks(mediumConfig)
		expect(links.length).toBeGreaterThan(0)
	})
})
