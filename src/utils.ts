import GridBoard from "./GridBoard";
import Direction, { Vector, DirectionParser } from "./Direction";

interface OrientationConverter {
    <GridPiece, GridState>(board: GridBoard<GridPiece, GridState>, orientation: number): [VectorConverter, VectorConverter, DirectionParser];
}

interface VectorConverter {
    (x: number, y: number): Vector;
    (vector: Vector): Vector;
}

export const useOrientation = function (board, orientation) {
    const isAxisNeedSwap = (0b100 & orientation) > 0;
    const isXAxisOrderByDescending = (0b010 & orientation) > 0;
    const isYAxisOrderByDescending = (0b001 & orientation) > 0;

    function convertAbsoluteCoordinate(x: number, y: number): Vector;
    function convertAbsoluteCoordinate(coordinate: Vector): Vector;
    function convertAbsoluteCoordinate(x: number | Vector, y?: number): Vector {
        if (y === undefined || typeof x === "object") {
            return convertAbsoluteCoordinate(...x as [number, number]);
        }

        if (isAxisNeedSwap) {
            [y, x] = [x, y];
        }

        if (isXAxisOrderByDescending) {
            x = board.width - 1 - x;
        }

        if (isYAxisOrderByDescending) {
            y = board.height - 1 - y;
        }

        return Object.freeze([x, y]) as Vector;
    }

    function convertRelativeCoordinate(dx: number, dy: number): Vector;
    function convertRelativeCoordinate(direction: Vector): Vector;
    function convertRelativeCoordinate(dx: number | Vector, dy?: number): Vector {
        if (dy === undefined || typeof dx === "object") {
            return convertRelativeCoordinate(...dx as [number, number]);
        }

        if (isAxisNeedSwap) {
            [dy, dx] = [dx, dy];
        }

        if (isXAxisOrderByDescending) {
            dx = -dx;
        }

        if (isYAxisOrderByDescending) {
            dy = -dy;
        }

        return Object.freeze([dx, dy]) as Vector;
    }

    const convertDirection = function (codes: string | TemplateStringsArray) {
        return convertRelativeCoordinate(Direction(codes));
    };

    return [convertAbsoluteCoordinate, convertRelativeCoordinate, convertDirection];
} as OrientationConverter;
