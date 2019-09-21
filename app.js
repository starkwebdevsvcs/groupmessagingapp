const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const passport = require('passport');
const moment = require('moment-timezone');
require('dotenv').config(); //dotenv

//For Timestamp messages in console
require('console-stamp')(console, 'HH:MM:ss');

//Variable statements
let app = express();
let env = process.env;
let db = mongoose.connection;
let txtToPhone = '';
let txtFullMsg = '';
let twilioSID = '';
let twilioStatus= '';
let returnPage = '';

// Global App Variables
app.locals.appVersion = '2019/09/06.v0.0.1';
app.locals.copyright = '©2019 Stark Web Development Services';

//Set Public folder path
app.use(express.static(path.join(__dirname, 'public')));

//Database related
  //DB Connection
  mongoose.connect(env.DB_STRING, { useNewUrlParser: true});
  //Check DB connection
  db.once('open', function(err){
    console.log('Connection made to Database: ' + env.DB_NAME);
  });
  //Check for DB errors
  db.on('error', function(err){
    console.log(err);
  });

// Load View Engine
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

//Middleware
    app.use(logger('dev'));
    // app.use(express.json());
    // app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());

    //Body Parser Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    //Express Session Middleware
    app.use(session({
        secret: 'keyboard cat',
        resave: true,
        saveUninitialized: true,
        // cookie: {secure: true}
    }));

    //Express Messages Middleware
    app.use(require('connect-flash')());
    app.use(function (req, res, next) {
        res.locals.expressMessages = require('express-messages')(req, res);
        next();
    });

    // Express Validator Middleware
    app.use(expressValidator({
        errorFormatter: function(param, msg, value) {
            var namespace = param.split('.')
            , root = namespace.shift()
            , formParam = root;
            while(namespace.length) {
                formParam += '[' + namespace.shift() + ']';
            }
            return {
                param : formParam,
                msg   : msg,
                value : value
            };
        }
    }));

// Passport config
    require('./config/config_passport')(passport);

    // Passport Middleware
    app.use(passport.initialize());
    app.use(passport.session());

    app.get('*', function(req, res, next){
      res.locals.user=req.user || null;
      next();
    })

// Routes
// let groupddRouter = require('./routes/routes_groupdd');
// let usersRouter = require('./routes/routes_users');
// let histRouter = require('./routes/routes_history');
// let remddRouter = require('./Archive/routes_reminderdd');
// let rmndrRouter = require('./Archive/routes_reminders');
let appRouter = require('./routes/routes_app');
let loginRouter = require('./routes/routes_login');
let messagesRouter = require('./routes/routes_messages');
let twilioRouter = require('./routes/routes_twilio');
let usersRouter = require('./routes/routes_adminusers');
let teamsRouter = require('./routes/routes_adminteams');
let customersRouter = require('./routes/routes_admincustomers');
let groupsRouter = require('./routes/routes_admingroups');
let adminMessagesRouter = require('./routes/routes_adminmessages');
let msgServiceRouter = require('./routes/routes_messageservice');

// Route statements
// app.use('/reminderdd', remddRouter);
// app.use('/reminders', rmndrRouter);
// app.use('/history', histRouter);
// app.use('/groupdd', groupddRouter);
app.use('/msgservices', msgServiceRouter)
app.use('/messages', messagesRouter);
app.use('/login', loginRouter);
app.use('/twilio', twilioRouter);
app.use('/admin/groups', groupsRouter);
app.use('/admin/users', usersRouter);
app.use('/admin/teams', teamsRouter);
app.use('/admin/customers', customersRouter)
app.use('/admin/messages', adminMessagesRouter);
app.use('/', appRouter);

// Error Handler
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      // render the error page
      res.status(err.status || 500);
      res.render('page_error');
    });

module.exports = app;
