const express = require("express");
// define express in app constant
const app = express(); 

// import exports startup functions
require("./startup/logging")();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/prod")(app);



// listen or serve app in given port number like 3000,8000

let port  = process.env.PORT || 9000; // set listening port of the service 
if (process.env.NODE_ENV !== 'ci') {
    const server = app.listen(port,function(){
        console.log(`Server running at port ${port} on http://localhost:${port}`);
    })

    module.exports = server; // for getting http endpoint in test module

}
