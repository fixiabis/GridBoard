import GridBoard from "./GridBoard";
import GridDirection from "./GridDirection";
import GridOrientation from "./GridOrientation";

class Grid<GridBody> {
    public readonly x: number;
    public readonly y: number;
    public readonly i: number;
    public body: GridBody | null;
    public readonly board: GridBoard<GridBody>;

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
        let l = (0x00F0 & direction) >> 4;
        let r = (0x000F & direction);

        return this.getGridByRelativeCoordinate(r - l, b - f);
    }

    public getGridByRelativeCoordinate(dx: number, dy: number): Grid<GridBody> | null {
        let x = this.x + dx;
        let y = this.y + dy;

        return this.board.getGridByAbsoluteCoordinate(x, y);
    }

    public getGridByDirectionFromOrientation(direction: GridDirection | number, orientation: GridOrientation | number = this.board.orientation): Grid<GridBody> | null {
        let swapXAxisToYAxis = (orientation & 0b100) >> 2;
        let xOrderByDescending = (orientation & 0b010) >> 1;
        let yOrderByDescending = (orientation & 0b001);

        let f = (0xF000 & direction) >> 12;
        let b = (0x0F00 & direction) >> 8;
        let l = (0x00F0 & direction) >> 4;
        let r = (0x000F & direction);

        if (swapXAxisToYAxis) {
            [f, b, l, r] = [l, r, f, b];
        }

        if (xOrderByDescending) {
            [r, l] = [l, r];
        }

        if (yOrderByDescending) {
            [b, f] = [f, b];
        }

        return this.getGridByRelativeCoordinate(r - l, b - f);
    }

    public getGridByRelativeCoordinateFromOrientation(dx: number, dy: number, orientation: GridOrientation | number = this.board.orientation): Grid<GridBody> | null {
        let swapXAxisToYAxis = (orientation & 0b100) >> 2;
        let xOrderByDescending = (orientation & 0b010) >> 1;
        let yOrderByDescending = (orientation & 0b001);

        if (swapXAxisToYAxis) {
            [dy, dx] = [dx, dy];
        }

        if (xOrderByDescending) {
            dx = -dx;
        }

        if (yOrderByDescending) {
            dy = -dy;
        }

        return this.getGridByRelativeCoordinate(dx, dy);
    }
}

export default Grid;
