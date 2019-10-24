var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
const db = require('./database')
const bodyParser = require('body-parser');
const schemas = require('./schemas/schema');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

app.get('/users', (req, res, next) => {
  User.find({}).exec((_err, _res) => res.json(_res));
});

app.listen(4000, () => {
  console.log('listening ....');
});
// db 연결
db.connectDB();
module.exports = app;