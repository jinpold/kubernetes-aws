import { createAsyncThunk } from "@reduxjs/toolkit";
import { findAllUsersAPI, findCountAPI, findDeleteByIdAPI, findExistUsernameAPI, findLoginAPI, findModifyAPI, findUserByIdAPI, fineLogoutAPI } from "./user-api";
import { IUsers } from "../model/user";


export const findAllUsers: any = createAsyncThunk(
    'users/findAllUsers',
    async (page: number) => {
        console.log('findAllUsers page : ' + page)
        const data: any = await findAllUsersAPI(page);
        const { message, result }: any = data;
        console.log('----- API를 사용한 경우 ------')
        console.log('message : ' + message)
        console.log(JSON.stringify(result))
        return data
    }
)
export const findUserById: any = createAsyncThunk( 
    'users/findUserById',                      
    async (id: number) => {
        console.log('findUserById id : ' + id)
        const data: any = await findUserByIdAPI(id); 
       
        return data
    }
)
export const findModify: any = createAsyncThunk( 
    'users/findModify',                      
    async (user: IUsers) => {
        console.log('findModify : ' + user)
        const data: any = await findModifyAPI(user); 

       
        return data
    }
)
export const findDeleteById: any = createAsyncThunk( 
    'users/findDeleteById',                      
    async (id: IUsers) => {
        console.log('findDeleteById : ' + id)
        const data: any = await findDeleteByIdAPI(id);
       
        return data
    }
)
export const findCount: any = createAsyncThunk( 
    'users/findCount',                      
    async () => {
        console.log('findCount : ')
        const data: any = await findCountAPI(); 

        return data
    }
)
export const findLogin: any = createAsyncThunk( 
    'users/findLogin',    
                      
    async (user:IUsers) => await findLoginAPI(user)
)

export const findExistUsername: any = createAsyncThunk( 
    'users/findExistUsername',    
                      
    async (username:string) => await findExistUsernameAPI(username)
)

export const fineLogout : any = createAsyncThunk( 
    'users/fineLogout',
                      
    async () => await fineLogoutAPI()
)

