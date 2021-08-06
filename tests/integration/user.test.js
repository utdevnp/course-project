const request = require("supertest");
const userFactory = require("../factories/userFactory");
let server;
describe("user route",()=>{
   


    beforeEach(()=>{
        server = require("../../index");
    })

    afterEach( async ()=>{
        server.close();
        userFactory.clear();
    })


    describe("POST/",()=>{

      

        it("should return 400 if invalid input ",async ()=>{

            const res = await request(server).post("/api/user")
                        .send(userFactory.inValidData());

            expect(res.status).toBe(400);
        })

        it("should return 400 if email is already exist", async ()=>{
            await userFactory.create();

            const res = await request(server).post("/api/user")
            .send(userFactory.validData());

            expect(res.status).toBe(400);
        })

        it("should return 200 if user input is valid",async ()=>{
        const res = await request(server).post("/api/user").send(userFactory.validData());
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("email",userFactory.validData().email);
        })
    });

    describe("GET/",()=>{
        
        it("should return 401 if token is invalid", async ()=>{
            const res = await request(server).get("/api/user")
            .set("x-auth-header","dskfjksfsfsf");

            expect(res.status).toBe(401);
        })

        it("should return 200 and data if token is valid",async ()=>{
            const user = await  userFactory.create();
            const token = user.generateAuthToken()
          

            const res = await request(server).get("/api/user")
            .set("x-auth-header",token);

          

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("email",user.email);
        })
    })
})