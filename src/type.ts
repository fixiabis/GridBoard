/**
 * 類棋盤格
 * @typedef {object} GridLike
 * @template GridPiece 棋盤格上面的棋子類型
 * @template GridState 棋盤格自身的狀態類型
 * 
 * @property {GridPiece} piece 棋盤格上面的棋子
 * @property {GridPiece} state 棋盤格自身的狀態
 */
export interface GridLike<GridPiece, GridState> {
    /** 棋盤格上面的棋子 */
    piece: GridPiece | null;

    /** 棋盤格自身的狀態 */
    state: GridState;
}
