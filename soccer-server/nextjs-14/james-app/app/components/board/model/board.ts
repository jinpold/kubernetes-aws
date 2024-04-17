export interface IBoards {
    id?: number;
    boardName?: string,
    boardType?: string,
    count?: number,
    regDate?: string;
    modDate?: string;
    array?: IBoards[],
    json?: {}
}