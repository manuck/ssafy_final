var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const graphql = require('./graphql')
const session = require('express-session')
const passport = require('passport')
const passports = require('./passport')
var indexRouter = require('./routes');
const db = require('./database')
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json')[env];
const GOOGLESECRET = config.googleSecret;

// GraphQL import
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index');

var app = express();

app.set('jwt-secret', config.secret)

// app.use(session({
//     secret: config.googleSecret,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false, maxAge: (3 * 60 * 60 * 1000) },
// }))
passports.init(passport);
app.use(passport.initialize());
app.use(passport.session());
graphql.initGraphql(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue: graphqlResolvers,
  graphiql: true
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/graphql');
// app.use('/graphiql');

// db 연결
db.connectDB();
module.exports = app;