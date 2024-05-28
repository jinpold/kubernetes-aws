import { createAsyncThunk } from "@reduxjs/toolkit";
import { AllArticlesAPI, countArticlesAPI, deleteArticlesAPI, findArticlesAPI, findByBoardIdAPI, modifyArticlesAPI, mylistArticlesAPI, saveArticleAPI } from "./article.api";
import { IUser } from "../../users/model/user.model";

export const fetchAllArticles: any = createAsyncThunk(
    'articles/fetchAllArticles',
    async (page: number) =>  await AllArticlesAPI(1)
)

export const fetchMylistArticles: any = createAsyncThunk(
    'articles/fetchMylistArticles',
    async (id:number) =>  await mylistArticlesAPI(id)
)


export const findArticleById: any = createAsyncThunk(
    'articles/findArticleById',
    async (id: number) => {
        console.log('findArticleById id : ' + id)
        const data: any = await findArticlesAPI(id);
        return data
    }
)

export const findCountArticle: any = createAsyncThunk(
    'articles/findCountArticle',
    async () => {
        console.log('findCountArticle : running check')
        const data: any = await countArticlesAPI();
        return data
    }
)


export const modifyArticleById: any = createAsyncThunk(
    'articles/modifyArticleById',
    async (props: IArticle) => {
        console.log('modifyArticleById id : ' + props)
        const data: any = await modifyArticlesAPI(props);
        return data
    }
)

export const deleteArticleById: any = createAsyncThunk(
    'articles/deleteArticleById',
    async (id: number) => {
        console.log('deleteArticleById id : ' + id)
        const data: any = await deleteArticlesAPI(id);
        return data
    }
)

export const saveArticle: any = createAsyncThunk(
    'articles/saveArticleById',
    async (props: IArticle) => await saveArticleAPI(props)
)

export const findByBoard: any = createAsyncThunk(
    'articles/findByBoard',
    async (id: number) => await findByBoardIdAPI(id)
)
