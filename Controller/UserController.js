const {executeSQL} = require("../Database/database");

class UserControl{
    async getReservation(method,user){
        try{
            const body = method.getBody();
            // const count = body.count;
            const data = await executeSQL(`SELECT * FROM tickets`);
            return(data);
        }catch(err){
            return err;
        }
    }
    /////////////////////////// GET ///////////////////////////	
    async getFlights(method){
        try{
            const body = method.getQuery();
            // console.log(body);
            const From = body.Dep_Country;
            const To = body.Dest_Country;
            const From_Date = body.From_date;
            const To_Date = body.To_date;
            
            const [data] = await executeSQL('CALL search_flights(?, ?, ?, ?)', [From, To, From_Date, To_Date]);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getAvailableSeats(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }


    async getBookFlight(method){
        try{
            const body = method.getQuery();
            console.log(body);
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getSeatPrice(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getFlightStatus(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getDestinations(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getBookedFlightDetails(method,user){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;

            const data = await user.getBookedFlightDetails(From,To,From_Date,To_Date);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getPastFlights(method,user){
        try{
            const body = method.getBody();

            const PID = body.PID;

            const data = await user.getPastFlights(PID);
            return(data);
        }catch(err){
            return err;
        }
    }

    /////////////////////////////////// POST ///////////////////////////////////////////////////
    async addUserandBookTicket(method){
        try{
            const body = method.getBody();

            console.log(body);

            const title = body.title;
            const first_name = body.fname;
            const last_name = body.lname;
            const email = body.email;
            const DoB = body.DoB;
            const country = body.Country;
            const AorC = body.AorC;
            const seat_class = body.flightClass;
            const seatID = body.SeatID;
            const flightID = body.flightID;

            await executeSQL('INSERT INTO users (title, f_name, l_name, DoB, email, country) VALUES (?, ?, ?, ?, ?, ?)', [title, first_name, last_name, DoB, email, country]);
            const [data] = await executeSQL('SELECT id FROM users WHERE (title = ? AND f_name = ? AND l_name = ? AND DoB = ? AND email = ? AND country = ? AND user_category = ?) LIMIT 1',[title , first_name, last_name, DoB, email, country, 'G']);
            console.log(data);
            console.log("user added");
            await executeSQL('CALL create_new_ticket(?, ?, ?, ?, ?)', [ flightID, seat_class, seatID, data.id, AorC]);
            console.log("New Ticket created.");
            return data;
        }catch(err){
            console.error(err);
            return "Error";
        }
    }   


    
    
    
    
    
    
    
    
    async postCancelBooking(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
           
        }catch(err){
            return err;
        }
    }

    async postGuestUserSubmission(method){
        try{
            const body = method.getBody();

            const From = body.From;
            const To = body.To;
            const From_Date = body.From_Date;
            const To_Date = body.To_Date;
            
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);

        }catch(err){
            return err;
        }
    }

    /////////////////////////////////// UPDATE ///////////////////////////////////////////////////


    /////////////////////////////////// DELETE ///////////////////////////////////////////////////
}

module.exports = UserControl;