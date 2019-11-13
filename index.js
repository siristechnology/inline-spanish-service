require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const morganBody = require('morgan-body')
const errorhandler = require('errorhandler')
const { ApolloServer, gql } = require('apollo-server-express')
const requireGraphQLFile = require('require-graphql-file')
const resolvers = require('./src/graphql/resolvers.js')

const isDevelopment = process.env.NODE_ENV === 'development'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

if (isDevelopment) {
	morganBody(app, {
		noColors: true,
		logRequestBody: true,
		logResponseBody: true
	})
} else {
	app.use(morgan('combined'))
}

if (isDevelopment) {
	app.use(errorhandler())
}

// Error handlers & middlewares
if (isDevelopment) {
	app.use((err, req, res, next) => {
		res.status(err.status || 500)

		res.send({
			errors: {
				message: err.message,
				error: err
			}
		})
	})
}

app.use((err, req, res, next) => {
	res.status(err.status || 500)

	res.send({
		errors: {
			message: err.message,
			error: {}
		}
	})
})

const typeDefSchema = requireGraphQLFile('./src/graphql/typeDefs.graphql')
const typeDefs = gql(typeDefSchema)

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	context: ({ req, res }) => ({
		...{ userContext: req.payload }
	}),
	playground: {
		settings: {
			'editor.theme': 'light'
		},
		version: '1.7.25'
	}
})

server.applyMiddleware({ app })

app.listen(process.env.PORT, () => console.log(`Server running on http://localhost:${process.env.PORT}`))
