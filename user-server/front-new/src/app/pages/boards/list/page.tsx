'use client'

import CardButton from "@/app/atoms/button/CardButton"
import { fetchAllBoards } from "@/app/component/boards/service/board.service";
import { getAllBoards } from "@/app/component/boards/service/board.slice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


export default function Boardcards() {

    const dispatch = useDispatch();
    const allBoards: [] = useSelector(getAllBoards);

    useEffect(() => {
        dispatch(fetchAllBoards())
    }, [dispatch])


    return (<>
    <h6>News</h6>
<div className="flex flex-row">
        {allBoards&&allBoards.map((elem: IBoard) =>(
            <CardButton key={elem.id} id={elem.id} title={elem.title} 
            description={elem.description}/>
        ))}
        
</div>

    </>)
}