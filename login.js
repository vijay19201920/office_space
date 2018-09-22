var express = require('express');
var router = express.Router();

var connection = require('./db_connection.js');

router.get('/', function (req, res) {
    console.log("hello");
    res.send('say hi');
});
//export this router to use in our index.js

router.get('/form', function (req, res) {
    res.render('login');
});

router.post('/form', function (req, res) {
    console.log(req.body);
});

module.exports = router;