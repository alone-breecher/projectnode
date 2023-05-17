// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract NodeFinal {
    struct Job {
        address owner;
        string title;
        string description;
        uint256 token;
        uint256 deadline;
        uint256 freelancerApplied;
        bool deleted;
        uint256[] applicationIds;
    }

    struct FreelancerApplication {
        address freelancer;
        string coverLetter;
        string email;
    }

    struct JobWithApplications {
        address owner;
        string title;
        string description;
        uint256 token;
        uint256 deadline;
        uint256[] applicationIds;
    }

    mapping(uint256 => Job) public jobs;
    mapping(uint256 => FreelancerApplication) public applications;
    uint256 public numberOfJobs = 0;
    uint256 public numberOfApplications = 0;

    function postJob(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _token,
        uint256 _deadline
    ) public returns (uint256) {
        Job storage job = jobs[numberOfJobs];

        require(bytes(_title).length > 0, "Title is required");
        require(bytes(_description).length > 0, "Description is required");
        require(_token > 0, "Token amount must be greater than 0");
        require(_deadline > block.timestamp, "Deadline must be in the future");

        job.owner = _owner;
        job.title = _title;
        job.description = _description;
        job.token = _token;
        job.deadline = _deadline;
        job.deleted = false;

        numberOfJobs++;
        return numberOfJobs - 1;
    }

    function applyToJob(uint256 _jobId, string memory _coverLetter, string memory _email) public {
        Job storage job = jobs[_jobId];
        require(!job.deleted, "Job does not exist");
        require(job.deadline > block.timestamp, "Job deadline has passed");

        FreelancerApplication storage application = applications[numberOfApplications];
        application.freelancer = msg.sender;
        application.coverLetter = _coverLetter;
        application.email = _email;

        job.applicationIds.push(numberOfApplications);
        numberOfApplications++;
    }

    function getJobs() public view returns (JobWithApplications[] memory) {
        JobWithApplications[] memory allJobs = new JobWithApplications[](numberOfJobs);

        for (uint256 i = 0; i < numberOfJobs; i++) {
            Job storage job = jobs[i];
            if (!job.deleted) {
                allJobs[i] = JobWithApplications(
                    job.owner,
                    job.title,
                    job.description,
                    job.token,
                    job.deadline,
                    job.applicationIds
                );
            }
        }

        return allJobs;
    }

    function getApplications(uint256 _jobId) public view returns (FreelancerApplication[] memory) {
        Job storage job = jobs[_jobId];
        require(!job.deleted, "Job does not exist");

        uint256[] storage applicationIds = job.applicationIds;
        uint256 numApplications = applicationIds.length;
        FreelancerApplication[] memory allApplications = new FreelancerApplication[](numApplications);

        for (uint256 i = 0; i < numApplications; i++)
{
allApplications[i] = applications[applicationIds[i]];
}

   return allApplications;
}
}