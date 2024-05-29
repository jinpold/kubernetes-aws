'use client'
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux';
import { NextPage } from "next";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import React from "react";
import MoveButton from "@/app/atoms/button/MoveButton";
import { getAllArticles, getCount } from "@/app/component/articles/service/article.slice";
import { findAllArticles, findCount } from "@/app/component/articles/service/article.service";
import { PG } from "@/app/component/common/enums/PG";
import ArticleColumns from "@/app/component/articles/modul/columns";

const cards = [
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/mountain-nightview.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/autumn.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/babypinetree.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/beach.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/purpleflowers.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/starrysky.jpg",
  "https://www.tailwindtap.com/assets/components/horizontal-carousel/lake.jpg",
];


// 리액트 - 리덕스는 실행순서가 하향식이 아니다. -> 즉시실행함수부터 먼저 실행됨.
// 하기 page는 .tsx이다. return은 jsx로 와야한다.
export default function ArticlesPage ({data}:any) {
    const dispatch = useDispatch()
    // const [articles, setArticles] = useState([])
    const allArticles: [] = useSelector(getAllArticles) // 4번 실행 (리덕스 통해서 실행가능)
    const countArticles = useSelector(getCount)

    if(allArticles !== undefined){ // 슬라이스 fulfilled의 전후를 확인하는 로직  (생략가능)
        console.log('allArticles is not undefined')

        console.log('length is '+ allArticles.length)
        for(let i=0; i< allArticles.length; i++){
            console.log(JSON.stringify(allArticles[i]))
        }
    }else{
        console.log('allArticles is undefined')
    }
 
    useEffect(() => { // 1번실행  -> 즉시실행 함수 
        dispatch(findAllArticles(1))  // dispatch 2번실행 // (fetchAllArticles) = thunk 3번실행 (리덕스에 실행)
        dispatch(findCount())
    }, [dispatch]) // <- [] 안에 dispatch를 넣었다고 가정하고 dispatch(상태)가 바뀌면 useEffect 다시 실행한다.
    
  
    // 하기 리턴은 jsx로 작성해야함.
    return (<>
    <div className="flex flex-col  items-center justify-center w-full bg-white-300">
       
      <div className="flex overflow-x-scroll snap-x snap-mandatory max-w-6xl no-scrollbar">
        {cards.map((data, index) => {
          return (

            <section
              className="flex-shrink-0 w-full snap-center justify-center items-center"
              key={index}
            >
              {/* <img
                src={data}
                alt="Images to scroll horizontal"
                className="w-full h-[500px]"
              /> */}
            </section>
            
          );
        })}
      </div>
      <td>
        <MoveButton text={"게시글 쓰기"} path={`${PG.ARTICLE}/save`}/>
        </td>
    </div>
        <h2> 게시글 수 :{countArticles} </h2> 
        <Box sx={{ height: "100%", width: '100%' }}>
      {allArticles && <DataGrid
        rows={allArticles}
        columns={ArticleColumns()}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20]} 
        checkboxSelection
        disableRowSelectionOnClick
      />}
    </Box>
    </>)
}