import Grid from "./Grid";
import GridOrientation from "./GridOrientation";
import { SpliceBoundaryDefinition } from "./type";

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

    public spliceBoundaryDefinitions: SpliceBoundaryDefinition<GridPiece, GridState>[] = [];

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
     * 取得棋盤格由絕對座標
     * @param {number} x X座標值
     * @param {number} y Y座標值
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
            return this.getGridByAbsoluteCoordinateFromSplicedBoundary(x, y);
        }

        let i = y * this.width + x;

        return this.grids[i];
    }

    /**
     * 取得棋盤格由絕對座標來自轉向
     * @param {number} x X座標值
     * @param {number} y Y座標值
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
     * @param {number} startX 起始X座標值
     * @param {number} startY 起始Y座標值
     * @param {number} endX 結束X座標值
     * @param {number} endY 結束Y座標值
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
     * @param {number} startX 起始X座標值
     * @param {number} startY 起始Y座標值
     * @param {number} endX 結束X座標值
     * @param {number} endY 結束Y座標值
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
     * 取得棋盤格由絕對座標從已拼接的邊界
     * @param {number} x X座標值
     * @param {number} y Y座標值
     * @return {Grid<GridPiece, GridState> | null}
     */
    public getGridByAbsoluteCoordinateFromSplicedBoundary(x: number, y: number): Grid<GridPiece, GridState> | null {
        for (let getGridByAbsoluteCoordinateAndBoard of this.spliceBoundaryDefinitions) {
            let grid = getGridByAbsoluteCoordinateAndBoard(x, y, this);

            if (grid) {
                return grid;
            }
        }

        return null;
    }

    /**
     * 拼接邊界由定義
     * @param {SpliceBoundaryDefinition<GridPiece, GridState>} definition 定義
     */
    public spliceBoundaryByDefinition(definition: SpliceBoundaryDefinition<GridPiece, GridState>): void {
        this.spliceBoundaryDefinitions.push(definition);
    }
}

export default GridBoard;
