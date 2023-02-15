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
    // implement the results functionality
    mapping(address => candidate) candidates;
    mapping(address => voter) voters;
    uint256 public no_of_candidates = 0;
    uint256 public max_no_of_candidates = 4;

    address[] private candidatesAddress = new address[](max_no_of_candidates);

    event candidateRegistrationSuccessful();
    event voterRegistrationSuccessful();

    function registerAsCandidate() public payable {
        require(no_of_candidates <= max_no_of_candidates, "No of max candidates exceeded.");
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
        candidatesAddress[no_of_candidates] = msg.sender;
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

    function getCandidatesData(address candidateAddress)
        public
        view
        returns (candidate memory)
    {
        require(
            candidates[candidateAddress].exists == true,
            "Candidate does not exist"
        );
        return candidates[candidateAddress];
    }

    function getCandidates() public view returns (address[] memory) {
        return candidatesAddress;
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
