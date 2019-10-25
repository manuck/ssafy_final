const { ApolloServer, gql, AuthenticationError } = require('apollo-server-express');
const config = require('../config/config.json');
const jwt = require('jsonwebtoken')
const SECRET = require('../config/config.json')['secret'];
exports.initGraphql = (app) => {
    /* GraphQL 설정 */
    const typeDefs = gql `
    type Query {
        hello: String
    }

    schema {
        query: Query
    }
    `;

    const resolvers = {
        Query: {
            hello: () => {
                return 'world';
            }
        },
    };
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => {
            const token = req.headers.authorization || ''
            try {
                return { _id, username } = jwt.verify(token.split(' ')[1], SECRET);
            } catch (e) {
                throw new AuthenticationError(
                    'Authentication token is invalid, please log in',
                )
            }
        }
    });
    server.applyMiddleware({ app });
}