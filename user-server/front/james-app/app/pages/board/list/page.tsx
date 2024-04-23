'use client';
import CardButton from "@/app/atoms/button/CardButton";
import { IBoards } from "@/app/components/board/model/board";
import { findAllBoards } from "@/app/components/board/service/board-service"
import { getAllBoards } from "@/app/components/board/service/board-slice"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function BoardCards() {

 const router = useRouter();
 const dispatch = useDispatch()
 const boards: IBoards[] = useSelector(getAllBoards)


 
 useEffect(()=>{
        dispatch(findAllBoards(1)) //숫자 1 <- 1페이지를 의미
       },[dispatch])

       return (<>
       <h1> 게시판 목록 들어옴</h1>
         {/* {boards.map((board) => (
             <CardButton key={board.id} id={board.id||0} title={board.title||""} description={board.description||""}/>
         ))} */}
 
     </>);
}