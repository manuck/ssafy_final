const { buildSchema } = require('graphql')

module.exports = buildSchema(`
    type Recruitment {
        _id: ID!
        user : ID!
        position: String!
        status: Boolean!
    }

    type User {
        _id: ID!
        username: String!
        nicknames: [String]
        representationNickname: String!
        tiers: {
            tier: String!
            rank: String!
            leaguePoint: Int!
        }
        majorPosition: String!
        minorPosition: String!
        apiUpdatedAt: String!
    }

    input RecruitmentInput {
        user : ID!
        position: String!
    }

    input UserInput {
        username: String!
        nicknames: [String!]
        representationNickname: String!
        tiers: {
            tier: String!
            rank: String!
            leaguePoint: Int!
        }
        majorPosition: String!
        minorPosition: String!
        apiUpdatedAt: String!
    }

    type RootQuery {
        users: [User!]!
    }
    type RootMutation {
        createRecruitment(recruitmentInput: RecruitmentInput): Recruitment
        createUser(userInput: UserInput): User
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);