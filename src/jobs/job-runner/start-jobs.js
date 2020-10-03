require('dotenv').config()
const crawler = require('../news-crawler')
const translator = require('../google-translator')
const Agenda = require('agenda')
const Logger = require('../../config/logger')

module.exports = async function () {
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
