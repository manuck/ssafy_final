const makeExecutableSchema = require('graphql-tools');
const resolver = require('./resolver')

const typeDefs = `
    type User {
        _id: ID!
        name: String!
        age: Int!
        gender: String!
    }

    type Query {
        allUser: [User]
    }
`;

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});