const TestContract = artifacts.require("TestContract");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("TestContract", function (/* accounts */) {
  it("should assert true", async function () {
    await TestContract.deployed();
    return assert.isTrue(true);
  });
});
