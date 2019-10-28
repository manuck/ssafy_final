// const { buildSchema } = require('graphql')

// module.exports = buildSchema(`
//     type Recruitment {
//         _id: ID!
//         user : ID!
//         position: String!
//         status: Boolean!
//     }

//     type User {
//         _id: ID!
//         username: String!
//         nicknames: [String]
//         representationNickname: String!
//         tiers: {
//             tier: String!
//             rank: String!
//             leaguePoint: Int!
//         }
//         majorPosition: String!
//         minorPosition: String!
//         apiUpdatedAt: String!
//     }

//     input RecruitmentInput {
//         user : ID!
//         position: String!
//     }

//     input UserInput {
//         username: String!
//         nicknames: [String!]
//         representationNickname: String!
//         tiers: {
//             tier: String!
//             rank: String!
//             leaguePoint: Int!
//         }
//         majorPosition: String!
//         minorPosition: String!
//         apiUpdatedAt: String!
//     }

//     type RootQuery {
//         users: [User!]!
//     }
//     type RootMutation {
//         createRecruitment(recruitmentInput: RecruitmentInput): Recruitment
//         createUser(userInput: UserInput): User
//     }
//     schema {
//         query: RootQuery
//         mutation: RootMutation
//     }
// `);

const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  creator: User!
}
type User {
  _id: ID!
  email: String!
  password: String
  createdEvents: [Event!]
}
input EventInput {
  title: String!
  description: String!
  price: Float!
  date: String!
}
input UserInput {
  email: String!
  password: String!
}
type RootQuery {
    events: [Event!]!
}
type RootMutation {
    createEvent(eventInput: EventInput): Event
    createUser(userInput: UserInput): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);