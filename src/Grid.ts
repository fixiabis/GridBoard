import GridBoard from "./GridBoard";
import GridDirection from "./GridDirection";

class Grid<GridBody> {
    public x: number;
    public y: number;
    public i: number;
    public body: GridBody | null;
    public board: GridBoard<GridBody>;

    constructor(x: number, y: number, board: GridBoard<GridBody>) {
        this.x = x;
        this.y = y;
        this.i = x * board.height + y;
        this.body = null;
        this.board = board;
    }

    public getGridByDirection(direction: GridDirection | number): Grid<GridBody> | null {
        let f = (0xF000 & direction) >> 12;
        let b = (0x0F00 & direction) >> 8;
        let r = (0x00F0 & direction) >> 4;
        let l = (0x000F & direction);

        return this.getGridByRelativeCoordinate(b - f, r - l);
    }

    public getGridByRelativeCoordinate(dx: number, dy: number): Grid<GridBody> | null {
        let x = this.x + dx;
        let y = this.y + dy;

        return this.board.getGridByAbsoluteCoordinate(x, y);
    }
}

export default Grid;
