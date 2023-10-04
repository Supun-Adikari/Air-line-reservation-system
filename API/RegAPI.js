var express = require('express');

const router = express.Router();

const {ResponseHandler} = require("../Controller/ResponseController");
const Method = require("../Controller/method");
const UserController = require("../Controller/UserController");
const {ExtractRegUser,logout} = require("../Model/Authentication");

router.use(ExtractRegUser)

const uController = new UserController();

////////////////////////////////////////////////////// GET Requests/////////////////////////////////////////////////////
router.get('/', function (req, res, next) {
    console.log("home ekata awa")
    res.render('home');
  });
  
router.get('/home', function (req, res, next) {
      res.render('home');
  });

router.get('/login', function (req, res) {
    res.render('login'); 
});

router.get('/book', function (req, res) {
    res.render('book');
});

router.get('/feedback', function (req, res) {
    res.render('feedback');
});

router.get('/BookedFlightDetails',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getBookedFlightDetails(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});

// Request No: 17
router.get('/PastFlights',async function(req, res){

    var method = new Method(req,res);
    
    const status = await uController.getPastFlights(method,req.user);
    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);

});



////////////////////////////////////////////////////// POST Requests/////////////////////////////////////////////////////


////////////////////////////////////////////////////// UPDATE Requests/////////////////////////////////////////////////////
// change password

/* router.update('/changePass',async function(req, res){
    console.log("register");
    var method = new Method(req,res);
    
    const status = await register(method);
    
    res.status(ResponseHandler(status)).send(status);

}); */









////////////////////////////////////////////////////// DELETE Requests/////////////////////////////////////////////////////
router.delete('/logout',async function(req, res){
    
    //var method = new Method(req,res);
    
    const status = await logout(req.user);

    console.log(status);
    
    res.status(ResponseHandler(status)).send(status);
    
});


module.exports = router ;
