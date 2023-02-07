// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract ElectoralContract {
    struct candidate {
        bool exists;
        uint256 votes;
    }

    struct voter {
        bool exists;
        bool voted;
    }

    mapping(address => candidate) candidates;
    mapping(address => voter) voters;
    uint public no_of_candidates = 0;

    event candidateRegistrationSuccessful();
    event voterRegistrationSuccessful();

    function registerAsCandidate() public payable {
        require(
            no_of_candidates <= 4,
            "No of max candidates exceeded."
        );
        require(
            candidates[msg.sender].exists == false,
            "User has already registered as Candidate."
        );
        require(
            voters[msg.sender].exists == false,
            "User has already registered as Voter."
        );
        candidate memory newCandidate = candidate(true, 0);
        candidates[msg.sender] = newCandidate;
        no_of_candidates++;
        emit candidateRegistrationSuccessful();
    }

    function registerAsVoter() public payable {
        require(
            voters[msg.sender].exists == false,
            "User has already registered as Voter."
        );
        require(
            candidates[msg.sender].exists == false,
            "User has already registered as Candidate."
        );
        voter memory newVoter = voter(true, false);
        voters[msg.sender] = newVoter;
        emit voterRegistrationSuccessful();
    }

    function getCandidatesVotes(address candidateAddress)
        public
        view
        returns (uint256)
    {
        require(
            candidates[candidateAddress].exists == true,
            "Candidate does not exist"
        );
        return candidates[candidateAddress].votes;
    }

    function voteCandidate(address candidateAddress) public payable {
        require(
            voters[msg.sender].exists == true &&
                voters[msg.sender].voted == false,
            "Voter does not exist or already voted"
        );
        require(
            candidates[candidateAddress].exists == true,
            "Candidate does not exist"
        );
        candidates[candidateAddress].votes++;
        voters[msg.sender].voted = true;
    }
}