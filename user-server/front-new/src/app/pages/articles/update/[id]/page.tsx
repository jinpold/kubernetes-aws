'use client'

import { AttachFile, FmdGood, ThumbUpAlt } from '@mui/icons-material';
import { MyTypography } from '@/app/component/common/style/cell';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getSaveArticle } from '@/app/component/articles/service/article.slice';
import { saveArticle } from '@/app/component/articles/service/article.service';
import { getAllBoards } from '@/app/component/boards/service/board.slice';
import { fetchAllBoards } from '@/app/component/boards/service/board.service';
import { parseCookies } from 'nookies';
import { jwtDecode } from 'jwt-decode';
import { useForm } from 'react-hook-form';
import { PG } from '@/app/component/common/enums/PG';



export default function ArticleUpdate({ params }: any) {

  const router = useRouter();

  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors }, } = useForm();

  const board: [] = useSelector(getAllBoards);
  
  const handelCancel = (e:any) => {
    router.back()
  }

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data))
    dispatch(saveArticle(data))
    .then((res:any)=>{
      router.push(`${PG.ARTICLE}/list/${data.board}`)
    })
    .catch((error:any)=>{
      console.log('article page onSubmit error : {}',error)
    })
  }


  return (
    <form className="max-w mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
        <input className="block mb-2 text-gray-900 dark:text-white" 
        type='hidden'value={jwtDecode<any>(parseCookies().accessToken).id} {...register('writer', { required: true })} readOnly/>
          {MyTypography(jwtDecode<any>(parseCookies().accessToken).username + '님의 Article 수정하기', '1.5rem')}
        <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">good good goood</label>
        <select defaultValue={params.id} {...register('board', { required: true })}   
          className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
         
          {board.map((i: IBoard) =>
            <option key={i.id} value={i.id}>{i.title}</option>
          )}

        </select>

        <input className="title bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" placeholder="Title"
          type="text" {...register('title', { required: true, maxLength: 30 })} />
        <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" placeholder="Describe everything about this post here"
          {...register('content', { required: true, maxLength: 30 })} />

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

        <div className="buttons flex">
          <div className="btn  overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full 
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
         onClick={handelCancel}>Cancel</div>
          {/* <div className="btn  overflow-hidden relative w-30 bg-blue-500 text-white p-3 px-8 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full 
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
            onSubmit={handleSubmit}> Post </div> */}
          <input type="submit" value="SUBMIT" />
        </div>
      </div>
    </form>
  )
}