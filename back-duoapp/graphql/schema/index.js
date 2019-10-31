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
    username: String!
    nicknames: [String]
    representationNickname: String!
    tiers: Tier!
    majorPosition: String!
    minorPosition: String!
    apiUpdatedAt: String!
    recentgames :[Game]
}
type Tier {
    tier: String!
    rank: String!
    leaguePoint: Int!
}
type Game {
    win: Boolean!
    kills: Int!
    deaths: Int!
    assists: Int!
    champion: Int!
}
type Recruitment {
    _id: ID!
    userId: ID!
    position: String!
    status: Boolean!
}
type RecruitmentAndUser {
    _id: ID!
    userId: ID!
    position: String!
    status: Boolean!
    username: String!
    nicknames: [String]
    representationNickname: String!
    tiers: Tier!
    majorPosition: String!
    minorPosition: String!
    apiUpdatedAt: String!
    recentgames :[Game]
}



input CreateEventInput {
    title: String!
    description: String!
    price: Float!
    date: String!
}
input CreateUserInput {
    username: String!
}
input CreateRecruitmentInput {
    username: String! 
    position: String!
    status: Boolean
}
input UpdateUserInput {
    username: String!
    nicknames: [String]
    representationNickname: String!
    majorPosition: String
    minorPosition: String
    apiUpdatedAt: String
}
input UpdateTierInput {
    tier: String!
    rank: String!
    leaguePoint: Int!
}
input UpdateGameInput {
    win: Boolean!
    kills: Int!
    deaths: Int!
    assists: Int!
    champion: Int!
}
input UpdateUserAddNickNameInput {
    username: String!
    nickname: String!
}
input SearchUserInput {
    username: String!
}



type RootQuery {
    events: [Event!]!
    users: [User!]!
    recruitments: [Recruitment!]!
    recruitmentsAndUsers: [RecruitmentAndUser]!
    getUser(userId : ID): User!
    getUserByUsername(searchUserInput: SearchUserInput): User!
}
type RootMutation {
    createEvent(eventInput: CreateEventInput): Event
    createUser(createUserInput: CreateUserInput): User
    createRecruitment(recruitmentInput: CreateRecruitmentInput): Recruitment
    updateUserAddNickName(updateUserAddNickNameInput: UpdateUserAddNickNameInput, updateTierInput: UpdateTierInput, updateGameInput: [UpdateGameInput]):User
    updateUser(updateUserInput: UpdateUserInput, updateTierInput: UpdateTierInput, updateGameInput: [UpdateGameInput]): User
}
schema {
    query: RootQuery
    mutation: RootMutation
}
`);