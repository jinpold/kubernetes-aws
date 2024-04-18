'use client'
import { IArticle } from "@/app/components/article/model/article";
import { findAllArticles, findArticlePost, findBoardMyList } from "@/app/components/article/service/article-service";
import { getAllArticles, getArticlePost } from "@/app/components/article/service/article-slice";
import { PG } from "@/app/components/common/enums/PG";
import { MyTypography } from "@/app/components/common/style/cell";
import { AttachFile, FmdGood, ThumbUpAlt } from "@mui/icons-material";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { title } from "process";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const WriterArticlePage:NextPage = () => {


  const dispatch = useDispatch()
  const router = useRouter()
  const saveMsg = useSelector(getArticlePost)
  const [newPost, setNewPost] = useState({} as IArticle)

  const cancelHandler = () => {
    alert("취소 완료")
    router.back();
  }

  const titleHandler = (e:any) => setNewPost
  ({...newPost, title: e.target.value})

  const contentHandler = (e:any) => setNewPost
  ({...newPost, content: e.target.value})
  
  const boardIdHandler = (e:any) => setNewPost
  ({...newPost, boardId : parseInt(e.target.value)}) 
  

  const postHandler = () => {
    dispatch(findArticlePost(newPost));
    if(saveMsg?.message==='SUCCESS'){
      router.push(`${PG.ARTICLE}/list/${newPost.boardId}`);
      alert("post 완료");
    }else if(saveMsg?.message==='FAILURE'){
      alert("post 실패");
    }
  }

  useEffect(()=>{},[]) // 보드리스트가 넘어오게 해야한다.


    return(<>
    
    <form className="max-w-sm mx-auto">
    <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
    <select onChange={boardIdHandler} id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option value={1}>Review</option>
    <option value={2}>Q&A</option>
    {/* <option value="CA">Canada</option>
    <option value="FR">France</option>
    <option value="DE">Germany</option> */}
    </select>
    </form>
    <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
      {MyTypography('Article 작성', "1.5rem")}
      <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder="Title" type="text" name="title" onChange={titleHandler} />
      <textarea className="content bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" placeholder="Describe everything about this post here" name="content" onChange={contentHandler}></textarea>
      {/* <!-- icons --> */}
      <div className="icons flex text-gray-500 m-2">
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <ThumbUpAlt component={ThumbUpAlt}></ThumbUpAlt>
        </svg>
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <FmdGood component={FmdGood}></FmdGood>
        </svg>
        <svg className="mr-2 cursor-pointer hover:text-gray-700 border rounded-full p-1 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <AttachFile component={AttachFile}></AttachFile>
        </svg>
        <div className="count ml-auto text-gray-400 text-xs font-semibold">0/300</div>
      </div>
       {/* <!-- buttons --> */}
       <div className="buttons flex">
        <div className="btn  overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
          onClick={cancelHandler}>Cancel</div>
        <div className="btn  overflow-hidden relative w-30 bg-blue-500 text-white p-3 px-8 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
          onClick={postHandler}> Post </div>
      </div>
    </div>

    
  </> )
}
export default WriterArticlePage