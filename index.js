var express = require('Express');
var flash = require('connect-flash');
var app = express();
var bodyParser = require('body-parser');



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

app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(3000);