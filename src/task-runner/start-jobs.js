require('dotenv').config()
const crawler = require('../../spanilla-crawler/index')
const translator = require('../../spanilla-translator/index')
const Agenda = require('agenda')

module.exports = async function() {
	const agenda = new Agenda({ db: { address: process.env.DATABASE_URL } })

	agenda.define('crawl articles', async job => {
		crawler(console)
	})

	agenda.define('translate articles', async job => {
		console.log('Printing job', job)
		translator(console)
	})

	await agenda.start()

	await agenda.every('20 minutes', 'crawl articles')
	await agenda.every('20 minutes', 'translate articles')
}
