const ElectoralContract = artifacts.require("ElectoralContract");
let electoralContract;

beforeEach(async ()=> {
  electoralContract = await ElectoralContract.new()
})

contract("Electoral Contract", function (/* accounts */) {
  
  console.log("Electoral Contract", electoralContract);
  it("Contract has been Deployed", async function () {
    await ElectoralContract.deployed();
    return assert.isTrue(true);
  });
});
