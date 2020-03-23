require('dotenv').config()
const { Translate } = require('@google-cloud/translate').v2
const Logger = require('../config/logger')

module.exports = {
	translateArticle: async function(content, language) {
		try {
			const translatedText = await this.googleTranslate(content, language)

			const result = {
				originalContent: this.breakLongTextIntoSentences(content),
				translatedContent: this.breakLongTextIntoSentences(translatedText)
			}
			return result
		} catch (err) {
			return { status: 'fail', message: err.message }
		}
	},

	googleTranslate: async function(content, language) {
		return new Promise((resolve, reject) => {
			const translator = new Translate({ key: process.env.GOOGLE_TRANSLATE_API_KEY })

			translator.translate(content, language, function(err, translation) {
				if (!translation) {
					Logger.error(err)
					Logger.error(content)
					reject('Translation failed')
				} else {
					resolve(translation)
				}
			})
		})
	},

	breakLongTextIntoSentences: function(longText) {
		return longText.split(/[\n]+/)
	}
}
