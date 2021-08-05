const authorFactory = require("../factories/authorFactory");
const userFactory = require("../factories/userFactory");
const request = require("supertest");
let token;
let server;
describe("api/author",()=>{

    beforeEach(()=>{
        jest.setTimeout(300000);
        server = require("../../index");
        token = userFactory.authToken(true);
    })

    afterEach( async ()=>{
        server.close();
        await authorFactory.clear();

    })

    describe("GET/", ()=>{
        it("should return 401 if auth token is not provided", async ()=>{
            token = '';
            const res  = await request(server).get("/api/author")
            .set("x-auth-header",token);

            expect(res.status).toBe(401);
        })

        it("should return 200 if author token is provided ", async ()=>{
            const res = await request(server).get("/api/author")
                .set("x-auth-header",token);

            expect(res.status).toBe(200);
            expect(res.body).toBeDefined()

        })
    })

    describe("POST/",()=>{
        it("should return 401 if token is invalid", async ()=>{
            token = "ad";
            const res  = await request(server).post("/api/author")
                    .set("x-auth-header",token)
                    .send(authorFactory.inValidData());
            expect(res.status).toBe(401);
        })

        it("should retun 400 if input is invalid ", async ()=>{
            const res = await request(server).post("/api/author")
                    .set("x-auth-header",token)
                    .send(authorFactory.inValidData());
            
            expect(res.stauts).toBe(400)
        })

        it("should retun 200 if input is invalid ", async ()=>{
            const res = await request(server).post("/api/author")
                    .set("x-auth-header",token)
                    .send(authorFactory.validData());
            
            expect(res.stauts).toBe(200)
            expect(res.body).toHaveProperty("name",authorFactory.validData().name);
        })
    })
})