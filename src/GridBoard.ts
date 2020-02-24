import Grid from "./Grid";
import GridOrientation from "./GridOrientation";
import { GridBoardSnapshot } from "./type";
import { isObjectAndNotNull, isObjectAndHasKey } from "./utility";

/**
 * 棋盤
 * @template GridPiece 棋盤格上面的棋子類型
 * @template GridState 棋盤格自身的狀態類型，預設為 "never"
 */
class GridBoard<GridPiece, GridState = never> {
    /** @readonly 棋盤寬度 */
    public readonly width: number;

    /** @readonly 棋盤高度 */
    public readonly height: number;

    /** @readonly 棋盤格總數 */
    public readonly length: number;

    /** @readonly 所有棋盤格 */
    public readonly grids: Grid<GridPiece, GridState>[];

    /** 棋盤轉向
     * @see GridOrientation
     * 棋盤轉向
     */
    public orientation: number = GridOrientation.FBLR;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.length = width * height;
        this.grids = [];

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                let grid = new Grid<GridPiece, GridState>(x, y, this);
                this.grids[grid.i] = grid;
            }
        }
    }

    /**
     * 取得棋盤格藉由絕對座標
     * @param x X座標值
     * @param y Y座標值
     * @return {Grid<GridPiece, GridState> | null}
     */
    public getGridByAbsoluteCoordinate(x: number, y: number): Grid<GridPiece, GridState> | null {
        let isOverBoundary = (
            x < 0 ||
            x >= this.width ||
            y < 0 ||
            y >= this.height
        );

        if (isOverBoundary) {
            return null;
        }

        let i = x * this.height + y;

        return this.grids[i];
    }

    /**
     * 取得棋盤格藉由絕對座標來自轉向
     * @param x X座標值
     * @param y Y座標值
     * @see GridOrientation
     * @param {number} orientation 轉向，預設為棋盤轉向
     * @return {Grid<GridPiece, GridState> | null}
     */
    public getGridByAbsoluteCoordinateFromOrientation(x: number, y: number, orientation: GridOrientation = this.orientation): Grid<GridPiece, GridState> | null {
        let isAxisNeedSwap = (0b100 & orientation) >> 2;
        let isXAxisOrderByDescending = (0b010 & orientation) >> 1;
        let isYAxisOrderByDescending = (0b001 & orientation);

        if (isAxisNeedSwap) {
            [y, x] = [x, y];
        }

        if (isXAxisOrderByDescending) {
            x = this.width - 1 - x;
        }

        if (isYAxisOrderByDescending) {
            y = this.height - 1 - y;
        }

        return this.getGridByAbsoluteCoordinate(x, y);
    }

    /**
     * 取得多個棋盤格藉由絕對座標範圍
     * @param startX 起始X座標值
     * @param startY 起始Y座標值
     * @param endX 結束X座標值
     * @param endY 結束Y座標值
     * @return {(Grid<GridPiece, GridState> | null)[]}
     */
    public getGridsByRangeOfAbsoluteCoordinates(startX: number, startY: number, endX: number, endY: number): (Grid<GridPiece, GridState> | null)[] {
        let grids = [];

        let isXAxisOrderByDescending = startX > endX;
        let isYAxisOrderByDescending = startY > endY;

        if (isXAxisOrderByDescending) {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y >= endY; y--) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
            else {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y <= endY; y++) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
        }
        else {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y >= endY; y--) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
            else {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y <= endY; y++) {
                        grids.push(this.getGridByAbsoluteCoordinate(x, y));
                    }
                }
            }
        }

        return grids;
    }

    /**
     * 取得多個棋盤格藉由絕對座標範圍來自轉向
     * @param startX 起始X座標值
     * @param startY 起始Y座標值
     * @param endX 結束X座標值
     * @param endY 結束Y座標值
     * @see GridOrientation
     * @param {number} orientation 轉向，預設為棋盤轉向
     * @return {(Grid<GridPiece, GridState> | null)[]}
     */
    public getGridsByRangeOfAbsoluteCoordinatesFromOrientation(startX: number, startY: number, endX: number, endY: number, orientation: GridOrientation = this.orientation): (Grid<GridPiece, GridState> | null)[] {
        let grids = [];

        let isXAxisOrderByDescending = startX > endX;
        let isYAxisOrderByDescending = startY > endY;

        if (isXAxisOrderByDescending) {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y >= endY; y--) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
            else {
                for (let x = startX; x >= endX; x--) {
                    for (let y = startY; y <= endY; y++) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
        }
        else {
            if (isYAxisOrderByDescending) {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y >= endY; y--) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
            else {
                for (let x = startX; x <= endX; x++) {
                    for (let y = startY; y <= endY; y++) {
                        grids.push(this.getGridByAbsoluteCoordinateFromOrientation(x, y, orientation));
                    }
                }
            }
        }

        return grids;
    }

    /** 
     * 取得棋盤快照
     * @return {GridBoardSnapshot<GridPiece, GridState>}
     */
    public getSnapshot(): GridBoardSnapshot<GridPiece, GridState> {
        let { width, height, grids } = this;

        let gridSnapshots = grids.map(grid => {
            let { piece } = grid;

            if (isObjectAndNotNull(piece)) {
                piece = Object.create(piece);
            }

            if (isObjectAndHasKey(grid, "state")) {
                let { state } = grid;

                if (isObjectAndNotNull(state)) {
                    state = Object.create(state);
                }

                return { piece, state };
            }
            else {
                return { piece };
            }
        });

        return { width, height, grids: gridSnapshots };
    }

    /** 
     * 設置棋盤快照
     * @param {GridBoardSnapshot<GridPiece, GridState>} 棋盤快照
     * @return {boolean} 設置是否成功
     */
    public setSnapshot(snapshot: GridBoardSnapshot<GridPiece, GridState>): boolean {
        let isSizeNotMatch = (
            snapshot.width !== this.width ||
            snapshot.height !== this.height
        );

        if (isSizeNotMatch) {
            return false;
        }

        for (let i = 0; i < this.grids.length; i++) {
            let grid = this.grids[i];
            let gridSnapshot = snapshot.grids[i];

            if (isObjectAndNotNull(gridSnapshot.piece) && isObjectAndNotNull(grid.piece)) {
                if (gridSnapshot.piece instanceof Array && grid.piece instanceof Array) {
                    for (let i = 0; i < gridSnapshot.piece.length; i++) {
                        grid.piece[i] = gridSnapshot.piece[i];
                    }

                    for (let i = gridSnapshot.piece.length - 1; i < grid.piece.length; i++) {
                        delete grid.piece[i];
                    }
                }
                else {
                    for (let field in grid.piece) {
                        delete grid.piece[field];
                    }

                    for (let field in gridSnapshot.piece) {
                        grid.piece[field] = gridSnapshot.piece[field];
                    }
                }
            }
            else {
                grid.piece = gridSnapshot.piece;
            }

            if (isObjectAndHasKey(gridSnapshot, "state")) {
                if (isObjectAndNotNull(gridSnapshot.state) && isObjectAndNotNull(grid.state)) {
                    if (gridSnapshot.state instanceof Array && grid.state instanceof Array) {
                        for (let i = 0; i < gridSnapshot.state.length; i++) {
                            grid.state[i] = gridSnapshot.state[i];
                        }

                        for (let i = gridSnapshot.state.length - 1; i < grid.state.length; i++) {
                            delete grid.state[i];
                        }
                    }
                    else {
                        for (let field in grid.state) {
                            delete grid.state[field];
                        }

                        for (let field in gridSnapshot.state) {
                            grid.state[field] = gridSnapshot.state[field];
                        }
                    }
                }
                else {
                    grid.state = gridSnapshot.state as GridState;
                }
            }
            else {
                delete grid.state;
            }
        }

        return true;
    }
}

export default GridBoard;
