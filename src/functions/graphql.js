require('dotenv').config()
import { ApolloServer } from 'apollo-server-lambda'
import { resolver } from '../graphql/resolvers'
import typeDefs from '../graphql/typeDefs.graphql'

// const typeDefs = fs.readFileSync('./src/graphql/typeDefs.graphql').toString('utf8')

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolver,
	introspection: true,
	playground: true
})

exports.handler = server.createHandler()
