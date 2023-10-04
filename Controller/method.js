const {URL}= require('url');
const keys = ['CSETwenty'];

const dotenv = require('dotenv');
dotenv.config();

class Method{ 
    constructor(req,res){
        this.req = req;
        this.res = res;
        this.type = req.method;
        this.url = new URL("http://localhost"+":"+ process.env.port +req.url);
        this.seperator = req.url.split(/[/,?]/);
        this.user=null;
    }
    getPath(ind){
        return this.seperator[ind];
    }

    searchURL(query){
        return this.url.searchParams.get(query);
    }
    getToken(){
        // const authHeader = this.req.headers['authorization'];
        // const token = authHeader && authHeader.split(' ')[1];
        // console.log("Header eka tyena thana");
        // console.log(this.req.headers);
        // console.log(this.req.headers['authorization']);
        return(this.req.headers['authorization']);
    }

    setUser(user){
        this.user=user;
    }

    getUser(){
        return(this.user);
    }

    getBody(){
        return(this.req.body)
    }

    getQuery(){
        return(this.req.query);
    }   

}



module.exports = Method;
