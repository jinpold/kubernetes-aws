'use client'


import MoveBotton from "@/app/atoms/button/MoveButton";
import articleColumns from "@/app/component/articles/modul/columns";
import { findByBoard, fetchAllArticles, findCountArticle } from "@/app/component/articles/service/article.service";
import { getAllArticles, getCountArticle } from "@/app/component/articles/service/article.slice";
import { findBoardById } from "@/app/component/boards/service/board.service";
import { getSingleBoard } from "@/app/component/boards/service/board.slice";
import { PG } from "@/app/component/common/enums/PG";
import { MyTypography } from "@/app/component/common/style/cell";
import { DataGrid } from "@mui/x-data-grid";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";



const cards = [
    "https://www.tailwindtap.com/assets/components/horizontal-carousel/mountain-nightview.jpg",
    "https://www.tailwindtap.com/assets/components/horizontal-carousel/autumn.jpg",
    "https://www.tailwindtap.com/assets/components/horizontal-carousel/babypinetree.jpg",
    "https://www.tailwindtap.com/assets/components/horizontal-carousel/beach.jpg",
    "https://www.tailwindtap.com/assets/components/horizontal-carousel/purpleflowers.jpg",
    "https://www.tailwindtap.com/assets/components/horizontal-carousel/starrysky.jpg",
    "https://www.tailwindtap.com/assets/components/horizontal-carousel/lake.jpg",
];


const AllarticlesPage: NextPage = ({ params }: any) => {
    const dispatch = useDispatch()
    const allArticles: [] = useSelector(getAllArticles)
    const board: IBoard = useSelector(getSingleBoard)

    // if (allArticles !== undefined) {
    //     console.log('length is ' + allArticles.length)
    //     for (let i = 0; i < allArticles.length; i++) {
    //         console.log(JSON.stringify(allArticles[i]))
    //     }
    // } else {
    //     console.log('allArticles is undefined')
    // }


    useEffect(() => {
        dispatch(findBoardById(params.id))
    }, [])

    const router = useRouter();

    return (<>

        <div className="flex flex-col items-center justify-center w-full bg-300">
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
                        </section>
                    );
                })}
            </div>
        </div>


        {MyTypography(board.title + ' length is ' + allArticles.length, "1.5rem")}

        <div className='text-center'>
            <br />
            {/* <MoveBotton text={"CALCEL"} path={`${PG.ARTICLE}/save`}/>    */}
        </div>
        <br />

        <button className="btn overflow-hidden relative w-64 bg-blue-500 text-white py-4 px-4 rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full 
        before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-300"
                onClick={() => router.push(`${PG.ARTICLE}/save/${params.id}`)}>

                <span className="relative">글쓰러가기</span>
            </button>

        <div style={{ height: "100%", width: "100%", fontSize: 50 }}>
            {allArticles && <DataGrid 
                rows={allArticles}
                columns={articleColumns()}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10, 20, 50]} 
                checkboxSelection
            />}
            </div>
    </>)
}

export default AllarticlesPage