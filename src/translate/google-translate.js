require('dotenv').config()
const { Translate } = require('@google-cloud/translate')

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

			translator.translate(content.slice(0, 5000), language, function(err, translation) {
				if (!translation) {
					console.log('Printing err', err)
					console.log('Printing article', content)
					console.log('Printing translation', translation)
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
