const { ApolloServer, gql } = require('apollo-server-azure-functions')
const requireGraphQLFile = require('require-graphql-file')
const resolvers = require('../src/graphql/resolvers.js')

process.env.NODE_ENV = 'development'

console.log('Printing __dirname', __dirname)

const typeDefSchema = requireGraphQLFile('../src/graphql/typeDefs.graphql')

const typeDefs = gql(typeDefSchema)

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	introspection: true,
	playground: true
})

module.exports = server.createHandler()
