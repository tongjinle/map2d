export interface IPosition {
    x: number;
    y: number;
}
export declare enum Direction {
    up = 0,
    right = 1,
    down = 2,
    left = 3,
}
export declare function lineRange(posiSource: IPosition, dist: number, dire: number): IPosition[];
export declare function slashRange(posiSource: IPosition, dist: number, dire: number): IPosition[];
export declare function nearRange(posiSource: IPosition, dist: Direction): IPosition[];
export declare function nearSlashRange(posiSource: IPosition, dist: Direction): IPosition[];
export declare function circleRange(posiSource: IPosition, radius: number): IPosition[];
export declare function manhattanRange(posiSource: IPosition, radius: number): IPosition[];
export declare function getBetween(pa: IPosition, pb: IPosition): IPosition[];
export declare function unique(posiList: IPosition[]): IPosition[];
export declare function sub(posiListSource: IPosition[], posiListTarget: IPosition[]): IPosition[];
