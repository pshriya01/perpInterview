export interface initialState{
    isLoading:boolean,
    isError:boolean,
   isAuth:boolean,
   token:string,
   user:{}
}

export interface Response {
    success?:boolean,
    data?:[]
}

export type authAction={
    type:'LOGIN_SUCCESS' | 'LOGIN_FAILURE' | 'LOGIN_REQUEST'|'LOGOUT_SUCCESS' ,
    payload?:any
}


export interface User {
    id?: number;
    email: string;
    name?: string;
    password: string;
  }