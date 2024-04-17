import { instance } from '@/app/components/common/configs/axios-config'
import { IArticles } from '../model/article'

export const findAllArticlesAPI = async (page: number) =>{     // axios = 동기식, 
    try{                                                        // axios를 thunk로 감싸면 비동기가 된다
        const response = await instance.get('/articles/list',{
            params: {page, size:10, limit: 10}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}

export const findArticleByIdAPI = async (id: number) =>{ 
    try{                                                       
        const response = await instance.get('/articles/detail',{
            params: {id}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
}

export const findModifyAPI = async (article: IArticles) => {
    try{
        const response = (await instance.put('/articles/modify', article))
            
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}
export const findDeleteByIdAPI = async (id: number) =>{    
    try{                                                        
        const response = await instance.delete('/articles/delete',{
            params: {id}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }
    
}
export const findCountAPI = async () =>{    
    try{                                                        
        const response = await instance.get('/articles/count',{
            params: {}
        })
        return response.data
    }catch(error){
        console.log(error)
        return error
    }

}