'use client'
import { NextPage } from "next";
import { DataGrid } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { findModify, findUserById } from "@/app/components/user/service/user-service";
import { getUserById, jobHandler, passwordHandler, phoneHandler } from "@/app/components/user/service/user-slice";
import { IUsers } from "@/app/components/user/model/user";
import axios from "axios";
import AxiosConfig from "@/app/components/common/configs/axios-config";
import { useRouter } from "next/navigation";
import { PG } from "@/app/components/common/enums/PG";

export default function userDetailPage (props:any){

  const dispatch = useDispatch()
  const user:IUsers = useSelector(getUserById)
  const router = useRouter()
  
  const handleClickPw = (e:any) => dispatch(passwordHandler(e.target.value))
  const handleClickPh = (e:any) => dispatch(phoneHandler(e.target.value))
  const handleClickJob = (e:any) => dispatch(jobHandler(e.target.value))
  const handleModify = () => {
        dispatch(findModify(user))
        router.replace(`${PG.USER}/list`)
  }

  const handleDelete = () => {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/users/delete/${props.params.id}`
    const config = AxiosConfig()
    axios.delete(url, config).then(res => {alert(JSON.stringify(res.data))})
    router.replace(`${PG.USER}/list`)
  }

  useEffect(()=>{
        dispatch(findUserById(props.params.id))
  },[])

  return(<>
      <h3>게시판 상세</h3>
      <span>ID : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{props.params.id}</Typography>
      <span>아이디 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{user.username}</Typography>
      <span>비밀번호 : </span><input type="text" placeholder={user.password} name="password" onChange={handleClickPw} /><br /><br />
      <span>이름 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{user.name}</Typography>
      <span>전화번호 : </span><input type="text" placeholder={user.phone} name="phone" onChange={handleClickPh} /><br /><br />
      <span>직업 : </span> <input type="text" placeholder={user.job} name="job" onChange={handleClickJob} /><br /><br />
      <span>작성일자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{user.regDate}</Typography>
      <span>수정일자 : </span><Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{user.modDate}</Typography>
      <Button onClick={handleModify}>Update</Button>
      <Button onClick={handleDelete}>delete</Button>
      </>)
}

