import React from 'react'
import {useNavigate,Link} from 'react-router-dom'


export const HomePage = () => {
    const navigate=useNavigate()
    const handleRedirect=()=>{
      navigate('/category')
    }
  
  return (
    <>
    <div className=' mx-auto ml-10 mr-10 mt-10 bg-custom-teal flex justify-between'>
     <div className='justify-between items-center p-10  '>
        <h1 className='text-2xl text-white font-bold'>Empower Your Interview Success with PrepInterview !!</h1>
        <p className='text-lg text-white font-semi-bold mt-10'>A quick way to prepare for your next interview. Practice key questions,
             get insights about your answers,and get more comfortable inteviewing</p>
        <h2 className='text-2xl text-white font-semi-bold mt-10' >Practice. Get Confident. Get Hired</h2>
        <button onClick={handleRedirect} className='bg-custom-green text-white font-semi-bold mt-10 w-28 h-10 rounded-md'>Get Started</button>
     </div >
     <div className='w-5/12'>
        <img  className='h-[400px]' src='https://static.wixstatic.com/media/90bf65_e9735231a7fd40668e388929f72042a0~mv2.gif'></img>
     </div>
    </div>
    <div className='mt-20'>
    <h1 className='text-2xl text-black mb-10 text-center font-bold'>Features</h1>
    <div className='container flex pl-24 pr-24 mx-auto'>
      <div>
        <h2 className='text-xl pl-4 pr-4 mb-5 text-center  mr-10  text-custom-teal m-auto font-bold'>Take Mock Interviews On Your Own</h2>
        <p className='pl-4 pr-4'>Take unlimited interviews and master your skills from anywhere. No awkward meetups required.</p>
      </div>
      <div >
        <h2 className='text-xl pl-4 pr-4 mb-5 text-center mr-10  text-custom-teal m-auto font-bold'>Practice for the Pressure</h2>
        <p className='pl-4 pr-4'>We use your built-in camera to recreate the pressure of actual interviews so you can gain realistic experience and feel prepared for anything.</p>
      </div>
      <div >
        <h2 className='text-xl pl-4 pr-4 mb-5 text-center mr-10   text-custom-teal m-auto font-bold'>Accelerate your career & earn more</h2>
        <p className='pl-4 pr-4'>Master the skill of interviewing by practicing it just like you practice your trade and give your career a boost.</p>
      </div>
    </div>
    </div>
    <div className='bg-custom-green text-white font-semi-bold text-center'>
    <p className='text-lg text-white font-semi-bold mt-10'> <Link to='/category'>Click here</Link> to start solving interview questions</p>
    </div>
    </>
  )
} 
 