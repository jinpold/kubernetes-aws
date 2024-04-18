export interface IArticle {
    id?: number,
    title?: string,
    content?: string,
    writerId?: number,
    boardId?: number,
    count?: number,
    message? : string,
    regDate?: string;
    modDate?: string;
}