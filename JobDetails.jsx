import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader,FormField } from '../components';
import { calculateBarPercentage, daysLeft } from '../utils';
import { thirdweb } from '../assets';

const JobDetails = () => {
  const { state } = useLocation();
  const { applyToJob,pId } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [freelancer, setFreelancer] = useState([]);
  const remainingDays = daysLeft(state.deadline);
  const [coverLetter, setCoverLetter] = useState([]);
  const [email, setEmail] = useState([]);

  const [form, setForm] = useState({
    coverLetter: '',
    email: ''
   });
   const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleApply = async () => {
    setIsLoading(true);

    await applyToJob({ pId , ...form });
    setIsLoading(false);
    navigate('/');

    console.log(form);
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
<form onSubmit={handleApply} className='w-full mt-[65px] flex flex-col gap-[30px]'>
        <div className='flex flex-wrap gap-[30px]'>
        <FormField 
        labelName="enter coverletter *"
      placeholder="coverletter"
      inputType="text"
      value={form.coverLetter}
      handleChange={(e) => handleFormFieldChange ('coverLetter', e)}
        />


        </div>
        <FormField 
        labelName="email*"
      placeholder="Enter your mail"
      isTextArea
      value={form.email}
      handleChange={(e) => handleFormFieldChange ('email', e)}
        />
          <div className="flex justify-center items-center mt-[40px]">
          <CustomButton
          btnType='button'
          title='Submit new application'
          styles='bg-[#1dc071]'
          handleClick={handleApply}
          />

        </div>

      </form>
</div>
</div>
       
       </div>
       </div>
         )
}

export default JobDetails