var express = require('express');
var router = express.Router();

const Method = require("../Controller/method");

const {getRevenue,getNoBookings_Daterange,getPassengerDetails,getBookingsByType,getOldflights} = require("../Model/AdminAuthentication");
const { application } = require('express');


router.get('/adminLogin', function (req, res, next) {
    res.render('Admin/AdminLogin');
});

router.get('/Passengers', async function (req, res, next) {
    console.log(req);
    const searchTerm = req.query.flight_id;
    console.log(searchTerm);
    console.log("search term eka thyena thana");
    const PassengerDetails = await getPassengerDetails(searchTerm);
    console.log(PassengerDetails);
    console.log("PassengerDetails eka thyena thana");
    res.render('Admin/Passengers',{PassengerDetails:PassengerDetails});
});
    
router.get('/flights', function (req, res, next) {
    res.render('Admin/flights');
});

router.get('/AdminHome', async function (req, res, next) {
    const revenue = await getRevenue();
    console.log(revenue);
    console.log("admin home eke revenue eka thyena thana");
    res.render('Admin/AdminHome',{current:{"revenue_AA380":revenue[0], "revenue_B737":revenue[1], "revenue_B757":revenue[2]}});
});


router.get('/getNoBookings_Daterange', async function (req, res, next) {
    // console.log(req.url.searchParams.get('startdate'));
    console.log("palleha thyenne req eka-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");  
    console.log(req.query);
    const value = await getNoBookings_Daterange(req.query);
    // console.log(value);
    // console.log("Methanata awa");
    res.send(value[0][0]);
});

router.get('/getBookingsByType', async function(req,res,next){
    console.log("palleha thyenne req eka-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log(req.query);
    // console.log(req);
    // console.log(res);
    const value = await getBookingsByType(req.query);
    console.log(value);
    // console.log("Methanata awa");
    res.send(value);
});

router.get('/getOldflights', async function(req,res,next){
    console.log("palleha thyenne req eka-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------");
    console.log(req.query);
    // console.log(req);
    // console.log(res);
    const value = await getOldflights(req.query);
    console.log(value);
    // console.log("Methanata awa");
    res.send(value);

});


  



module.exports = router;
