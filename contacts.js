var express = require('express');
var router = express.Router();

var connection = require('./db_connection.js');

router.get('/', function (req, res) {
    console.log("hello");
    res.send('say hi');
});
//export this router to use in our index.js

router.get('/form', function (req, res) {
    res.render('contacts');
});

router.post('/form', function (req, res) {
    //console.log(req.body);

    var sql = "INSERT INTO form (name, email , mobile_number , subject , message) VALUES ('" + req.body.name + "', '" + req.body.email + "' , '" + req.body.mobile + "' ,'" + req.body.subject + "' , '" + req.body.message + "')";
    connection.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log("1 record inserted");
        res.redirect('/contacts/form');
    });


});



module.exports = router;