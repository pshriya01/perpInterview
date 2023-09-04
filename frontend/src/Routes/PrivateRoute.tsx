import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}:any) => {
    const isAuth=useSelector((store:RootState)=>store.authReducer.isAuth)
    const navigate=useNavigate()
    console.log(isAuth)
    if(isAuth===false){
    return  <Navigate to={'/login'}></Navigate>
    }
    
      return <div>
        {children}
      </div>;
}

export default PrivateRoute