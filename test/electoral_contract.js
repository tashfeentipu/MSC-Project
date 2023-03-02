const ElectoralContract = artifacts.require("ElectoralContract");
let electoralContract;


contract("Electoral Contract", function (accounts) {
  const candidate = accounts.slice(0, 5);
  const voter = accounts.slice(5, 10)

  before(async () => {
    electoralContract = await ElectoralContract.deployed()
  })

  it("Contract has been Deployed", async function () {
    if (electoralContract) {
      return assert.isTrue(true);
    }
  });

  it("Registers new Candidate", async () => {
    await electoralContract.registerAsCandidate({ from: candidate[0] });
    return assert.isTrue(true);
  });

  it("Rejects same Candidate from registering more than once", async () => {
    try {
      await electoralContract.registerAsCandidate({ from: candidate[0] });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "User has already registered as Candidate.");
    }
  });

  it("Registers new Voter", async () => {
    await electoralContract.registerAsVoter({ from: voter[0] });
    return assert.isTrue(true);
  });

  it("Rejects same Voter from registering more than once", async () => {
    try {
      await electoralContract.registerAsVoter({ from: voter[0] });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "User has already registered as Voter.");
    }
  });

  it("Rejects Voter from registering as Candidate", async () => {
    try {
      await electoralContract.registerAsCandidate({ from: voter[0] });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "User has already registered as Voter.");
    }
  });

  it("Rejects Candidate from registering as Voter", async () => {
    try {
      await electoralContract.registerAsVoter({ from: candidate[0] });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "User has already registered as Candidate.");
    }
  });

  it("Votes Candidate", async () => {
    await electoralContract.registerAsVoter({ from: voter[1] });
    await electoralContract.registerAsVoter({ from: voter[2] });
    await electoralContract.registerAsVoter({ from: voter[3] });
    await electoralContract.voteCandidate(candidate[0], { from: voter[0] });

    return assert.isTrue(true);
  });

  it("Voter Already Voted", async () => {
    try {
      await electoralContract.voteCandidate(candidate[0], { from: voter[0] });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "Voter does not exist or already voted");
    }
  });

  it("Voter Does not exists", async () => {
    try {
      await electoralContract.voteCandidate(candidate[0], { from: voter[4] });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "Voter does not exist or already voted");
    }
  });

  it("Stops from voting unregistered candidate", async () => {
    try {
      await electoralContract.voteCandidate(candidate[4], { from: voter[1] });
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "Candidate does not exist");
    }
  });

  it("Gets Candidate's Votes Correctly", async () => {
    await electoralContract.voteCandidate(candidate[0], { from: voter[1] });
    await electoralContract.voteCandidate(candidate[0], { from: voter[2] });
    await electoralContract.voteCandidate(candidate[0], { from: voter[3] });

    const data = await electoralContract.getCandidatesData(candidate[0]);
    assert.equal(data.votes, 4);

  });

  it("Cannot get Unregistered candidate's Data", async () => {
    try {
      await electoralContract.getCandidatesData(candidate[4]);
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "Candidate does not exist");
    }
  });


});
