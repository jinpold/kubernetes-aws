import { instance } from "@/app/components/common/configs/axios-config"
import { IUsers } from "../model/user"
import { json } from "stream/consumers"

export const findAllUsersAPI = async (page: number) => {
    try{
        const response = await instance.get('/users/list',{
            params: {page, size:10, limit: 10}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findUserByIdAPI = async (id: number) => {
    try{
        const response = await instance.get('/users/detail',{
            params: {id}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findModifyAPI = async (user: IUsers) => {
    try{
        const response = (await instance.put('/users/modify', user))
            
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findDeleteByIdAPI = async (deleteId: IUsers) => {
    try{
        const response = await instance.delete('/users/delete',{
            params: {deleteId}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findCountAPI = async () => {
    try{
        const response = await instance.get('/users/count',{
            params: {}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}
export const findLoginAPI = async (user:IUsers) => {
    try{
        console.log("axios 보내기 전 api 확인용"+JSON.stringify(user))
        const response = await instance.post('/users/login',user)
        // 자바에서 가져오는 메신저 데이터를 담음
        console.log("api 확인용"+JSON.stringify(response.data))
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}