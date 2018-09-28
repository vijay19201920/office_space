var express = require('express');
var passwordHash = require('password-hash');
var router = express.Router();


var connection = require('./db_connection.js');

console.log('hello');
//export this router to use in our index.js


router.get('/dashboard', function (req, res) {
    if (req.session.message) {
        res.render('index');
    } else {
        res.redirect('/login/form');
    }
});



module.exports = router;