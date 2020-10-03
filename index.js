require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const { ApolloServer, gql } = require('apollo-server-express')
const requireGraphQLFile = require('require-graphql-file')
const Bearer = require('@bearer/node-agent')

const resolvers = require('./src/graphql/resolvers.js')
const logger = require('./src/config/logger')

const isDevelopment = process.env.NODE_ENV === 'development'

Bearer.init({
	secretKey: process.env.BEARER_SH_API_KEY,
	stripSensitiveData: true,
	environment: process.env.BEARER_SH_ENV || process.env.NODE_ENV
})

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use('/assets', express.static('assets'))

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
		...{ userContext: req.payload, ipAddress: getIpAdressFromRequest(req) }
	})
})

const getIpAdressFromRequest = (req) => {
	let ipAddr = req.headers['x-forwarded-for']
	if (ipAddr) {
		ipAddr = ipAddr.split(',')[0]
	} else {
		ipAddr = req.connection.remoteAddress || req.ip
	}

	return ipAddr
}

server.applyMiddleware({ app })

app.listen(process.env.PORT, () => logger.info(`Server running on http://localhost:${process.env.PORT}`))
