var express = require('Express');
var app = express();
var bodyParser = require('body-parser');


var contacts = require('./contacts.js');


// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
app.use('/contacts', contacts);

app.set('view engine', 'ejs');
app.set('views','./views');




//both index.js and things.js should be in same directory




app.listen(3000);