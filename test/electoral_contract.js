const ElectoralContract = artifacts.require("ElectoralContract");
let electoralContract;


contract("Electoral Contract", function (accounts) {
  const [candidate1, candidate2, voter1, voter2, voter3, voter4, candidate3, candidate4, candidate5, voter5] = accounts

  before(async () => {
    electoralContract = await ElectoralContract.deployed()
  })

  it("Contract has been Deployed", async function () {
    if (electoralContract) {
      return assert.isTrue(true);
    }
  });

  it("Registers new Candidate", async () => {
    await electoralContract.registerAsCandidate({ from: candidate1 });
    return assert.isTrue(true);
  });

  it("Rejects same Candidate from registering more than once", async () => {
    try {
      await electoralContract.registerAsCandidate({ from: candidate1 });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "User has already registered as Candidate.");
    }
  });

  it("Registers new Voter", async () => {
    await electoralContract.registerAsVoter({ from: voter1 });
    return assert.isTrue(true);
  });

  it("Rejects same Voter from registering more than once", async () => {
    try {
      await electoralContract.registerAsVoter({ from: voter1 });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "User has already registered as Voter.");
    }
  });

  it("Rejects Voter from registering as Candidate", async () => {
    try {
      await electoralContract.registerAsCandidate({ from: voter1 });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "User has already registered as Voter.");
    }
  });

  it("Rejects Candidate from registering as Voter", async () => {
    try {
      await electoralContract.registerAsVoter({ from: candidate1 });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "User has already registered as Candidate.");
    }
  });

});
