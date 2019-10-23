const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require('./config/config.json');
const mongoDB = config[env].mongodbUri;

//Set up default mongoose connection
exports.connectDB = () => {
    mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
        if (err) {
            console.error('mongodb connection error', err)
        } else {
            console.log('mongodb connected')
        }
    });
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}