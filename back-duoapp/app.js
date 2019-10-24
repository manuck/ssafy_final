var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
const apiRouter = require('./routes/api');
const graphqlRouter = require('./graphql')
const db = require('./database')

//
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const schema = buildSchema(`
type Query {
  hello: String
}
`);

const root = {hello: () => `hello world!`};
//




var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apiRouter);
//app.use('/graphql', graphqlRouter);


//
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));
  app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
//

// db 연결
db.connectDB();
module.exports = app;