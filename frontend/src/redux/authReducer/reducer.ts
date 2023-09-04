import { authAction, initialState } from "../../contraints/Type"
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../actionType"

const init:initialState={
    isLoading:false,
    isError:false,
    isAuth:false,
    token:"",
    user:{}
}

export const reducer = (state=init,action:authAction)=>{
     const {type,payload}=action
     switch(type) {
        case LOGIN_REQUEST : {
            return{
               ...state,
               isLoading:true,
               isError:false,
               isAuth:false,
            }
        }
        case LOGIN_SUCCESS : {
            return{
               ...state,
               isLoading:false,
               isAuth:true,
               token:payload.Accesstoken,
               user:payload.user
            // token:payload?.accessToken
            }
        }
        case LOGIN_FAILURE : {
            return{
               ...state,
               isLoading:false,
               isErorr:true,
               isAuth:false,
            //    token:payload?.accessToken
            }
        }
        case LOGOUT_SUCCESS: {
            return {
              ...state,
              isLoading:false,
              isError:false,
              isAuth:false,
              token:"",
              user:{}
            };
          }
        default:{
            return state
        }
     }
    
}