export interface GridBoardSnapshot<GridPiece, GridState = undefined> {
    width: number;
    height: number;
    grids: GridSnapshot<GridPiece, GridState>[];
}

export type GridSnapshot<GridPiece, GridState = undefined> = {
    piece: GridPiece | null;
    state: GridState;
} | {
    piece: GridPiece | null;
}
