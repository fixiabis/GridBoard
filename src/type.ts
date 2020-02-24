import Grid from "./Grid";

/**
 * 棋盤快照
 * @typedef {object} GridBoardSnapshot
 * @template GridPiece 棋盤格快照上面的棋子類型
 * @template GridState 棋盤格快照自身的狀態類型，預設為 "never"
 * @property {number} width 棋盤寬度
 * @property {number} height 棋盤高度
 * @property {GridSnapshot<GridPiece, GridState>[]} grids 棋盤格快照
 * @see GridSnapshot
 */
export interface GridBoardSnapshot<GridPiece, GridState = never> {
    /** 棋盤寬度 */
    width: number;

    /** 棋盤高度 */
    height: number;

    /** 棋盤格快照 */
    grids: GridSnapshot<GridPiece, GridState>[];
}

/**
 * 棋盤格快照
 * @typedef {object} GridSnapshot
 * @template GridPiece 棋盤格快照上面的棋子類型
 * @template GridState 棋盤格快照自身的狀態類型，預設為 "never"
 * @property {GridPiece | null} piece 棋盤格快照上面的棋子
 * @property {GridState} state 棋盤格快照自身的狀態
 */
export interface GridSnapshot<GridPiece, GridState = never> {
    /** 棋盤格上面的棋子 */
    piece: GridPiece | null;

    /** 棋盤格自身的狀態 */
    state?: GridState;
}
