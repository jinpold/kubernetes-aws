'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/component/users/model/user.model";
import { useDispatch } from "react-redux";
import { joinUser } from "@/app/component/users/service/user.service";
import { useSelector } from "react-redux";
import { getSingleUser } from "@/app/component/users/service/user.slice";

export default function Join2() {


  const router = useRouter();

  const dispatch = useDispatch();
  const join = useSelector(getSingleUser);
  const [user, setUser] = useState({} as IUser)


  const handleUsername = (e: any) => {
    const {
      target: { value, name }
    } = e;
    setUser(dto => ({ ...dto, [name]: value }));
  }

  const handleSubmit = () => {
    console.log(user)
    dispatch(joinUser(user))
  }

  useEffect(() => {
    if (join === 'SUCCESS') {
      router.push(`/`)
    }
  }, [join, router])



  return (
    <div className="h-screen items-center flex justify-center px-5 lg:px-0 ">
      <div className="max-w-screen-xl bg-white border shadow sm:rounded-lg flex justify-center flex-1">
        <div className="flex-1 bg-indigo-950 text-center hidden md:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(https://www.tailwindtap.com/assets/common/marketing.svg)`,
            }}
          ></div>
        </div>
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className=" flex flex-col items-center">
            <div className="text-center">
              <h1 className="text-2xl xl:text-4xl font-extrabold text-indigo-950">
                Student Sign up
              </h1>
              <p className="text-[12px] text-gray-500">
                Hey enter your details to create your account
              </p>
            </div>
            <div className="w-full flex-1 mt-8">
              <div className="mx-auto max-w-xs flex flex-col gap-4">
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your ID" name="username" onChange={handleUsername}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="Password"
                  placeholder="Enter your password" name="password" onChange={handleUsername}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  placeholder="Enter your name" name="name" onChange={handleUsername}
                />
                <input
                  className="w-full px-5 py-3 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="tel"
                  placeholder="Enter your phone" name="phone" onChange={handleUsername}
                />
                <button className="mt-5 tracking-wide font-semibold bg-indigo-950 text-gray-100 w-full py-4 rounded-lg hover:bg-pink-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                onClick={handleSubmit}>
                  <span className="ml-3">Sign Up</span>
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Already have an account?{" "}
                  <Link href={`/`}>
                    <span className="text-blue-900 font-semibold">Sign in</span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}