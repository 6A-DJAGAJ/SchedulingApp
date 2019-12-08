const path = require('path'),
    express = require('express'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    userRouter = require('../routes/user.server.routes');
    availRouter = require('../routes/avail.server.routes');
    noAvailRouter = require('../routes/noAvail.server.routes');
    pinRouter = require('../routes/pin.server.routes');
    positionsRouter = require('../routes/position.server.routes');

module.exports.init = () => {
    /* 
        connect to database
        - reference README for db uri
    */
   // Attempt connecting to mongoose database userData (selects all collections inside)
    try {
        mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        console.log('Successfully connected to Users db')
        }
    catch (err){
        console.log("Could not retrieve database Users")
    }
    // end try to connect to db collections


    // initialize app
    const app = express()
    app.use(session({
        secret: 'secretstring',
        saveUninitialized: false,
        resave: true
    }))

    // enable request logging for development debugging
    app.use(morgan('dev'));

    // body parsing middleware
    app.use(bodyParser.json());

    // add a router
    app.use('/Users', userRouter);
    app.use('/uAvail', availRouter);
    app.use('/uNoAvail', noAvailRouter);
    app.use('/uPins', pinRouter);
    app.use('/positions', positionsRouter);

   // if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });
    //}

    return app
};
