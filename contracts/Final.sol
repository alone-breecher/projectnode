// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Final {
   struct Job {
        address owner;
        string title;
        string description;
        uint256 token;
        uint256 deadline;
        uint256 freelancerApplied;
        bool deleted;
        address freelancer;
        string coverLetter;
        string email;
    }

    
    mapping(uint256 => Job) public jobs;

    uint256 public numberOfJobs = 0;

    function createJob(address _owner, string memory _title, string memory _description, uint256 _token, uint256 _deadline) public returns (uint256) {

        Job storage job = jobs[numberOfJobs];
                require(_deadline > block.timestamp, "The deadline of the work should be in the future.");

        job.owner = _owner;
        job.title = _title;
        job.description = _description;
        job.token = _token;
        job.deadline = _deadline;

        numberOfJobs++;

        return numberOfJobs - 1;
    }
    function getJobs() public view returns (Job[] memory) {
        Job[] memory allJobs = new Job[](numberOfJobs);

        for(uint i = 0; i < numberOfJobs; i++) {
           Job storage item = jobs[i];

            allJobs[i] = item;
        }

        return allJobs;
    }

function applyToJob(uint256 _id,address _freelancer, string memory _coverLetter, string memory _email) public returns (uint256) {

        Job storage job = jobs[numberOfJobs];

        job.freelancer = _freelancer;
        job.title = _coverLetter;
        job.description = _email;

        return job.freelancerApplied =  job.freelancerApplied + 1;

    }

    function getApplications(uint256 _id) public view returns (address, string memory, string memory) {
    require(_id < numberOfJobs, "Invalid job ID");

    Job storage job = jobs[_id];

    return (job.freelancer, job.coverLetter, job.email);
}


}