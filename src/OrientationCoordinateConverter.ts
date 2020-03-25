import { CoordinateConverter } from "./interfaces";
import GridBoard from "./GridBoard";

class OrientationCoordinateConverter implements CoordinateConverter {
    public board: GridBoard;
    public isAxisNeedSwap: boolean;
    public isXAxisOrderByDescending: boolean;
    public isYAxisOrderByDescending: boolean;

    constructor(board: GridBoard, orientation: number) {
        this.board = board;
        this.isAxisNeedSwap = (0b100 & orientation) > 0;
        this.isXAxisOrderByDescending = (0b010 & orientation) > 0;
        this.isYAxisOrderByDescending = (0b001 & orientation) > 0;
    }

    public convertAbsoluteCoordinate(x: number, y: number): [number, number] {
        if (this.isAxisNeedSwap) {
            [y, x] = [x, y];
        }

        if (this.isXAxisOrderByDescending) {
            x = this.board.width - 1 - x;
        }

        if (this.isYAxisOrderByDescending) {
            y = this.board.height - 1 - y;
        }

        return [x, y];
    }

    public convertRelativeCoordinate(dx: number, dy: number): [number, number] {
        if (this.isAxisNeedSwap) {
            [dy, dx] = [dx, dy];
        }

        if (this.isXAxisOrderByDescending) {
            dx = -dx;
        }

        if (this.isYAxisOrderByDescending) {
            dy = -dy;
        }

        return [dx, dy];
    }
}

export default OrientationCoordinateConverter;
