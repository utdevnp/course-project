const request = require("supertest");
let server
describe("home", ()=>{

    beforeEach(()=>{
        server = require("../../index");
    })
    afterEach(()=>{
        server.close();
    })

    it("should return 200 ", async ()=>{
        const res = await request(server).get("/");
        expect(res.status).toBe(200);
    })
})