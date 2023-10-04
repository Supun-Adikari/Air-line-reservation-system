const Method = require("../Controller/method");
const {executeSQL} = require("../Database/database");

async function adminLogin(method){
        
    const body = method.getBody();
    
    console.log(body);
    const username = body.username;
    const password = body.password;    
    try{
        const [validation] = await executeSQL('SELECT id,username, password_ FROM admins WHERE username =?',[username]);
        // console.log(validation.Password);
        console.log(validation);
        // const status = password.localeCompare(validation.password_);
        const status =(''+password)==(''+validation.password_);
        console.log(status)
        console.log("Status Above");
        const adminUsername = validation.username
        const adminID = validation.id;
        
        if (status){

            // const token = getAccessToken(adminID);
            // console.log(token);
            
            //method.setToken(token,true,50000000);
            
            console.log(adminUsername + " Logged In Successfully !!!");
            
            const revenue = await getRevenue();
            console.log(revenue);
            return ({"adminID":adminID,"status":true, "revenue_AA380":revenue[0], "revenue_B737":revenue[1], "revenue_B757":revenue[2]});
            
        }else{
            console.log(e)
            return("Error");
        }

    }catch(e){
        console.log(e);
        return("Error");
    } 
}


//Report 01
async function getPassengerDetails(searchTerm){
    if(!searchTerm){
        return null;
    }

    const flight_id = ""+searchTerm;

    const [PassengerDetails] = await executeSQL('CALL get_passenger_details(?)', [flight_id]);

    console.log(PassengerDetails);

    return PassengerDetails;
}


//Report 02
async function getNoBookings_Daterange(queries){
    try{
    const from_date = queries.startdate;
    const to_date = queries.enddate;
    const destination = queries.city;

    return await executeSQL('CALL get_passenger_count(?, ?, ?)', [from_date, to_date, destination]);;
    }
    catch(e){
        console.log(e);
        return [[[0]]];
    }
}


//Report 03
async function getBookingsByType(queries){
    
    console.log(queries);
    const bookingsValue = {G:'0',R:'0'};
    try{
    const from_ = queries.startdate;
    const to_ = queries.enddate;


    const [bookings] = await executeSQL('CALL get_no_of_bookings(?, ?)', [from_, to_]);
    console.log(bookings);
    console.log("Above is bookings");
    bookings.forEach(booking => {
        if(booking.user_category=='G'){
            bookingsValue.G = booking.no_of_bookings;
        }             
        else{
            bookingsValue.R = booking.no_of_bookings;
        }     
    });
    console.log(bookingsValue);

    return bookingsValue;
    }
    catch(e){
        console.log(e);
        return bookingsValue;
    }
}


//Report 04
async function getOldflights(queries){

    console.log(queries);
    try{
    const origin = queries.Dep_city;
    const destination = queries.Dest_city;

    const [oldFlight] = await executeSQL('CALL get_old_passengers(?, ?)', [origin, destination]);
    console.log(oldFlight);
    console.log("Above is oldFlight");

    return oldFlight;
    }
    catch(e){
        console.log(e);
        return [[0]];
    }
}


//Report 05
async function getRevenue(){
    return await executeSQL('SELECT total_revenue FROM total_revenue_by_type ORDER BY aircraft_type');
}


module.exports= {adminLogin, getRevenue, getPassengerDetails, getNoBookings_Daterange,getBookingsByType,getOldflights};