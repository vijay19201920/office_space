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

app.use(express.static(path.join(__dirname , 'public')))
//app.use(express.static(__dirname + 'public'));
//app.set('views', path.resolve('./views'))
app.disable('view cache');



app.use(session({
    name: 'example',
    secret: 'shuush',
    resave: false,
    saveUninitialized: true,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
    //  maxAge:  180000,
      expires: new Date('Monday, 18 January 2028')
    },
  }))
  
// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({extended: true}));

var contacts = require('./contacts.js');
var login = require('./login.js');
var dashboard = require('./dashboard.js');



app.use('/dash', dashboard);



app.use('/contacts', contacts);



app.use('/login', login);



app.listen(3000);