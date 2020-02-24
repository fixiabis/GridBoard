import GridBoard from "./GridBoard";
import { isObjectAndHasKey } from "./utility";

/**
 * 棋盤格
 * @template GridPiece 棋盤格上面的棋子類型
 * @template GridState 棋盤格自身的狀態類型，預設為 "never"
 */
class Grid<GridPiece, GridState = never> {
    /** @readonly X座標軸值 */
    public readonly x: number;

    /** @readonly Y座標軸值 */
    public readonly y: number;

    /** @readonly 在棋盤中的索引值 */
    public readonly i: number;

    /** 棋盤格上面的棋子 */
    public piece: GridPiece | null;

    /** 棋盤格自身的狀態 */
    public state!: GridState;

    /** @readonly 所在的棋盤 */
    public readonly board: GridBoard<GridPiece, GridState>;

    constructor(x: number, y: number, board: GridBoard<GridPiece, GridState>) {
        this.x = x;
        this.y = y;
        this.i = x * board.height + y;
        this.piece = null;
        this.board = board;
    }

    /**
     * 取得棋盤格藉由方向
     * @see GridDirection
     * @param {number} direction 方向
     * @return {Grid<GridPiece, GridState> | null}
     */
    public getGridByDirection(direction: number): Grid<GridPiece, GridState> | null {
        let f = (0xF000 & direction) >> 12;
        let b = (0x0F00 & direction) >> 8;
        let l = (0x00F0 & direction) >> 4;
        let r = (0x000F & direction);

        return this.getGridByRelativeCoordinate(r - l, b - f);
    }

    /**
     * 棋盤棋盤格藉由方向來自轉向
     * @see GridDirection
     * @param {number} direction 方向
     * @see GridOrientation
     * @param {number} orientation 轉向，預設為棋盤轉向
     * @return {Grid<GridPiece, GridState> | null}
     */
    public getGridByDirectionFromOrientation(direction: number, orientation: number = this.board.orientation): Grid<GridPiece, GridState> | null {
        let isAxisNeedSwap = (0b100 & orientation) >> 2;
        let isXAxisOrderByDescending = (0b010 & orientation) >> 1;
        let isYAxisOrderByDescending = (0b001 & orientation);

        let f = (0xF000 & direction) >> 12;
        let b = (0x0F00 & direction) >> 8;
        let l = (0x00F0 & direction) >> 4;
        let r = (0x000F & direction);

        if (isAxisNeedSwap) {
            [f, b, l, r] = [l, r, f, b];
        }

        if (isXAxisOrderByDescending) {
            [r, l] = [l, r];
        }

        if (isYAxisOrderByDescending) {
            [b, f] = [f, b];
        }

        return this.getGridByRelativeCoordinate(r - l, b - f);
    }

    /**
     * 取得棋盤格藉由相對座標
     * @param {number} dx 相對X座標軸值
     * @param {number} dy 相對Y座標軸值
     * @return {Grid<GridPiece, GridState> | null}
     */
    public getGridByRelativeCoordinate(dx: number, dy: number): Grid<GridPiece, GridState> | null {
        let x = this.x + dx;
        let y = this.y + dy;

        return this.board.getGridByAbsoluteCoordinate(x, y);
    }

    /**
     * 取得棋盤格藉由相對座標來自轉向
     * @param {number} dx 相對X座標軸值
     * @param {number} dy 相對Y座標軸值
     * @see GridOrientation
     * @param {number} orientation 轉向，預設為棋盤轉向
     * @return {Grid<GridPiece, GridState> | null}
     */
    public getGridByRelativeCoordinateFromOrientation(dx: number, dy: number, orientation: number = this.board.orientation): Grid<GridPiece, GridState> | null {
        let isAxisNeedSwap = (0b100 & orientation) >> 2;
        let isXAxisOrderByDescending = (0b010 & orientation) >> 1;
        let isYAxisOrderByDescending = (0b001 & orientation);

        if (isAxisNeedSwap) {
            [dy, dx] = [dx, dy];
        }

        if (isXAxisOrderByDescending) {
            dx = -dx;
        }

        if (isYAxisOrderByDescending) {
            dy = -dy;
        }

        return this.getGridByRelativeCoordinate(dx, dy);
    }

    /**
     * 取得多個棋盤格藉由方向直到超出棋盤界線
     * @see GridDirection
     * @param {number} direction 方向
     * @return {Grid<GridPiece, GridState>[]}
     */
    public getGridsByDirectionUntilOverBoundary(direction: number): Grid<GridPiece, GridState>[] {
        let grids = [];
        let grid: Grid<GridPiece, GridState> | null = this as Grid<GridPiece, GridState>;

        while (grid = grid.getGridByDirection(direction)) {
            grids.push(grid);
        }

        return grids;
    }

    /**
     * 取得多個棋盤格藉由方向來自轉向直到超出棋盤界線
     * @see GridDirection
     * @param {number} direction 方向
     * @see GridOrientation
     * @param {number} orientation 轉向，預設為棋盤轉向
     * @return {Grid<GridPiece, GridState>[]}
     */
    public getGridsByDirectionFromOrientationUntilOverBoundary(direction: number, orientation: number = this.board.orientation): Grid<GridPiece, GridState>[] {
        let grids = [];
        let grid: Grid<GridPiece, GridState> | null = this as Grid<GridPiece, GridState>;

        while (grid = grid.getGridByDirectionFromOrientation(direction, orientation)) {
            grids.push(grid);
        }

        return grids;
    }

    /**
     * 取得多個棋盤格藉由方向直到條件達成或超出棋盤界線
     * @see GridDirection
     * @param {number} direction 方向
     * @param {(grid: Grid<GridPiece, GridState>) => boolean} condition 條件判斷
     * @return {Grid<GridPiece, GridState>[]}
     */
    public getGridsByDirectionUntilConditionMet(direction: number, condition: (grid: Grid<GridPiece, GridState>) => boolean): Grid<GridPiece, GridState>[] {
        let grids = [];
        let grid: Grid<GridPiece, GridState> | null = this as Grid<GridPiece, GridState>;

        while (grid = grid.getGridByDirection(direction)) {
            if (condition(grid)) {
                break;
            }

            grids.push(grid);
        }

        return grids;
    }

    /**
     * 取得多個棋盤格藉由方向來自轉向直到條件達成或超出棋盤界線
     * @see GridDirection
     * @param {number} direction 方向
     * @param {(grid: Grid<GridPiece, GridState>) => boolean} condition 條件判斷
     * @see GridOrientation
     * @param {number} orientation 轉向，預設為棋盤轉向
     * @return {Grid<GridPiece, GridState>[]}
     */
    public getGridsByDirectionFromOrientationUntilConditionMet(direction: number, condition: (grid: Grid<GridPiece, GridState>) => boolean, orientation: number = this.board.orientation): Grid<GridPiece, GridState>[] {
        let grids = [];
        let grid: Grid<GridPiece, GridState> | null = this as Grid<GridPiece, GridState>;

        while (grid = grid.getGridByDirectionFromOrientation(direction, orientation)) {
            if (condition(grid)) {
                break;
            }

            grids.push(grid);
        }

        return grids;
    }

    /**
     * 移動棋子到棋盤格
     * @param {Grid<GridPiece, GridState>} grid 棋盤格
     * @return {boolean} 是否移動成功
     */
    public movePieceToGrid(grid: Grid<GridPiece, GridState>): boolean {
        if (!isObjectAndHasKey(grid, "piece")) {
            return false;
        }

        grid.piece = this.piece;
        this.piece = null;

        return true;
    }
}

export default Grid;
