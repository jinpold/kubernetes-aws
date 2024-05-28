'use client'
import UserColumns from "@/app/components/user/module/user-column"
import { IUsers } from "@/app/components/user/model/user"
import { findAllUsers, findCount } from "@/app/components/user/service/user-service"
import { getAllUsers, getCount } from "@/app/components/user/service/user-slice"
import { DataGrid } from "@mui/x-data-grid"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { Typography } from "@mui/material"

const UsersPage: NextPage = () => {
    const [pageSize, setPageSize] = useState(5); 

    const dispatch = useDispatch()
    const allUsers: [] = useSelector(getAllUsers)
    const countUsers = useSelector(getCount)

    if(allUsers !== undefined){
        console.log('allUsers is not undefined')

        console.log('length is ' + allUsers.length)
        for(let i=0; i<allUsers.length; i++){
            console.log(JSON.stringify(allUsers[i]))
        }
    }else{
        console.log('allUsers is undefined')
    }

    useEffect(()=>{
        dispatch(findAllUsers(1))
        dispatch(findCount())
    },[])

    return(<>
    <h2> 사용자 수 :{countUsers} </h2>

    <div style={{ height: "100%", width: "100%" }}>
      {allUsers && <DataGrid //allUsers 유저스가 있으면 && 뒤의 이벤트를 작동해라
        rows={allUsers}
        columns={UserColumns()}
        pageSizeOptions={[5, 10, 20]} 
        checkboxSelection
      />}
    </div>
    </>)
}
export default UsersPage