'use client'
import { NextPage } from "next";
import { useEffect } from "react";
import UserColumns from "@/app/components/user/module/user-column"
import { IUsers } from "@/app/components/user/model/user"
import { findAllUsers } from "@/app/components/user/service/user-service"
import { getAllUsers } from "@/app/components/user/service/user-slice"
import { DataGrid } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Button, Typography } from "@mui/material";
import { createAsyncThunk } from "@reduxjs/toolkit/react";
import { BoardNameHandler, BoardTypeHandler, getSingleBoard } from "@/app/components/board/service/board-slice";
import { findBoardById, findModify } from "@/app/components/board/service/board-service";
import { IBoards } from "@/app/components/board/model/board";
import { PG } from "@/app/components/common/enums/PG";
import AxiosConfig from "@/app/components/common/configs/axios-config";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function BoardDetailPage (props:any){


    const dispatch = useDispatch()
    const board:IBoards = useSelector(getSingleBoard)
    const router = useRouter()

    // const handleDelete = () => {
    //     const url = `${process.env.NEXT_PUBLIC_API_URL}/boards/delete/${props.params.id}`
    //     const config = AxiosConfig()
    //     axios.delete(url, config).then(res => {alert(JSON.stringify(res.data))})
    //     router.replace(`${PG.BOARD}/list`)
    //   }

    const handleClickBN  = (e:any) => dispatch(BoardNameHandler(e.target.value))
    const handleClickBT = (e:any) => dispatch(BoardTypeHandler(e.target.value))
    const handleModify = () => {
        dispatch(findModify(board))
        router.replace(`${PG.BOARD}/list`)
    }
    
    useEffect(()=>{
        dispatch(findBoardById(props.params.id))
    },[])

    
    return(<>
    
    <h3>게시판 상세</h3>
    <span>ID : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{props.params.id}</Typography>
    <span>게시판이름 : </span><input type="text" placeholder={board.title} name="BoardName" onChange={handleClickBN} /><br /><br />
    <span>게시판타입 : </span><input type="text" placeholder={board.description} name="BoardType" onChange={handleClickBT} /><br /><br />
    <span>동록일 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{board.regDate}</Typography>
    <span>수정일 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{board.modDate}</Typography>
    <Button onClick={handleModify}>Update</Button>
    {/* <Button onClick={handleDelete}>delete</Button> */}
    </>)
}
