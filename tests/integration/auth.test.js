const request = require("supertest");
const userFactory = require("../factories/userFactory");
const {User} = require("../../models/userModel");
const db = require("mongoose");
let server ;


describe("auth",()=>{

    beforeEach(()=>{
        jest.setTimeout(150000);
        server = require("../../index");
    })

    afterEach( async ()=>{
        server.close();
        await userFactory.clear();
    })

    it("should return 400 if input is invalid",async ()=>{

        const res = await request(server).post("/api/auth")
                .send({
                    email: "abc.akjd",
                    password: 121212
                });

        expect(res.status).toBe(400);
    })

    it("should return 400 if input is valid but  email not exist", async()=>{
        const res = await request(server).post("/api/auth").send({
            email:"abc@gmail.com",
            password:12121222
        })
        expect(res.status).toBe(400);
    })

    it("should return 400 if email is valid but password invalid", async ()=>{

        const user  = await userFactory.create();
        const res = await request(server).post("/api/auth").send({
            email:user.email,
            password:"wewewew@23we"
        })
        expect(res.status).toBe(400);
    })

    it("should return 200 if email and password is valid",async ()=>{
        
        const user  = await userFactory.create();
        const token = user.generateAuthToken();
        const res = await request(server).post("/api/auth").send({
            email:user.email,
            password:userFactory.validData().password
        })

        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("token",token);
        
    })
})