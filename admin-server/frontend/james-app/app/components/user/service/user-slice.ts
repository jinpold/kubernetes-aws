import { createSlice } from "@reduxjs/toolkit";
import { findAllUsers, findCount, findDeleteById, findLogin, findModify, findUserById } from "./user-service";
import { IUsers } from "../model/user";

const userThunks = [findAllUsers]

const status = {
    pending: 'pending',
    fulfilled: 'fulfilled',
    rejected: 'rejected' 
}

const handlePending = (state:any) => {}

const handleRejected = (state:any) => {}

interface IAuth{
    message? : string
    token? : string

}
interface UserState  {
    json?  : IUsers,
    array? : Array<IUsers>,
    auth? : IAuth
}

export const initialState:UserState = {
    json : {} as IUsers, // = 자바 IUsers user = new IUsers; 와 같다.
    array : [],
    auth : {} as IAuth
}

export const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        passwordHandler: (state:any, {payload}) => {state.json.password = payload},
        phoneHandler: (state:any, {payload}) => {state.json.phone = payload},
        jobHandler: (state:any, {payload}) => {state.json.job = payload},
        // setUsername : (state:any, {payload}) => {state.json.username = payload},
        // setPassword : (state:any, {payload}) => {state.json.password = payload}
       
    },
    extraReducers:builder =>{
        const {pending, rejected} = status;

        builder
        .addCase(findAllUsers.fulfilled, (state:any, {payload}:any) => {state.array = payload})
        .addCase(findUserById.fulfilled, (state:any, {payload}:any) => {state.json = payload})
        .addCase(findModify.fulfilled, (state:any, {payload}:any) => {state.array = payload})
        .addCase(findDeleteById.fulfilled, (state:any, {payload}:any) => {state.json = payload})
        .addCase(findCount.fulfilled, (state:any, {payload}:any) => {state.count = payload})
        .addCase(findLogin.fulfilled, (state:any, {payload}:any) => {state.auth = payload})
    }
})

export const getAllUsers = (state:any) => {
    console.log('-- Before useSelector --')
    console.log(JSON.stringify(state.user.array))
    return state.user.array;
}
export const getUserById = (state: any) => (state.user.json)
export const getModify = (state: any) => (state.user.array)
export const getDeleteById = (state: any) => (state.user.json)
export const getCount = (state: any) => (state.user.count)
export const getAuth = (state: any) => (state.user.auth) //getAuth

export const {passwordHandler, phoneHandler, jobHandler } = userSlice.actions

export default userSlice.reducer;