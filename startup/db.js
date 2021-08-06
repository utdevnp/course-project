const db = require("mongoose");
const winston = require("winston");
const env = require("../env/keys");
module.exports = function(){
    
    // connect the database 
    db.connect(env.mongoURI,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
        useCreateIndex:true
    }).then( async () => {
        winston.info(`Connected to ${env.mongoURI}`);
        console.info(`Connected to ${env.mongoURI}`);
    });
   

}

//  //"db":"mongodb+srv://courseUser:1234@cluster0.yzxam.mongodb.net/test"