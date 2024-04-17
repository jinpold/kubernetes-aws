import { createAsyncThunk } from "@reduxjs/toolkit";
import { findAllArticlesAPI, findArticleByIdAPI, findCountAPI, findDeleteByIdAPI, findModifyAPI } from "./article-api";
import { IArticles } from "../model/article";


export const findAllArticles: any = createAsyncThunk( // 데이터를 비동기로 만들어 자바와 주고 받으려고,
    'articles/findAllArticles',                        // createAsyncThunk가 없으면 동기로 보내는 것
    async (page: number) => {
        console.log('findAllArticles page : ' + page)
        const data: any = await findAllArticlesAPI(page); // axios = 자바와 연결해주는 것

        const { message, result }: any = data;
        // console.log('----- API를 사용한 경우 ------')
        // console.log('message : ' + message)
        // console.log(JSON.stringify(result))
    
        return data
    }
)
export const findArticleById: any = createAsyncThunk( 
    'articles/findArticleById',                      
    async (id: number) => (await findArticleByIdAPI(id))
    //return 생략
)

export const findModify: any = createAsyncThunk( 
    'articles/findModify',                      
    async (article: IArticles) => {
        console.log('findModify : ' + article)
        const data: any = await findModifyAPI(article); 

        return data
    }
)

export const findDeleteById: any = createAsyncThunk( 
    'articles/findDeleteById',                      
    async (id: number) => (await findDeleteByIdAPI(id))
   
)
export const findCount: any = createAsyncThunk( 
    'articles/findCount',                      
    async () => (await findCountAPI())
)

