import { Coordinate, DirectionParser } from "./interfaces";

type Direction = Coordinate;

const Direction = function (codes: string | TemplateStringsArray): Direction {
    if (typeof codes !== "string") {
        return Direction(codes[0]);
    }

    if (codes in Direction) {
        return Direction[codes];
    }

    let dx = 0;
    let dy = 0;

    for (let code of codes.split("")) {
        switch (code) {
            case "F":
                dy--;
                break;

            case "B":
                dy++;
                break;

            case "L":
                dx--;
                break;

            case "R":
                dx++;
                break;
        }
    }

    return Direction[codes] = [dx, dy] as Direction;
} as DirectionParser;

export default Direction;
