require('dotenv').config()
var GoogleTranslate = require('google-translate')(process.env.GOOGLE_TRANSLATE_API_KEY)

module.exports = {
	translateArticle: async function(string, language) {
		const translatedText = await this.googleTranslate(string, language)
		return string + ' \n' + translatedText
	},

	googleTranslate: async function(string, language) {
		return new Promise((resolve, reject) => {
			GoogleTranslate.translate(string.slice(0, 5000), language, function(err, translation) {
				if (!translation) {
					console.log('Printing article', string)
					console.log('Printing translation', translation)
					reject('Translation failed')
				} else {
					resolve(translation.translatedText)
				}
			})
		})
	}
}
