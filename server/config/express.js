const path = require('path'),
    express = require('express'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    config = require('./config'),
    exampleRouter = require('../routes/examples.server.routes');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
   // Attempt connecting to mongoose database collections
    try {
        mongoose.connect(config.dbUsers.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        }
    catch (err){
        console.log("Could not retrieve database Users")
    }
    try {
        mongoose.connect(config.dbuAvail.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
    }
    catch (err){
        console.log("Could not retrieve database uAvail")
    }

    try {
        mongoose.connect(config.dbuNoAvail.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
    }
    catch (err){
        console.log("Could not retrieve database uNoAvail")
    }

    try {
        mongoose.connect(config.dbuPins.uri, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
    }
    catch (err){
        console.log("Could not retrieve database uPins")
    }
    // end try to connect to db collections


    // initialize app
    const app = express();

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    // add a router
    app.use('/api/example', exampleRouter);

   // if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/public')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/public', 'index.html'));
        });
    //}

    return app
};
