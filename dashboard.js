var express = require('express');
//var passwordHash = require('password-hash');
var router = express.Router();


var connection = require('./db_connection.js');

router.get('/dashboard', function(req, res) {
   
 if (req.session.message) {
        var sql = "SELECT * FROM `form`";
        //console.log('hello');
        connection.query(sql, function(err, result) {
    
            if (err) throw err;
            res.render('index', { success: result });
        });
    } else {
        res.redirect('/login/form');
    }
});



module.exports = router;