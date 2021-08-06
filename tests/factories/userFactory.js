const {User} = require("../../models/userModel");
const db = require("mongoose");
const bcrypt = require("bcrypt");

async function create(){
    const user = new User(validData());
    user.password = await hashPassword("12345");
    return user.save();
}

function createMany(){
    User.collection.insertMany([validData()]);
}

function authToken(boolvalue){
    const userd = {
        _id: db.Types.ObjectId().toHexString(),
         isAdmin:boolvalue
    }
   return new User(userd).generateAuthToken();
}

async function clear(){
    return  await User.deleteMany({});
}

function validData(){
    return {
        name: "utdev l",
        email: "utdevnp@gmail.com",
        password: "12345",
        isAdmin: false
    }
}

function inValidData(){
    return {
        name: "utde",
        email: "utdevnp.com",
        password: "12345",
        isAdmin: false
    }
}


async function hashPassword(password){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
   return hash;
}



module.exports.authToken = authToken;
module.exports.inValidData = inValidData;
module.exports.validData = validData;
module.exports.createMany = createMany;
module.exports.create = create;
module.exports.clear=clear;
