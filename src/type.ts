import Grid from "./Grid";

/**
 * 也許有特定欄位的介面，若欄位值為 "never" 則該介面無此欄位
 * @typedef InterfaceMaybeHasKey
 * @template Interface 介面
 * @template Key 欄位
 * @template Value 欄位值，預設為 "never"
 */
export type MaybeHasKey<Interface, Key extends string, Value = never> = (
    Value[] extends never[]
    ? Omit<Interface, Key>
    : Interface
);

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
    grids: GridSnapshotMaybeHasState<GridPiece, GridState>[];
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
    state: GridState;
}

/**
 * 也許有狀態的棋盤格
 * @typedef {object} GridMaybeHasState
 * @template GridPiece 棋盤格上面的棋子類型
 * @template GridState 棋盤格自身的狀態類型，預設為 "never"，若使用預設則 "state" 屬性不存在
 * @property {GridPiece | null} piece 棋盤格上面的棋子
 * @property {GridState} state 棋盤格自身的狀態，若 "GridState" 類型為 "never"，則該屬性不存在
 */
export type GridMaybeHasState<GridPiece, GridState = never> = (
    MaybeHasKey<Grid<GridPiece, GridState>, "state", GridState>
);

/**
 * 也許有狀態的棋盤格快照
 * @typedef {object} GridSnapshotMaybeHasState
 * @template GridPiece 棋盤格快照上面的棋子類型
 * @template GridState 棋盤格快照自身的狀態類型，預設為 "never"，若使用預設則 "state" 屬性不存在
 * @property {GridPiece | null} piece 棋盤格快照上面的棋子
 * @property {GridState} state 棋盤格快照自身的狀態，若 "GridState" 類型為 "never"，則該屬性不存在
 */
export type GridSnapshotMaybeHasState<GridPiece, GridState = never> = (
    MaybeHasKey<GridSnapshot<GridPiece, GridState>, "state", GridState>
);
