require('dotenv').config()
const crawler = require('../../spanilla-crawler/index')
const translator = require('../../spanilla-translator/index')
const Agenda = require('agenda')

module.exports = async function() {
	console.log('starting jobs')

	const agenda = new Agenda({ db: { address: process.env.DATABASE_URL } })

	agenda.define('crawl articles', async (job) => {
		console.log('crawl articles job started')
		crawler(console)
	})

	agenda.define('translate articles', async (job) => {
		console.log('translate articles job started')
		translator(console)
	})

	await agenda.start()

	await agenda.every('20 minutes', 'crawl articles')
	await agenda.every('20 minutes', 'translate articles')
}
