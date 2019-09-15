require('dotenv').config()
const articleDbService = require('../article-db-service')

describe('article-db-service', () => {
	it('saveArticle should save an article successfully.', async () => {
		const article = {
			title: 'dummy title',
			url: `url${Math.random()}`,
			content: 'content'
		}
		const articlesSaved = await articleDbService.saveArticles([article])

		expect(articlesSaved[0]._id).not.toBeNull()
		expect(articlesSaved[0].date_created).not.toBeUndefined()
		expect(articlesSaved[0].date_modified).not.toBeUndefined()

		await await articleDbService.deleteArticles([articlesSaved[0]._id])
	})

	it('saveArticle should not save date_published by default.', async () => {
		const article = {
			title: 'dummy title',
			url: `url${Math.random()}`,
			content: 'content'
		}
		const articlesSaved = await articleDbService.saveArticles([article])

		expect(articlesSaved[0].date_published).toBeUndefined()

		await await articleDbService.deleteArticles([articlesSaved[0]._id])
	})

	it('saveArticle should save given date_published.', async () => {
		const date1 = new Date(2013, 4, 30, 16, 5)
		const article = {
			title: 'dummy title',
			url: `url${Math.random()}`,
			content: 'content',
			date_published: date1
		}

		const articlesSaved = await articleDbService.saveArticles([article])

		expect(articlesSaved[0].date_published).toEqual(date1)

		await articleDbService.deleteArticles([articlesSaved[0]._id])
	})

	it('saveArticles should save multile articles', async () => {
		const articles = [
			{
				title: 'How to Be a Good Senior Developer - Better Programming',
				url: `url${Math.random()}`,
				lead_image_url: 'https://miro.medium.com/max/1200/1*BwbpJq7HMHx7dF-NTFEQ2Q.jpeg',
				excerpt: 'It’s not what you do-it’s how you do it',
				author: 'Ravi Shankar Rajan',
				content:
					"John Crosby hit the nail on the head when he said:\n\n> Mentoring is a brain to pick, an ear to listen, and a push in the right\ndirection.\n\n\nIn 2008, Google did a major study on this question. The Project Oxygen team in\nGoogle’s People Innovation Lab spent a whole year data-mining performance\nappraisals, employee surveys, nominations for top-manager awards, and other\nsources to evaluate the differences between the highest- and lowest-rated\nmanagers. Their statisticians gathered more than 10,000 observations about\nmanagers across more than 100 variables.\n\nTwo important inferences came out of this study:\n\n * The most important activity for management success is being a good mentor.\n   Successful managers know how to mentor their teams to success.\n * The least important is technical skills. This proves that a great developer\n   doesn’t necessarily make a great manager.\n\nAs a result, Google changed its feedback surveys to reflect these qualities.\nInstead of simply measuring how much output a manager achieves, the surveys now\nfocus on how much time they spend coaching their team, whether or not they\ncommunicate a clear vision, etc. They also developed new management training\nprograms centered around these skills.\n\nThat said, one key expectation from every senior developer is that they should\nbe able to interact masterfully with internal and external customers and\nstakeholders. Tech jargon will not get you anywhere when you interact with\npeople from non-technical backgrounds. That’s why the best senior developers are\nthe ones who don’t get wowed by technology.\n\nInstead, you'll need to cultivate the skill of explaining complex technical\nconcepts in simple language, using real-life examples, and quickly gauging the\nlevel of comfort the listener has with the jargon.\n\nMentoring is the powerful link between a junior and someone more experienced not\nonly for career development but also for personal growth. Share knowledge, share\nexperiences, forge ahead. \nJohn Crosby dio en el clavo cuando dijo:> La mentoría es un cerebro para elegir, un oído para escuchar y un empujón en la dirección correcta. En 2008, Google realizó un importante estudio sobre esta cuestión. El equipo de Project Oxygen en el People Innovation Lab de Google pasó un año entero evaluando el rendimiento de la minería de datos, encuestas a empleados, nominaciones para premios de alto directivo y otras fuentes para evaluar las diferencias entre los gerentes con las calificaciones más altas y más bajas. Sus estadísticos reunieron más de 10,000 observaciones sobre gerentes en más de 100 variables. De este estudio surgieron dos inferencias importantes: * La actividad más importante para el éxito de la gestión es ser un buen mentor. Los gerentes exitosos saben cómo guiar a sus equipos hacia el éxito. * Lo menos importante son las habilidades técnicas. Esto demuestra que un gran desarrollador no necesariamente es un gran administrador. Como resultado, Google cambió sus encuestas de retroalimentación para reflejar estas cualidades. En lugar de simplemente medir la cantidad de resultados que logra un gerente, las encuestas ahora se centran en cuánto tiempo pasan entrenando a su equipo, si comunican o no una visión clara, etc. También desarrollaron nuevos programas de capacitación gerencial centrados en estas habilidades. Dicho esto, una expectativa clave de cada desarrollador senior es que deberían poder interactuar magistralmente con clientes y partes interesadas internas y externas. La jerga tecnológica no lo llevará a ninguna parte cuando interactúe con personas de entornos no técnicos. Es por eso que los mejores desarrolladores senior son los que no se dejan impresionar por la tecnología. En su lugar, deberá cultivar la habilidad de explicar conceptos técnicos complejos en un lenguaje simple, utilizando ejemplos de la vida real y midiendo rápidamente el nivel de comodidad que el oyente tiene con la jerga. La tutoría es el poderoso vínculo entre un joven y alguien con más experiencia no solo para el desarrollo profesional sino también para el crecimiento personal. Compartir conocimiento, compartir experiencias, seguir adelante.",
				date_published: '2019-09-07T17:25:09.944Z'
			},
			{
				title: 'How Britain Plunged Into Its Worst Constitutional Crisis in 400 Years',
				url: `url${Math.random()}`,
				lead_image_url: 'https://miro.medium.com/focal/1200/632/50/51/1*0WgLa4rRRs4kwjGjB65K2w.jpeg',
				excerpt:
					'Boris Johnson’s efforts to ram a no-deal Brexit through have unleashed a massive fight over who holds political power in the U.K.',
				author: 'Ian Dunt',
				content: 'Ian Dunt [https://miro.medium.com/fit/c/96/96/0*ig5JxL6VTNAmmKc-.jpg]',
				date_published: '2019-09-11T23:11:46.672Z'
			}
		]
		const articlesSaved = await articleDbService.saveArticles(articles)

		expect(articlesSaved[0]).toBeDefined()
		expect(articlesSaved[1]).toBeDefined()

		await articleDbService.deleteArticles([articlesSaved[0]._id, articlesSaved[1]._id])
	})
})

describe('article-db-service', () => {
	it('getArticles should fetch news from mongodb.', async () => {
		const article1 = { title: 'dummy title', url: `url${Math.random()}`, content: 'content' }
		const articlesSaved = await articleDbService.saveArticles([article1])

		const articles = await articleDbService.getArticles()
		expect(articles.length).toBeGreaterThan(0)

		await articleDbService.deleteArticles([articlesSaved[0]._id])
	})
})
