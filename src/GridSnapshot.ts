export interface GridBoardSnapshot<GridPiece, GridState = undefined> {
    width: number;
    height: number;
    grids: GridSnapshot<GridPiece, GridState>[];
}

interface GridSnapshotOnlyPiece<GridPiece> {
    piece: GridPiece | null;
}

export type GridSnapshot<GridPiece, GridState = undefined> = {
    piece: GridPiece | null;
    state: GridState;
} | GridSnapshotOnlyPiece<GridPiece>;
