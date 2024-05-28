
import { Link } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import { MyTypography } from '../../common/style/cell';
import { PG } from '../../common/enums/PG';
import { deleteArticleById } from '../service/article.service';
import { useDispatch } from 'react-redux';



export default function ArticleColumns(): GridColDef[] {

    
    const dispatch = useDispatch()

    interface CellType {
        row: IArticle;
    }


    return [
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'id',
            headerName: 'No.',
            renderCell: ({ row }: CellType) => MyTypography(row.id, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'title',
            headerName: 'TITLE',
            renderCell: ({ row }: CellType) =>
                MyTypography(<Link href={`${PG.ARTICLE}/detail/${row.id}`}> {row.title} </Link> , "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'content',
            headerName: 'CONTENT',
            renderCell: ({ row }: CellType) => MyTypography(row.content, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'writer',
            headerName: 'WRITER',
            renderCell: ({ row }: CellType) => MyTypography(row.writer, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'modDate',
            headerName: 'mod date',
            renderCell: ({ row }: CellType) => MyTypography(row.modDate, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'regDate',
            headerName: 'reg date',
            renderCell: ({ row }: CellType) => MyTypography(row.regDate, "1.5rem")
        },
        {
            flex: 0.04,
            minWidth: 30,
            sortable: false,
            field: 'delete',
            headerName: 'DELETE',
            renderCell: ({ row }: CellType) =>
                <button className="btn focus overflow-hidden relative w-full h-full bg-blue-500 text-white rounded-xl font-bold uppercase -- before:block before:absolute before:h-full before:w-1/2 before:rounded-full 
            before:bg-pink-400 before:top-0 before:left-1/4 before:transition-transform before:opacity-0 before:hover:opacity-100 hover:text-200 hover:before:animate-ping transition-all duration-300"
                    onClick={() => {
                        let flag = confirm("article을 삭제하시겠습니까?")
                        if(flag){
                            console.log("delete article id : {}", row.id)
                            dispatch(deleteArticleById(row.id))
                            location.reload();
                        }else{  
                            alert("article 삭제가 취소되었습니다.")
                        }
                    }
                    }> DELETE</button>
        }

    ]
}