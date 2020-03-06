import Grid from "./Grid";
import GridBoard from "./GridBoard";
import { SpliceBoundaryDefinition } from "./type";

export namespace GridBoardBoundarySpliceDefinition {
    export function cyclic<GridPiece, GridState>(x: number, y: number, board: GridBoard<GridPiece, GridState>): Grid<GridPiece, GridState> | null {
        x = (x % board.width + board.width) % board.width;
        y = (y % board.height + board.height) % board.height;

        return board.getGridByAbsoluteCoordinate(x, y);
    }

    export function spliceBoardByDirection<GridPiece, GridState>(otherBoard: GridBoard<GridPiece, GridState>, direction: number): SpliceBoundaryDefinition<GridPiece, GridState> {
        let f = (0xF000 & direction) >> 12;
        let b = (0x0F00 & direction) >> 8;
        let l = (0x00F0 & direction) >> 4;
        let r = (0x000F & direction);

        let dx = 0;
        let dy = 0;

        if (f > b) {
            dy = otherBoard.height;
        }

        if (l > r) {
            dx = otherBoard.width;
        }

        return function (x, y, board) {
            let isNotSpliced = (
                f && y > -1 ||
                b && y < board.height ||
                l && x > -1 ||
                r && y < board.width
            );

            if (isNotSpliced) {
                return null;
            }

            if (b > f) {
                y -= board.height;
            }

            if (r > l) {
                x -= board.width;
            }

            console.log(`${dx + x}, ${dy + y}`);

            return otherBoard.getGridByAbsoluteCoordinate(dx + x, dy + y);
        };
    }
}

`
     0   1
 0 |   |   |
 1 |   |   |
 0 |   |   |
 1 |   |   |
`