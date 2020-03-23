require('dotenv').config()
const crawler = require('../../spanilla-crawler/index')
const translator = require('../../spanilla-translator/index')
const Agenda = require('agenda')
const Logger = require('../config/logger')

module.exports = async function() {
	Logger.info('starting jobs')

	const agenda = new Agenda({ db: { address: process.env.DATABASE_URL } })

	agenda.define('crawl articles', async (job) => {
		Logger.info('crawl articles job started')
		crawler(console)
	})

	agenda.define('translate articles', async (job) => {
		Logger.info('translate articles job started')
		translator(console)
	})

	await agenda.start()

	await agenda.every('20 minutes', 'crawl articles')
	await agenda.every('20 minutes', 'translate articles')
}
