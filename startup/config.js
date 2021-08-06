const config = require("config");
const key = require("../env/keys");
module.exports = function(){
    // cehck the jwt set or not 
    if(!key.jwtSecretToken) {
        throw new Error("ERROR...","JWT Token not set ");
    } 

}