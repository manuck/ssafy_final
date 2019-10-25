var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
const db = require('./database')

// GraphQL import
const bodyParser = require('body-parser');
// const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
// const { makeExecutableSchema } = require('graphql-tools');
// const typeDefs = require('./schemas/schema');
// const resolvers = require('./resolvers/resolver');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const schema = makeExecutableSchema({
//   typeDefs,
//   resolvers,
// });

app.use(bodyParser.json());
app.use('./graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));

// // The GraphQL endpoint
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
// // GraphiQL, a visual editor for queries
// app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))
// // Start the server
// app.listen(4000, () => {
//   console.log('Go to http://localhost:4000/graphiql to run queries!');
// });

// db 연결
db.connectDB();
module.exports = app;