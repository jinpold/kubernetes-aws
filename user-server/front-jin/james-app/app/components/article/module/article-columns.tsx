import { GridColDef } from "@mui/x-data-grid";
import { ArticleColumn } from "../model/article-column";
import { Typography, getFormControlLabelUtilityClasses } from "@mui/material";
import Link from "next/link";
import { PG } from "../../common/enums/PG";
import { useDispatch } from "react-redux";
import { findDeleteById } from "../service/article-service";

interface CellType{
    row : ArticleColumn
}

export default function ArticleColumns(): GridColDef[] {

    
    const dispatch = useDispatch();

    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id', // 스프링 필드 이름과 같게
            headerName: 'No.',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.id}</Typography>
            }
        ,
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'title',
            headerName: '제목',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>
            <Link href={`${PG.ARTICLE}/detail/${row.id}`} className="underline" >{row.title}</Link>
            </Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'content',
            headerName: '내용',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.content}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'registerDate',
            headerName: '작성일자',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.2rem"}}>{row.regDate}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'modifyDate',
            headerName: '수정일자',
            renderCell: ({row}:CellType) => <Typography textAlign="center" sx={{fontSize:"1.5rem"}}>{row.modDate}</Typography>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'modify',
            headerName: '수정',
            renderCell: ({row}:CellType) => <Link href={""}> <Typography textAlign="center" sx={{fontSize:"1.5rem"}}>수정</Typography></Link>
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'delete',
            headerName: 'DELETE',
            renderCell: ({ row }: CellType) =>
                <button className="btn overflow-hidden relative w-full h-full bg-blue-500 text-white rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full
            before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-300"
                    onClick={() => {
                        alert("article을 삭제합니다.")
                        console.log("delete article id : {}", row.id)
                        dispatch(findDeleteById(row.id))
                        location.reload();
                    }
                    }> DELETE</button>
        }
    ]
}