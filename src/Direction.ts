export type Vector = readonly [number, number] | [number, number];

export interface DirectionParser {
    [codes: string]: Vector;
    (codes: string | TemplateStringsArray): Vector;
}

const Direction = function (codes: string | TemplateStringsArray): Vector {
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
            case "F": {
                dy--;
                break;
            }

            case "B": {
                dy++;
                break;
            }

            case "L": {
                dx--;
                break;
            }

            case "R": {
                dx++;
                break;
            }
        }
    }

    return Direction[codes] = [dx, dy] as Vector;
} as DirectionParser;

export default Direction;
