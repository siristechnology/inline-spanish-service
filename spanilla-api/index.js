const { ApolloServer, gql } = require('apollo-server-azure-functions')
const resolvers = require('../src/graphql/resolvers.js')
const fs = require('fs')

process.env.NODE_ENV = 'development'

console.log('Printing __dirname', __dirname)

const typeDefSchema = fs.readFileSync('./src/graphql/typeDefs.graphql', 'utf8')
const typeDefs = gql(typeDefSchema)

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	introspection: true,
	playground: true
})

module.exports = server.createHandler()
