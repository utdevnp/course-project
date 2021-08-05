const {Author} = require("../../models/authorModel");

async function create(){
    const author = new Author(validData());
    return author.save();
}

function createMany(){
    Author.collection.insertMany([validData()]);
}


function clear(){
    return  Author.deleteMany({});
}

function validData(){
    return {
        name:"utdev np",
        bio:"developer",
        website:"http://utdev.com"
    }
}

function inValidData(){
    return {
        name:"ut",
        bio:"developer",
        website:"http://utdev.com"
    }
}


module.exports.inValidData = inValidData;
module.exports.validData = validData;
module.exports.createMany = createMany;
module.exports.create = create;
module.exports.clear=clear;
