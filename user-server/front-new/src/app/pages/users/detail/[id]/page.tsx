'use client'

import { PG } from "@/app/component/common/enums/PG"
import { MyTypography } from "@/app/component/common/style/cell"
import { IUser } from "@/app/component/users/model/user.model";
import { deleteUserById, joinUser, modifyUserById } from "@/app/component/users/service/user.service"
import { getAllUsers } from "@/app/component/users/service/user.slice";
import { jwtDecode } from "jwt-decode";

import { useRouter } from 'next/navigation';
import { parseCookies } from "nookies"
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux"

export default function UserDetailPage({params}:any) {
  const dispatch = useDispatch()
  const router = useRouter();

  const user: IUser = useSelector(getAllUsers).find((user: IUser) => user.id === params.id);

  const { register, handleSubmit, formState: { errors }, } = useForm();
  const userInfo = jwtDecode<any>(parseCookies().accessToken);

  const onSubmit = (data: any) => {
    console.log(JSON.stringify(data));
    // userInfo에서 userId를 추출하여 data 객체에 추가
    data.id = userInfo.userId;
    dispatch(modifyUserById(data))
      .then((res:any)=>{
        alert('user information modify success.' + res.payload.id)
        location.reload();
        // router.push(`${PG.USER}/detail/${res.payload.id}`)
      })
      .catch((error:any)=>{
        alert('user information modify fail.')
      })
  }

  return (
    <form className="max-w-lg mx-auto my-8" onSubmit={handleSubmit(onSubmit)}>

      <div className="mb-6 text-center">
        {MyTypography(jwtDecode<any>(parseCookies().accessToken).username, "2.5rem")} My page
      </div>
      
      <fieldset className="mb-8">
        <legend className="block uppercase tracking-wide text-sm mb-4"> 회원정보 수정 / 탈퇴</legend>
        <div className="grid grid-cols-1 gap-6">
          <div>
          <input className="block mb-2 text-gray-900 dark:text-white" 
           type='hidden'value={jwtDecode<any>(parseCookies().accessToken).id} readOnly/>

          {/* <label className="block uppercase tracking-wide text-xs font-bold mb-2">username</label>
            <input className="w-full shadow-inner p-4 border border-gray-300" type="text" {...register('username', { required: true })} placeholder="ID" name="username"/>
          </div>
          <div> */}
            <label className="block uppercase tracking-wide text-xs font-bold mb-2">Name</label>
            <input className="w-full shadow-inner p-4 border border-gray-300" type="text" {...register('name', { required: true })} placeholder="Real Name" name="name"/>
          </div>
          <div>
            <label className="block uppercase tracking-wide text-xs font-bold mb-2">Password</label>
            <input className="w-full shadow-inner p-4 border border-gray-300" type="password" {...register('password', { required: true })} placeholder="Password" name="password"/>
          </div>
          <div>
            <label className="block uppercase tracking-wide text-xs font-bold mb-2">Re Password</label>
            <input className="w-full shadow-inner p-4 border border-gray-300" type="password" placeholder="Re Password" />
          </div>
          <div>
            <label className="block uppercase tracking-wide text-xs font-bold mb-2">Street Address</label>
            <input className="w-full shadow-inner p-4 border border-gray-300" type="text" {...register('address', { required: true })} placeholder="555 Roadrunner Lane"name="address" />
          </div>
          <div>
            <label className="block uppercase tracking-wide text-xs font-bold mb-2">Phone</label>
            <input className="w-full shadow-inner p-4 border border-gray-300" type="text"  {...register('phone', { required: true })} placeholder="(555) 555-5555" name="phone" />
          </div>
        </div>
      </fieldset>

      <div className="flex justify-between">
        <button className="btn bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-xl font-bold uppercase" onClick={() => router.back()} type="button">CANCEL</button>

        <button className="btn bg-blue-500 text-white py-2 px-4 rounded-xl font-bold uppercase hover:bg-blue-600 transition-colors duration-300" type="submit">SUBMIT</button>

        <button className="btn bg-white text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300 py-2 px-4 rounded-xl font-bold uppercase" onClick={() => {
          alert("user를 삭제합니다.")
          console.log("delete user id & username : {}, {}", userInfo.userId, userInfo.username)
          dispatch(deleteUserById(userInfo.userId))
          location.reload();
        }} type="button">DELETE</button>
      </div>


    </form>
  )
}


      {/* <input type="text" {...register('id', { required: true })} value={userInfo.id} hidden readOnly/>
      <input type="text" {...register('username', { required: true })} value={userInfo.username} hidden readOnly/> */}