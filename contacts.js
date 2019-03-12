var express = require('express');
var passwordHash = require('password-hash');
var multer  = require('multer');
var router = express.Router();

var connection = require('./db_connection.js');



//upload path for the file avatar using as a middleware
//multer is used for form type multipart/form-data for uploading the data on server
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'D:/node/office_space/office_space/office_space/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

var upload = multer({ storage: storage })


//get is mainly used for select data
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


// post method is used for insert , edit data
//delete method is used for deleting the data
router.post('/form',upload.single('avatar'), function (req, res) {

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