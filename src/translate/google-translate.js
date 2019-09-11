require('dotenv').config()
var GoogleTranslate = require('google-translate')(process.env.GOOGLE_TRANSLATE_API_KEY)

export default {
	translateArticle: async function(string, language) {
		const translatedText = await this.googleTranslate(string, language)
		return string + ' \n' + translatedText
	},

	googleTranslate: async function(string, language) {
		return new Promise(resolve => {
			GoogleTranslate.translate(string, language, function(err, translation) {
				resolve(translation.translatedText)
			})
		})
	}
}
