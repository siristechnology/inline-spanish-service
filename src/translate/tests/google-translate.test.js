import GoogleTranslate from '../google-translate'

jest.setTimeout(20000)

describe('google-translate', () => {
	it('googleTranslate should translate strings successfully', async () => {
		const translation = await GoogleTranslate.googleTranslate('My name is Suraj', 'es')

		expect(translation).toBe('Mi nombre es Suraj')
	})

	it('translateArticle should contain both english and spanish translation', async () => {
		const translation = await GoogleTranslate.translateArticle('My name is Suraj', 'es')

		expect(translation.originalContent).toContain('My name is Suraj')
		expect(translation.translatedContent).toContain('Mi nombre es Suraj')
	})

	it('translateArticle should return array of strings in english and spanish', async () => {
		const translation = await GoogleTranslate.translateArticle(
			`Suraj Shrestha [https://miro.medium.com/fit/c/96/96/0*C_wSnltLX62qgRQT.]\n[https://medium.com/@syuraj?source=post_page-----87ee63b14ee9----------------------]\nStatic-site-generator tools like Gatsby [https://www.gatsbyjs.org/] are awesome\ntools for creating\n\n * Sites that has mostly static components\n * Sites that don’t have heavy backend and few api calls to external api\n   providers\n\nIt is perfect for creating a company portfolio website\n[https://www.siristechnology.com/] like we did or developer portfolio website\n[https://portfolio.smakosh.com/].\n\nHowever, there will be cases where we need some backend. For example, saving\nfeedback message when user submits through contact form\n[https://siristechnology.com/contact].\n\nAnd, it is not feasible or economical to create/deploy/host a complete new app\nfor such a tiny service.\n\nSO, WHAT CAN WE DO?\nGatsby is not great at proxying api calls in production environment. This link\n[https://www.gatsbyjs.org/docs/api-proxy/] only works in dev environment.\n\nCOUPLE OF OPTIONS\n * gatsby exports all html into /public folder. You can simple serve static\n   files through your express app.\n\n> app.use(express.static(\${__dirname}/public\`)) e.g. link\n[https://github.com/siristechnology/siris-technology/blob/master/server.js#L12]\n\n\n * Another easy solution is to run gatsby serve and node express in the same\n   port. You can make express run in background daemon using libraries likepm2 .\n\n> web: pm2 start ecosystem.config.js — env production && gatsby serve -p $PORT -H\n0.0.0.0\n\n\n * Netlify function [https://functions-playground.netlify.com/] is a great\n   example and perfect for this type of scenario (static website with some api\n   support through function). Netlify free [https://www.netlify.com/pricing/] \n   tier is also adequate for most of the small scale websites, however, the\n   price rises sharply after that.`,
			'es'
		)

		console.log('Printing translation', translation)

		// expect(translation.originalContent[1].includes('Static-site-generator tools like Gatsby  are awesome')).toBe(
		// 	true
		// )
		// expect(
		// 	translation.translatedContent[1].includes(
		// 		'Las herramientas generadoras de sitios estáticos como Gatsby son increíbles'
		// 	)
		// ).toBe(true)

		expect(translation.originalContent.length).toEqual(translation.translatedContent.length)
	})
})
