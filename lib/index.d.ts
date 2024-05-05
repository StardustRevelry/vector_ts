import VectorPlot, { VectorPlotConstant, VectorPlotLike } from "./VectorPlot";
import Vector3D, { Vector3DLike } from "./Vector3D";
declare class VectorConstant {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
    static fromPlot(plot: VectorPlotLike): VectorConstant;
    static fromAngle(angle: number): VectorConstant;
    static fromArray(arr: number[]): VectorConstant;
    static fromObj(obj: VectorLike): VectorConstant;
    static fromJson(json: string): VectorConstant;
    stringify(): string;
    toString: () => string;
    toObject(): VectorLike;
    toVector(): Vector;
    clone(): VectorLike;
    cloneX(): VectorLike;
    cloneY(): Vector;
}
export default class Vector {
    x: number;
    y: number;
    constructor(x: number, y: number);
    static fromPlot(plot: VectorPlotLike): Vector;
    static fromAngle(angle: number): Vector;
    static fromArray(arr: number[]): Vector;
    static fromObj(obj: VectorLike): Vector;
    static fromJson(json: string): Vector;
    static randomize(topLeft: VectorLike, bottomRight: VectorLike): Vector;
    static randomizeX(topLeft: VectorLike, bottomRight: VectorLike): Vector;
    static randomizeY(topLeft: VectorLike, bottomRight: VectorLike): Vector;
    static randomizeCircle(center: VectorLike, radius: number): Vector;
    stringify(): string;
    toString: () => string;
    toObject(): VectorLike;
    clone(): Vector;
    cloneX(): Vector;
    cloneY(): Vector;
    copy(v: VectorLike): Vector;
    copyX(x: number | VectorLike): Vector;
    copyY(y: number | VectorLike): Vector;
    add(v: VectorLike): Vector;
    addX(x: number | VectorLike): Vector;
    addY(y: number | VectorLike): Vector;
    static add(v1: VectorLike, v2: VectorLike): Vector;
    static addX(v1: VectorLike, x: number | VectorLike): Vector;
    static addY(v1: VectorLike, y: number | VectorLike): Vector;
    sub(v: VectorLike): Vector;
    subX(x: number | VectorLike): Vector;
    subY(y: number | VectorLike): Vector;
    static sub(v1: VectorLike, v2: VectorLike): Vector;
    static subX(v1: VectorLike, x: number | VectorLike): Vector;
    static subY(v1: VectorLike, y: number | VectorLike): Vector;
    mul(s: number): Vector;
    mulX(sx: number): Vector;
    mulY(sy: number): Vector;
    static mul(v: VectorLike, s: number): Vector;
    static mulX(v: VectorLike, sx: number): Vector;
    static mulY(v: VectorLike, sy: number): Vector;
    div(s: number): Vector;
    divX(sx: number): Vector;
    divY(sy: number): Vector;
    static div(v: VectorLike, s: number): Vector;
    static divX(v: VectorLike, sx: number): Vector;
    static divY(v: VectorLike, sy: number): Vector;
    scale(len: number): Vector;
    static scale(v: VectorLike, len: number): Vector;
    limit(len: number): Vector;
    limitX(x: number): this;
    limitY(y: number): this;
    mix(v: VectorLike, alpha: number): this;
    mixX(x: number | VectorLike, alpha: number): this;
    mixY(y: number | VectorLike, alpha: number): this;
    static mix(v1: VectorLike, v2: VectorLike, alpha: number): Vector;
    static mixX(v1: VectorLike, x: number | VectorLike, alpha: number): Vector;
    static mixY(v1: VectorLike, y: number | VectorLike, alpha: number): Vector;
    norm(): Vector;
    normalize: () => Vector;
    static norm(v: VectorLike | Vector): Vector;
    static normalize: typeof Vector.norm;
    length(): number;
    len: () => number;
    static len(v: VectorLike): number;
    lengthSq(): number;
    static lengthSq(v: VectorLike): number;
    distance(v: VectorLike): number;
    static distance(v1: VectorLike, v2: VectorLike): number;
    distanceSq(v: VectorLike): number;
    static distanceSq(v1: VectorLike, v2: VectorLike): number;
    distanceX(v: VectorLike): number;
    static distanceX(v1: VectorLike, v2: VectorLike): number;
    absDistanceX(v: VectorLike): number;
    static absDistanceX(v1: VectorLike, v2: VectorLike): number;
    distanceY(v: VectorLike): number;
    static distanceY(v1: VectorLike, v2: VectorLike): number;
    absDistanceY(v: VectorLike): number;
    static absDistanceY(v1: VectorLike, v2: VectorLike): number;
    dot(v: VectorLike): number;
    static dot(v1: VectorLike, v2: VectorLike): number;
    cross(v: VectorLike): number;
    static cross(v1: VectorLike, v2: VectorLike): number;
    orthogonalProjection(v?: VectorLike): Vector[];
    orth: (v?: VectorLike) => Vector[];
    orthogonalProjectionScalar(v?: VectorLike): number[];
    orthogonalProjectionLength: (v?: VectorLike) => number[];
    orthLen: (v?: VectorLike) => number[];
    static orthogonalProjection(v1: VectorLike, v2?: VectorLike): Vector[];
    static orth: typeof Vector.orthogonalProjection;
    static orthogonalProjectionScalar(v1: VectorLike, v2?: VectorLike): number[];
    static orthogonalProjectionLength: typeof Vector.orthogonalProjectionScalar;
    static orthLen: typeof Vector.orthogonalProjectionScalar;
    projection(v?: VectorLike): Vector;
    projectionHorizontal: (v?: VectorLike) => Vector;
    projH: (v?: VectorLike) => Vector;
    proj: (v?: VectorLike) => Vector;
    projectionScalar(v?: VectorLike): number;
    projectionLength: (v?: VectorLike) => number;
    projLenH: (v?: VectorLike) => number;
    static projection(v1: VectorLike, v2?: VectorLike): Vector;
    static projectionHorizontal: typeof Vector.projection;
    static projH: typeof Vector.projection;
    static proj: typeof Vector.projection;
    static projectionScalar(v1: VectorLike, v2?: VectorLike): number;
    static projectionLength: typeof Vector.projectionScalar;
    static projLenH: typeof Vector.projectionScalar;
    rejection(v?: VectorLike): Vector;
    projectionVertical: (v?: VectorLike) => Vector;
    projV: (v?: VectorLike) => Vector;
    oproj: (v?: VectorLike) => Vector;
    rejectionScalar(v?: VectorLike): number;
    rejectionLength: (v?: VectorLike) => number;
    projLenV: (v?: VectorLike) => number;
    static rejection(v1: VectorLike, v2?: VectorLike): Vector;
    static projectionVertical: typeof Vector.rejection;
    static projV: typeof Vector.rejection;
    static oproj: typeof Vector.rejection;
    static rejectionScalar(v1: VectorLike, v2?: VectorLike): number;
    static rejectionLength: typeof Vector.rejectionScalar;
    static projLenV: typeof Vector.rejectionScalar;
    angle(): number;
    angleRad: () => number;
    angleDeg(): number;
    static angle(v1: VectorLike): number;
    static angleRad: typeof Vector.angle;
    static angleDeg(v1: VectorLike): number;
    angleTo(v: VectorLike): number;
    angleToRad: (v: VectorLike) => number;
    angleToDeg(v: VectorLike): number;
    static angleTo(v1: VectorLike, v2: VectorLike): number;
    static angleToRad: typeof Vector.angleTo;
    static angleToDeg(v1: VectorLike, v2: VectorLike): number;
    static angleCosTo(v1: VectorLike, v2: VectorLike): number;
    static angleSinTo(v1: VectorLike, v2: VectorLike): number;
    rotate(angle: number): Vector;
    rotateRad: (angle: number) => Vector;
    rotateDeg(angle: number): Vector;
    rotateVert(): Vector;
    static rotate(v: VectorLike, angle: number): Vector;
    static rotateRad: typeof Vector.rotate;
    static rotateDeg(v: VectorLike, angle: number): Vector;
    static rotateVert(v: VectorLike): Vector;
    rotateTo(v: VectorLike | number): Vector;
    rotateToRad(angle: number): Vector;
    rotateToDeg(angle: number): Vector;
    static rotateTo(v1: VectorLike, v2: VectorLike | number): Vector;
    static rotateToRad(v: VectorLike, angle: number): Vector;
    static rotateToDeg(v: VectorLike, angle: number): Vector;
    inRange(v: Vector, range: number): boolean;
    static inRange(v1: VectorLike, v2: VectorLike, range: number): boolean;
    quadrant(): number;
    static quadrant(v: VectorLike): number;
    neg(): Vector;
    negX(): Vector;
    negY(): Vector;
    toNeg(): Vector;
    toNegX(): Vector;
    toNegY(): Vector;
    static neg(v: VectorLike): Vector;
    abs(): Vector;
    toAbs(): Vector;
    static abs(v: VectorLike): Vector;
    floor(): Vector;
    toFloor(): Vector;
    static floor(v: VectorLike): Vector;
    ceil(): Vector;
    toCeil(): Vector;
    static ceil(v: VectorLike): Vector;
    round(): Vector;
    toRound(): Vector;
    static round(v: VectorLike): Vector;
    static readonly ZERO: VectorConstant;
    static readonly UNIT_X: VectorConstant;
    static readonly UNIT_Y: VectorConstant;
}
export { Vector, VectorConstant, VectorPlot, VectorPlotConstant, Vector3D, };
export type { VectorPlotLike, Vector3DLike };
export interface VectorLike {
    x: number;
    y: number;
    z?: number;
}