var express = require('express');
var passwordHash = require('password-hash');

var router = express.Router();

var connection = require('./db_connection.js');

router.get('/', function (req, res) {
    console.log("hello");
    res.send('say hi');
});
//export this router to use in our index.js

router.get('/form', function (req, res) {
    if (req.session.name) {
        res.render('contacts', { success: req.session.name });
    } else {
        res.render('contacts', { success: req.session.name });
    }
    req.session.destroy();

});

router.post('/form', function (req, res) {

    var hashedPassword;
    hashedPassword = passwordHash.generate(req.body.password);

    console.log(req.session.check + 'submit session');
    var uniqueUser = "SELECT *  FROM form WHERE username = '" + req.body.username + "' LIMIT 1";
    var sql = "INSERT INTO form (name, email , mobile_number , username , password) VALUES ('" + req.body.name + "', '" + req.body.email + "' , '" + req.body.mobile + "' ,'" + req.body.username + "' , '" + hashedPassword + "')";

    connection.query(uniqueUser, function (err, result) {
        if (err)
            throw err;
        if (result.length > 0) {
            req.session.name = 'This user already exist, please enter unique username to register';
            // req.flash('msg', 'This use already exist.')
            res.redirect('/contacts/form');
        } else {
            connection.query(sql, function (err, result) {
                if (err)
                    throw err;
                req.session.name = 'success';
                console.log("1 record inserted");

                res.redirect('/contacts/form');
            });
            console.log("1 record inserted");
            // res.redirect('/contacts/form');
        }
    });
});
module.exports = router;