import Grid from "./Grid";
import GridBoard from "./GridBoard";

export namespace GridOverBoundaryRedirect {
    export function cyclicMode<GridPiece, GridState>(this: GridBoard<GridPiece, GridState>, x: number, y: number): Grid<GridPiece, GridState> | null {
        x = (x % this.width + this.width) % this.width;
        y = (y % this.height + this.height) % this.height;

        return this.getGridByAbsoluteCoordinate(x, y);
    }
}
