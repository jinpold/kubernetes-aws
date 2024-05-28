'use client'

import { deleteArticleById, findArticleById, modifyArticleById } from "@/app/component/articles/service/article.service";
import { getSingleArticle } from "@/app/component/articles/service/article.slice";
import { MyTypography } from "@/app/component/common/style/cell";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { PG } from "@/app/component/common/enums/PG";
import { getAllBoards } from "@/app/component/boards/service/board.slice";
import { fetchAllBoards } from "@/app/component/boards/service/board.service";

export default function ArticleDetailPage({ params }: any) {
  const dispatch = useDispatch()
  const router = useRouter();

  const articleInfo: IArticle = useSelector(getSingleArticle);
  const board: [] = useSelector(getAllBoards);

  const { register, handleSubmit, formState: { errors }, } = useForm();

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data))
    dispatch(modifyArticleById(data))
      .then(() => {
        router.push(`${PG.ARTICLE}/detail/${data.id}`)
      })
      .catch((error: any) => {
        alert('article infomation modify fail.')
      })
  }

  useEffect(() => {
    dispatch(fetchAllBoards(1))
    dispatch(findArticleById(params.id))
  }, [])

  return (
    <form className="max-w mx-auto" onSubmit={handleSubmit(onSubmit)}>

      <div>
        {MyTypography(articleInfo.title, "2.5rem")}
        <br /><br />
      </div>
      <div className="md:flex mb-8">
        <div className="md:w-1/3">
          <legend className="uppercase tracking-wide text-sm">Location</legend>
          <p className="text-xs font-light text-red">This entire section is required.</p>
        </div>
        <div className="md:flex-1 mt-2 mb:mt-0 md:px-3">
          <label className="block uppercase tracking-wide text-s font-bold">Board type</label>
          <select defaultValue={params.id} {...register('board', { required: true })}
            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {board.map((i: IBoard) =>
              <option key={i.id} value={i.id}>{i.title}</option>
            )}
          </select>
          <br /><br />


          <div className="mb-4">
            <label className="block uppercase tracking-wide text-s font-bold">Title</label>
            <input className="w-full shadow-inner p-4 border-0" type="text" {...register('title', { required: true })} placeholder={articleInfo.title} />
          </div>
          <div className="mb-4 ">
            <label className="block uppercase tracking-wide text-s font-bold">Content</label>
            <input className="w-full shadow-inner p-4 border-0" type="text" {...register('content', { required: true })} placeholder={articleInfo.content} />
          </div>
        </div>

        <input {...register('id', { required: true })} defaultValue={params.id} hidden readOnly />
      </div>

      <div className="flex w-full text-center">
        <div className="md:w-1/3"></div>
        <div>
          <button className="btn text-center overflow-hidden relative poinster bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full 
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
            onClick={() => router.back()} value="CANCEL" >CANCEL</button>
        </div>
        <div>
          <button className="btn text-center overflow-hidden relative poinster bg-blue-500 text-white p-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full 
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00">
            <input type="sumit" value="SUBMIT" className="text-center bg-blue-500 text-white" readOnly />
          </button>
        </div>
        <div>
          <button className="btn text-center overflow-hidden relative  bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full 
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-00"
            onClick={() => {
              alert("article을 삭제합니다.")
              dispatch(deleteArticleById(params.id))
              location.reload();
            }} value="DELETE" >DELETE</button>
        </div>
      </div>
    </form>


  )
}