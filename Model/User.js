const {hash,compare} = require("bcryptjs");
const {executeSQL} = require("../Database/database");
const uniqid = require('uniqid');

class RegUser{
    constructor(profile_ID,UserName,type,fname,lname,sessionID,lastUsedTime){
        this.profile_ID = profile_ID;
        this.UserName = UserName;
        this.userTP = type;

        if(sessionID){
            this.sessionID = sessionID;
        }
        else{
            this.sessionID = uniqid();
        }
        if(lastUsedTime){
            this.lastUsedTime = lastUsedTime;
        }
        else{
            this.lastUsedTime = Number(new Date().getTime());
        }
        if(fname){
            this.fname = fname;
        }
        else{
            this.fname = null;
        }
        
        if(lname){
            this.lname = lname;
        }
        else{
            this.lname = null;
        }
    }

    getType(){
        return(this.userTP);
    }

    getID(){
        return(this.profile_ID);
    }
    getUserName(){
        return(this.UserName);
    }
     
    getFname(){
        return(this.fname);
    }

    getlname(){
        return(this.lname);
    }
    
    
    async setLastUsedTime(){

        this.lastUsedTime = Number(new Date().getTime());
        try{
            await executeSQL(`UPDATE Sessions SET end_time= ? WHERE user_Id = ?`,[Number(this.lastUsedTime),this.profile_ID]);
        }catch(e){
            console.log("Error");
        }  
    }

    async changePass(CurrPassword,NewPassword){
        
        var credential,hashedPass,success;

        try{
            
            credential = await executeSQL(`SELECT UserName,Password FROM registered_users WHERE id = ?`,[this.profile_ID]); 
            hashedPass = credential[0].password;
            success = await compare(CurrPassword,hashedPass); 
        }
        catch(e){
            return ("Error");
        }   
        
        if(success){
            try{
                
                const hashedPassword = await hash(NewPassword,10);
                await executeSQL(`UPDATE registered_users SET Password = ? WHERE id = ?`,[hashedPassword,this.profile_ID]); 
                    
                return ("Password Changed");
               
            }catch(e){
                return(e);
            }   
        }else{
            return("Error");
        }  
    }

    async getBookedFlightDetails(From,To,From_Date,To_Date){
        try{
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    async getPastFlights(profile_ID){
        try{
            const sqlQuary = ``;

            const data = await executeSQL(sqlQuary);
            return(data);
        }catch(err){
            return err;
        }
    }

    
}

module.exports = {RegUser};