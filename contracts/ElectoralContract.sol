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

    function registerAsCandidate() public payable {
        require(
            candidates[msg.sender].exists == false,
            "User already registered as Candidate"
        );
        require(
            voters[msg.sender].exists == false,
            "User already registered as Voter"
        );
        candidate memory newCandidate = candidate(true, 0);
        candidates[msg.sender] = newCandidate;
    }

    function registerAsVoter() public payable {
        require(
            voters[msg.sender].exists == false,
            "User already registered as Voter"
        );
        require(
            candidates[msg.sender].exists == false,
            "User already registered as Candidate"
        );
        voter memory newVoter = voter(true, false);
        voters[msg.sender] = newVoter;
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