const userModel = require("../../../models/userModel");
const userFactory = require("../../factories/userFactory");
describe("uesr model ",()=>{

    it("shound return model  if input is valid", async ()=>{
        const user = await userModel.validate(userFactory.validData());
        expect(user.value).toHaveProperty("email",userFactory.validData().email);
    })
})