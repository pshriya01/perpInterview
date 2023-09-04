import React, { Dispatch, useState } from 'react'
import {useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState } from '../redux/store'
import { Link } from 'react-router-dom'
import { loginSuccess } from '../redux/authReducer/action'


const LoginPage = () => {
    const [email,setEmail]=useState("shas@gmail.com")
    const [password,setPassword]=useState("shas")
    const dispatch:Dispatch<any>=useDispatch()
    const navigate=useNavigate()
    
    const isLoading=useSelector((store:RootState)=>store.authReducer.isLoading)
    const isError=useSelector((store:RootState)=>store.authReducer.isError)
    const isAuth=useSelector((store:RootState)=>store.authReducer.isAuth)
    const user=useSelector((store:RootState)=>store.authReducer.user)
    const token=useSelector((store:RootState)=>store.authReducer.token)
   
   
    const handleLogin=()=>{
      let user={email,password}

      if(user){
         dispatch(loginSuccess(user))
          alert('Login Successful !!') 
          navigate('/')
       
         
        
      }
      else{
        alert('Enter valid credentials !!')
      }
    }
    console.log(isAuth,isLoading,isError,user,token,"token")
  return (
    <div className='container mt-8 m-auto flex justify-between'>
        <div className='w-6/12  '>
           <img className='' src='https://www.artbikashkendra.com/admin/assets/images/login.gif'></img>
        </div>
        <div className='w-8/12 mt-[-0px] flex justify-center items-center '>
            <div className='h-3/5  w-3/5  shadow-my-shadow border-teal-200 '>
                <div className='rounded-full h-2/5 m-auto'>
                    <img className='rounded-full  m-auto mt-[-50px]  h-3/5 ' src='https://cdn.pixabay.com/animation/2022/12/05/10/47/10-47-58-930_512.gif'></img>
                </div>
                <div className= 'mt-[-10px] ml-14'>
                <label className='font-semibold mb-4'>Enter Email :</label>
                <input className='w-10/12 rounded  border-2 border-black' type="email"  placeholder='Email' value={email} name='email' onChange={(e)=>setEmail(e.target.value)} />
                </div>
                <div className='mt-2 ml-14'>
                <label className='font-semibold mb-4'>Enter Password :</label>
                <input className='w-10/12 rounded   border-2 border-black'type="password"  placeholder='Password' value={password} name='password' onChange={(e)=>setPassword(e.target.value)} />
                </div>
                <div className=' ml-14'>
                <button className='w-10/12 rounded  bg-custom-green mt-10 text-white border-2 border-black' onClick={handleLogin}>Login</button>
                </div>
                <h2 className='mt-4 ml-14'>Don't have an account? <Link className='hover:text-custom-green font-bold' to='/signup'>Sign Up here</Link></h2>
            </div>
        </div>
    </div>
  )
}

export default LoginPage

