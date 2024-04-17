'use client'
import { IArticles } from "@/app/components/article/model/article";
import { findArticleById, findModify } from "@/app/components/article/service/article-service";
import { contentHandler, getArticleById, titleHandler } from "@/app/components/article/service/article-slice";
import AxiosConfig from "@/app/components/common/configs/axios-config";
import { PG } from "@/app/components/common/enums/PG";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function ArticleDetailPage (props:any){

    const dispatch = useDispatch()
    const article:IArticles = useSelector(getArticleById)
    const router = useRouter()
    
    useEffect(()=>{
        dispatch(findArticleById(props.params.id))
    },[])

    const handleDelete = () => {
        const url = `${process.env.NEXT_PUBLIC_API_URL}/articles/delete/${props.params.id}`
        const config = AxiosConfig()
        axios.delete(url, config).then(res => {alert(JSON.stringify(res.data))})
      }

    const handleClickTitle  = (e:any) => dispatch(titleHandler(e.target.value))
    const handleClickContent = (e:any) => dispatch(contentHandler(e.target.value))
    const handleModify = () => {
        dispatch(findModify(article))
        router.replace(`${PG.ARTICLE}/list`)
    }

    return(<>
    <h3>게시판 상세</h3>
    <span>ID : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{props.params.id}</Typography>
    <span>제목 : </span><input type="text" placeholder={article.title} name="title" onChange={handleClickTitle} /><br /><br />
    <span>내용 : </span><input type="text" placeholder={article.content} name="content" onChange={handleClickContent} /><br /><br />
    <span>작성자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{article.writerId}</Typography>
    <span>게시글 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{article.boardId}</Typography>
    <span>작성일자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{article.regDate}</Typography>
    <span>수정일자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{article.modDate}</Typography>
    <Button onClick={handleModify}>Update</Button>
    <Button onClick={handleDelete}>delete</Button>
    </>)
}