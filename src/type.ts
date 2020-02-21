import Grid from "./Grid";

export interface GridLike<GridPiece = any, GridState = any> {
    piece: GridPiece | null;
    state: GridState;
}

export interface GridBoardSnapshot<GridPiece, GridState = never> {
    width: number;
    height: number;
    grids: GridSnapshotMaybeHasState<GridPiece, GridState>[];
}

export type GridSnapshot<GridPiece, GridState = never> = GridLike<GridPiece, GridState>;

export type GridLikeMaybeHasState<GridPiece, GridState = never> = (
    GridState[] extends never[]
    ? Omit<GridLike<GridPiece, GridState>, "state">
    : GridLike<GridPiece, GridState>
);

export type GridMaybeHasState<GridPiece, GridState = never> = (
    GridState[] extends never[]
    ? Omit<Grid<GridPiece, GridState>, "state">
    : Grid<GridPiece, GridState>
);

export type GridSnapshotMaybeHasState<GridPiece, GridState = never> = (
    GridState[] extends never[]
    ? Omit<GridSnapshot<GridPiece, GridState>, "state">
    : GridSnapshot<GridPiece, GridState>
);
