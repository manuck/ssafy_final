const { makeExecutableSchema } = require('graphql-tools');
const resolvers = require('../resolvers/resolver');

const typeDefs = `
    type Query {
        allUsers: [User]
    }

    type Mutation {
        addUser(): User,
        deleteUser(id: String!): User,
        updateUser(id: String!, name): User
    }

    type User {
        _id: String,
        username: String,
        representationNickname: String,
        tier: String,
        rank: String,
        leaguePoint: Number,
        majorPosition: String,
        minorPosition: String,
        apiUpdateAt: Date
        
    }
`
const schema = makeExecutableSchema({typeDefs, resolvers});
module.exports = schema;