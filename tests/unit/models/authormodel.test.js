const author   = require("../../../models/authorModel");
const authorFactory = require("../../factories/authorFactory");

describe("author model",()=>{

    it("should return model if input is valid", async ()=>{

        const authorm  = author.validate(authorFactory.validData());
        expect(authorm.value).toHaveProperty("name",authorFactory.validData().name);

    })
})