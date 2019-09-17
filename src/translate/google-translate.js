require('dotenv').config()
var GoogleTranslate = require('google-translate')(process.env.GOOGLE_TRANSLATE_API_KEY)

module.exports = {
	translateArticle: async function(content, language) {
		const strippedContent = content.replace(/\[[^\]]*\]/g, '')
		const translatedText = await this.googleTranslate(strippedContent, language)

		const result = {
			originalContent: strippedContent.split(/[.\n]+/),
			translatedContent: translatedText.split(/[.\n*]+/)
		}
		return result
	},

	googleTranslate: async function(content, language) {
		return new Promise((resolve, reject) => {
			GoogleTranslate.translate(content.slice(0, 5000), language, function(err, translation) {
				if (!translation) {
					console.log('Printing article', content)
					console.log('Printing translation', translation)
					reject('Translation failed')
				} else {
					resolve(translation.translatedText)
				}
			})
		})
	}
}
