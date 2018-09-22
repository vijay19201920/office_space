var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contacted"
});

con.connect(function (err) {
    if (err)
        throw err;
    console.log("Connected!");
     var sql = "CREATE TABLE IF NOT EXISTS form(name VARCHAR(255), email VARCHAR(255),mobile_number CHAR(10) , subject VARCHAR(255), message VARCHAR(255) )";
    con.query(sql, function (err, result) {
        if (err)
            throw err;
        console.log("table created");
    });

});

module.exports = con;