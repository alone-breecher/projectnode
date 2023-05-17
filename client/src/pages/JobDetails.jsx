import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import contractInstance from '../../contractservice.jsx';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const JobDetails = () => {
  const { state } = useLocation();
  const { apply, getApplications, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [freelancer, setFreelancer] = useState([]);
  const [coverLetter, setCoverLetter] = useState('');
  const [email, setEmail] = useState('');
  const remainingDays = daysLeft(state.deadline);


  const handleApply = async () => {
    try {
      // Call the applyToJob function
      await contractInstance.methods.applyToJob(jobId, coverLetter, email).send({ from: web3.eth.defaultAccount });
  
      // Clear the form inputs or perform any desired actions after successful application
      setCoverLetter('');
      setEmail('');
  
      // Display success message or perform other actions
    } catch (error) {
      // Handle the error
      console.error('Error applying to job:', error);
      // Display error message or perform other error handling actions
    }
  };
  return (
    <div>
      {isLoading && <Loader/>}
      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
        <div className="flex-1 flex-col">
          <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
            <div className="absolute h-full bg-[#4acd8d]" style={{ width: `${calculateBarPercentage(state.target)}%`, maxWidth: '100%'}}>
            </div>
            </div>
            </div>
            <div className='flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]'>
            <CountBox title='Days Left' value={remainingDays} />
            <CountBox title='freelancers applied' value={freelancer.length} />

            </div>
        </div>

        <div className='mt-[60px] flex lg:flex-row flex-col gap-5'>
          <div className='flex-[2] flex flex-col gap-[40px]'>
            <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Client</h4>
            <div className='mt-[20px] flex flex-row items-center flex-wrap  gap-[14px]'>
              <div className='w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer'>
                <img src={thirdweb} alt='user' className='w-[60%] object-contain' />

              </div>
<div>
  <h4 className='font-epilogue font-semibold text-[14px] text-white break-all'>{state.owner}</h4>
  <p className='mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]'> 10 Jobs</p>
</div>
            </div>
            </div>

            <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Description</h4>
          <div className='mt-[20px]'>
            <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'> {state.description}</p>


          </div>
            </div>

            <div>
            <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Freelancers</h4>
          <div className='mt-[20px] flex flex-col gap-4'>
             {freelancer.length > 0 ? freelancer.map((item,index) => (
              <div>
                FREELANCERS
              </div>
             )) : (
              <p className='font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify'>No freelancer applied. Be the first one</p>
             )} 
             </div>
            </div>
          </div>

          <div className='flex-1'>
          <h4 className='font-epilogue font-semibold text-[18px] text-white uppercase'>Apply</h4>

          <div className='my-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px]'>
            <p className='font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]'>
              apply for this job
               </p>
               <div className='mt-[30px]'>
                <input
                type="text"
                value={coverLetter}
                placeholder='Enter your email'
                className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                onChange={(e) => setCoverLetter(e.target.value)}
                />
              </div>
              </div>
               <div className='mt-[30px]'>
                <input
                type="text"
                value={email}
                placeholder='Enter your cv'
                className='w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]'
                onChange={(e) => setEmail(e.target.value)}
                />
              </div>
        <CustomButton 
        btnType='button'
        title='apply'
        styles='w-full bg-[#8c6dfd]'
        handleClick={handleApply}
        />
        </div>
        
        </div>
      

          </div>

        
  )
}

export default JobDetails