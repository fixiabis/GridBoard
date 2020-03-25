export type Coordinate = [number, number] | readonly [number, number];

export type CoordinateConvert = (x: number, y: number) => Coordinate;

export interface CoordinateConverter {
    convertAbsoluteCoordinate(x: number, y: number): Coordinate;
    convertRelativeCoordinate(dx: number, dy: number): Coordinate;
}

export interface DirectionParser {
    [codes: string]: Coordinate;
    (codes: string | TemplateStringsArray): Coordinate;
}
