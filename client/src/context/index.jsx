import React, { useContext, createContext } from 'react';

import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract('0xeEfCc381AC7E7af6721077cd8Ae0cfEF2D4550ED'); // Update the contract address here


  const { mutateAsync: postJob, mutateAsync: applyToJob } = useContractWrite(contract, 'postJob', 'applyToJob');


  const address = useAddress();
  const connect = useMetamask();

  const publishJob = async (form) => {
    try {
      const data = await  postJob({args:[
        address,
        form.title,
        form.description,
        form.token,
        new Date(form.deadline).getTime()
      ]});
      console.log("contract call success ", data);
    } catch (error) {
      console.log("contract call failed ", error);
    }
  }

  const getJobs = async () => {
    const jobs = await contract.call('getJobs');
    const parsedJobs = jobs.map((job, i) => ({
      owner:job.owner,
      title:job.title,
      description: job.description,
      token: ethers.utils.formatEther(job.token.toString()),
      deadline: job.deadline.toNumber(),
      pId: i
    }));
    return parsedJobs;
  }

  const getUserJobs = async () => {
    const allJobs = await getJobs();

    const filteredJobs = allJobs.filter((job) => job.owner === address);

    return filteredJobs;
  }
  const getFreelancers = async (jobId) => {
    const freelancers = await applicationContract.call('getFreelancers', jobId);
    const numberOfFreelancers = freelancers[0].length;

    const parsedFreelancers = [];

    for (let i= 0; i < numberOfFreelancers; i++ ) {
      parsedFreelancers.push({
        freelancer: freelancers[0][i],
        token: ethers.utils.formatEther(freelancers[1][i].toString())
      })
    }

    return parsedFreelancers;
  }

  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        postJob: publishJob,
        getJobs,
getUserJobs,
getFreelancers,
}}
>
{children}
</StateContext.Provider>
);
};

export const useStateContext = () => useContext(StateContext);
