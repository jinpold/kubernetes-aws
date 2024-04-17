'use client'
import BoardColumns from "@/app/components/board/module/board-columns"
import { findAllBoards, findCount } from "@/app/components/board/service/board-service"
import { getAllBoards, getCount } from "@/app/components/board/service/board-slice"
import { StyledDataGrid } from "@/app/components/common/style/board"
import { DataGrid } from "@mui/x-data-grid"
import { NextPage } from "next"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
const cards = [
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/mountain-nightview.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/autumn.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/babypinetree.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/beach.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/purpleflowers.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/starrysky.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/lake.jpg",
];

export default function BoardsPage ({data}:any) {
    const [pageSize, setPageSize] = useState(5); 
    
    const dispatch = useDispatch()
    const allBoards: [] = useSelector(getAllBoards)
    const countBoards = useSelector(getCount)

    if(allBoards !== undefined){
        console.log('allboards is not undefined')

        console.log('length is ' + allBoards.length)
        for(let i=0; i<allBoards.length; i++){
            console.log(JSON.stringify(allBoards[i]))
        }
    }else{
        console.log('allBoards is undefined')
    }

    useEffect(()=>{
        dispatch(findAllBoards(1))
        dispatch(findCount())
    },[])

    return(<>
     <div className="flex flex-col  items-center justify-center w-full bg-white-300">
      <div className="flex overflow-x-scroll snap-x snap-mandatory max-w-6xl no-scrollbar">
        {cards.map((data, index) => {
          return (
            <section
              className="flex-shrink-0 w-full snap-center justify-center items-center"
              key={index}
            >
              <img
                src={data}
                alt="Images to scroll horizontal"
                className="w-full h-[500px]"
              />
              <tr>
          <td 
        align="center" className="w-full  bg-gray-400 border-black border-4 p-8 h-20 text-[20px]" 
        >
        <Link href='http://localhost:3000/pages/article/save'>게시판 글쓰기</Link>
        </td>
        </tr>
        </section>
          );
        })}
      </div>
    </div>
    <h2> 게시판 수 :{countBoards} </h2>
    <div style={{ height: "100%", width: "100%" }}>
      {allBoards && <DataGrid //DataGrid
        rows={allBoards}
        columns={BoardColumns()}
        initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
        pageSizeOptions={[5, 10, 20]} 
        checkboxSelection
      />}
    </div></>)
}
