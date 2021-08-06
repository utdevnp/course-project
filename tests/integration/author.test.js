const authorFactory = require("../factories/authorFactory");
const {User} = require("../../models/userModel");
const request = require("supertest");

let server;
describe("api/author",()=>{
    let token;

    beforeEach(()=>{
        server = require("../../index");
        token  = new User({isAdmin:true}).generateAuthToken();
    })

    afterEach( async ()=>{
        server.close();
        authorFactory.clear();
    })

    describe("GET/", ()=>{

        

        it("should return 401 if auth token is not provided", async ()=>{
            token = '';
            const res  = await request(server).get("/api/author")
            .set("x-auth-header",token);

            expect(res.status).toBe(401);
        })

        it("should return 200 if author token is provided ", async ()=>{
            await authorFactory.createMany();
            
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
                  
            expect(res.status).toBe(401);
        })

        it("should retun 400 if input is invalid ", async ()=>{
            const res = await request(server).post("/api/author")
                    .set("x-auth-header",token)
                    .send({
                        name:"ut",
                        bio:"developer",
                        website:"http://utdev.com"
                    });
            expect(res.status).toBe(400)
        })

        it("should retun 200 if input is invalid ", async ()=>{
            const res = await request(server).post("/api/author")
                    .set("x-auth-header",token)
                    .send(authorFactory.validData());
            
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty("name",authorFactory.validData().name);
        })
    })
})