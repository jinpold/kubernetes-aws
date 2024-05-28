'use client'

import { deleteBoardById, findBoardById, modifyBoardById } from "@/app/component/boards/service/board.service";
import { getSingleBoard } from "@/app/component/boards/service/board.slice";
import { MyTypography } from "@/app/component/common/style/cell";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function BoardDetailPage({ params }: any) {
  const dispatch = useDispatch()
  const findBoard = useSelector(getSingleBoard)

  const [inputValue, setInputValue] = useState({ id: params.id, title: '', description: '' });


  const handleInput = (e: any) => {
    const {
      target: { value, name }
    } = e;
    setInputValue(dto => ({ ...dto, [name]: value }));
  };


  const handleModify = () => {
    dispatch(modifyBoardById(inputValue))
    console.log("handleModify " + inputValue)
  }

  const handleDelete = () => {
    dispatch(deleteBoardById(params.id))
  }


  useEffect(() => {
    dispatch(findBoardById(params.id))
  }, [dispatch])

  return (<>

    {MyTypography('board detail ', "1.5rem")}
    {MyTypography('ID : ' + params.id, "1.5rem")}

    {MyTypography(<input type="text" name="title" defaultValue={findBoard.title} onChange={handleInput} />, "1.5rem")}
    {MyTypography(<input type="text" name="description" defaultValue={findBoard.description} onChange={handleInput} />, "1.5rem")}
    {MyTypography('등록일 : ' + findBoard.regDate, "1.5rem")}
    {MyTypography('수정일 : ' + findBoard.modDate, "1.5rem")}

    <br />
    {MyTypography(<button type="button" onClick={handleModify} > 수정</button>, "1.5rem")}
    {MyTypography(<button type="button" onClick={handleDelete} > 삭제</button>, "1.5rem")}

  </>)
}