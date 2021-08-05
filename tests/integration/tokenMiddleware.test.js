const request = require("supertest");
let server;
let token;
jest.setTimeout(150000);

describe("x-auth-token",()=>{

    beforeEach(()=>{
        server  = require("../../index");
        token = "12345";
    });

    afterEach(()=>{
        server.close();
    })

    it("should return 401 if token is invalid", async ()=>{
        const res = await request(server).get("/api/course").set("x-auth-header",token);
        expect(res.status).toBe(401);
    })

})