const requireLogin = require("../../../middlewire/requireLogin");
const isAdmin = require("../../../middlewire/isAdmin");
const {User} = require("../../../models/userModel");
const db = require("mongoose");

    it("should populate req.user.isAdmin (true) with valid JWT token", async ()=>{
        const userd = {
            _id: db.Types.ObjectId().toHexString(),
             isAdmin:true
        }
        const token  = new User(userd).generateAuthToken();
        const req = {
            header: jest.fn().mockReturnValue(token)
        };
        const res = {};
        const next= jest.fn();

        requireLogin(req,res,next);
        isAdmin(req, res, next);

        expect(req.user.isAdmin).toBeTruthy();
      
    })