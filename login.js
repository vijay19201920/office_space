var express = require('express');
var passwordHash = require('password-hash');
var router = express.Router();


var connection = require('./db_connection.js');


//export this router to use in our index.js

router.get('/form', function (req, res) {
    res.render('login');
});

router.post('/form', function (req, res) {

    inputuser = req.body.username;
    inputpassword = req.body.password;

    var sql = "SELECT *  FROM form WHERE username = '" + inputuser + "' LIMIT 1";

    connection.query(sql, function (err, result) {
        if (err) {
            // console.log("error ocurred",error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {

            if (result.length > 0) {
                if (passwordHash.verify(req.body.password, result[0].password)) {

                    res.send({
                        "code": 204,
                        "success": "login successfully"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "please enter correct username and password"
                    });
                }
            } else {
                res.send({
                    "code": 204,
                    "success": "user does not exits"
                });

            }
        }
    });

});


module.exports = router;