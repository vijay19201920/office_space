var express = require('Express');
//var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const flash = require('express-flash-notification');
const path = require('path');
var app = express();

app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', './views');
//app.set('views', path.resolve('./views'))
app.disable('view cache');

app.use(express.static(path.resolve('app/public')))

app.use(session({
    name: 'example',
    secret: 'shuush',
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      expires: new Date('Monday, 18 January 2028')
    },
  }))



var contacts = require('./contacts.js');
var login = require('./login.js');


// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({extended: true}));
//form-urlencoded
app.use('/contacts', contacts);


// for parsing application/xwww-
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/login', login);



app.listen(3000);