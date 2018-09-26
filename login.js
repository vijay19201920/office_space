var express = require('express');
var passwordHash = require('password-hash');
var router = express.Router();


var connection = require('./db_connection.js');


//export this router to use in our index.js

router.get('/form', function (req, res) {
   
    if (req.session.message) {
        res.render('login', { success: req.session.message });
    } else {
        res.render('login', { success: req.session.message });
    }
    req.session.destroy();
});

router.post('/form', function (req, res) {

    inputuser = req.body.username;
    inputpassword = req.body.password;

    var sql = "SELECT *  FROM form WHERE username = '" + inputuser + "' LIMIT 1";

    connection.query(sql, function (err, result) {
        if (err) {
            // console.log("error ocurred",error);
            req.session.message = 'error ocurred';
            res.redirect('/login/form');
        } else {

            if (result.length > 0) {
                if (passwordHash.verify(req.body.password, result[0].password)) {
                    req.session.message = 'login successfully';
                    res.redirect('/login/form');
                } else {
                    req.session.message = 'please enter correct username and password'
                    res.redirect('/login/form');
                }
            } else {
                req.session.message = 'user does not exits'
                res.redirect('/login/form');

            }
        }
    });

});


module.exports = router;