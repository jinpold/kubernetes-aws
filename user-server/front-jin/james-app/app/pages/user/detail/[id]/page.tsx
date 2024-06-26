'use client'
import axios from "axios";
import { NextPage } from "next";
import { DataGrid } from "@mui/x-data-grid"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react";
import { Button, Typography } from "@mui/material";
import { findDeleteById, findLogout, findModify, findUserById } from "@/app/components/user/service/user-service";
import { getUserById} from "@/app/components/user/service/user-slice";
import { IUsers } from "@/app/components/user/model/user";
import { useRouter } from "next/navigation";
import { PG } from "@/app/components/common/enums/PG";
import { useForm } from "react-hook-form";
import { MyTypography } from "@/app/components/common/style/cell";
import { destroyCookie } from "nookies";

export default function userDetailPage(props: any) {
      const dispatch = useDispatch()
      const router = useRouter()
      const user : IUsers = useSelector(getUserById);

      const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
        id : props.params.id,
        username : user.username,
        password : user.password,
        name : user.name,
        phone : user.phone,
        job : user.job
      },
    })

      

      useEffect(() => {
            (findUserById(props.params.id))
      }, [])

      // const handleClickPw = (e: any) => dispatch(passwordHandler(e.target.value))
      // const handleClickPh = (e: any) => dispatch(phoneHandler(e.target.value))
      // const handleClickJob = (e: any) => dispatch(jobHandler(e.target.value))

      // const handleModify = () => {
      //       dispatch(findModify(user))
      //       router.replace(`${PG.USER}/list`)
      // }

      const onSubmit = (user: IUsers) => {
            dispatch(findModify(user))
              .then((res: any) => {
                router.push(`${PG.USER}/list`)
              })
              .catch((error: any) => {
                alert("회원 정보 수정 실패");
              })
          }

      // const handleDelete = () => {
      //       dispatch(findDeleteById(props.params.id))
      //       router.replace(`${PG.USER}/detail/${1}`)
      // }

      const handleSecession = () => {
            dispatch(findDeleteById(props.params.id)).
              then((res: any) => {
                console.log(res.payload)
                if (res.payload === 'SUCCESS') {
                  alert('회원 탈퇴 완료');
                  dispatch(findLogout())
                    .then((res: any) => {
                      destroyCookie(null, 'accessToken')
                      console.log('destroy 쿠기 후: showProfile:false');
                      router.push('/');
                    })
                } else {
                  alert('회원 탈퇴 실패');
                }
              })
          }

      const handleCancel = () => {
            alert("회원 정보 수정을 취소합니다.")
            router.back();
      }

      return (
      <>
      <form onSubmit={handleSubmit(onSubmit)} className=" max-w-md mx-auto mb-10 mt-10">
        <label htmlFor="large" className="block mb-2 text-base font-medium text-gray-900 dark:text-white">MY Page</label>
        <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
          {MyTypography('회원 정보 수정', "1.5rem")}
          <input
            {...register('id', { required: true })}
            type="hidden" value={props.params.id} />
          <div className="username-wrapper">
            <input
              {...register('username', { required: true })}
              className="username mt-2 bg-gray-100 border border-gray-300 p-2 mb-4 outline-none" type="text" value={user.username} readOnly
            /><br></br>
            <span className="hover-message">Please enter your correction</span>
          </div>
          <input
            {...register('password', { required: true, maxLength: 20 })}
            className="password bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            placeholder="Password"
            type="text"
            name="password"
            defaultValue={user.password} />
          <input
            {...register('name', { required: true, maxLength: 20 })}
            className="name bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            placeholder="Name"
            type="text"
            name="name"
            defaultValue={user.name} />
          <input
            {...register('phone', { required: true, maxLength: 20 })}
            className="phone bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            placeholder="Phone"
            type="text"
            name="phone"
            defaultValue={user.phone} />
          <input
            {...register('job', { required: true, maxLength: 20 })}
            className="job bg-gray-100 border border-gray-300 p-2 mb-4 outline-none"
            placeholder="Job"
            type="text"
            name="job"
            defaultValue={user.job} />

          {/* <!-- buttons --> */}
          <div className="buttons flex justify-center gap-5">
            <div className="btn justify-items-center overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- behtmlFore:block behtmlFore:absolute behtmlFore:h-full behtmlFore:w-1/2 behtmlFore:rounded-full
          behtmlFore:bg-pink-400 behtmlFore:top-0 behtmlFore:left-1/4 behtmlFore:transition-transhtmlForm behtmlFore:opacity-0 behtmlFore:hover:opacity-100 hover:text-200 hover:behtmlFore:animate-ping transition-all duration-00
          border border-gray-300 shadow-lg text-lg
          hover:bg-blue-100 focus:shadow-outline focus:outline-none
          "
              onClick={handleCancel}>취소</div>
            <input
              type="submit" value="수정"
              className="btn  overflow-hidden relative w-30 bg-white text-blue-500 p-3 px-4 rounded-xl font-bold uppercase -- behtmlFore:block behtmlFore:absolute behtmlFore:h-full behtmlFore:w-1/2 behtmlFore:rounded-full
          behtmlFore:bg-pink-400 behtmlFore:top-0 behtmlFore:left-1/4 behtmlFore:transition-transhtmlForm behtmlFore:opacity-0 behtmlFore:hover:opacity-100 hover:text-200 hover:behtmlFore:animate-ping transition-all duration-00
          border border-gray-300 shadow-lg text-lg
          hover:bg-blue-100 focus:shadow-outline focus:outline-none"
            />
          </div>
        </div>
        <div className="btn justify-items-center overflow-hidden relative ml-24 max-w-60 my-10 bg-blue-500 text-white text-center p-3 mx-16 rounded-xl text-xl font-bold uppercase -- behtmlFore:block behtmlFore:absolute behtmlFore:h-full behtmlFore:w-1/2 behtmlFore:rounded-full
          behtmlFore:bg-pink-400 behtmlFore:top-0 behtmlFore:left-1/4 behtmlFore:transition-transhtmlForm behtmlFore:opacity-0 behtmlFore:hover:opacity-100 hover:text-200 hover:behtmlFore:animate-ping transition-all duration-00
          border border-gray-300 shadow-lg hover:bg-blue-400 focus:shadow-outline focus:outline-none"
          onClick={handleSecession}>회원 탈퇴</div>
      </form>

      </>);
}

