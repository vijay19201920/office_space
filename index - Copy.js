
//**************app.method(path,handler)***********//;
////var express = require('express');
//var app = express();


//var things = require('./things.js');
//var how = require('./how.js');
//var can = require('./can.js');


//app.use('/things', things);
//app.use('/how', how);
//app.use('/can', can);
//app.listen(3000);


//****Middle ware*****//

//var express = require('express');
//var app = express();

//Simple request time logger
//app.use(function(req, res, next){
//   console.log("A new request received at " + Date.now());
//   
//   //This function call is very important. It tells that more processing is
//   //required for the current request and is in the next middleware function/route handler.
//   next();
//});

//Middleware function to log request protocol
//app.use('/things', function(req,res,next){
//    
//    console.log("A new request received at " + Date.now());
//    next();
//});

// Route handler that sends the response
//app.get('/things', function(req, res){
//   res.send('Things');
//});



//*********Order of Middleware Calls****************//
//For example, in the following code snippet, the first function executes first, then the route handler and then the end function. This example summarizes how to use middleware before and after route handler; also how a route handler can be used as a middleware itself
var app = require("express")();

app.get("/", function(httpRequest, httpResponse, next){
    httpResponse.write("Hello");
    next();
});

app.get("/", function(httpRequest, httpResponse, next){
    httpResponse.write(" World !!!");
    httpResponse.end();
});

app.listen(8080);