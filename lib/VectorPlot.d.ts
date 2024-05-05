import Vector, { VectorLike } from './index';
export declare class VectorPlotConstant {
    readonly theta: number;
    readonly r: number;
    constructor(theta: number, r: number);
    static fromCoords(v: VectorLike): VectorPlot;
    static fromArray(arr: number[]): VectorPlot;
    static fromObj(obj: VectorPlotLike): VectorPlot;
    static fromJson(json: string): VectorPlot;
    static randomize(topLeft: VectorLike | VectorPlotLike, bottomRight: VectorLike | VectorPlotLike): VectorPlot;
    static randomizeCircle(center: VectorLike | VectorPlotLike, radius: number): VectorPlot;
    static randomizeUnit(): VectorPlot;
    stringify(): string;
    toString: () => string;
    toObject(): VectorPlotLike;
    clone(): VectorPlot;
}
export default class VectorPlot {
    theta: number;
    r: number;
    constructor(theta: number, r: number);
    static fromCoords(v: VectorLike): VectorPlot;
    static fromArray(arr: number[]): VectorPlot;
    static fromObj(obj: VectorPlotLike): VectorPlot;
    static fromJson(json: string): VectorPlot;
    static randomize(topLeft: VectorLike | VectorPlotLike, bottomRight: VectorLike | VectorPlotLike): VectorPlot;
    static randomizeCircle(center: VectorLike | VectorPlotLike, radius: number): VectorPlot;
    static randomizeUnit(): VectorPlot;
    stringify(): string;
    toString: () => string;
    toObject(): VectorPlotLike;
    toStandard(): VectorPlot;
    clone(): VectorPlot;
    copy(v: VectorPlotLike): VectorPlot;
    add(v: VectorPlotLike): VectorPlot;
    static add(v1: VectorPlotLike, v2: VectorPlotLike): VectorPlot;
    sub(v: VectorPlotLike): VectorPlot;
    static sub(v1: VectorPlotLike, v2: VectorPlotLike): VectorPlot;
    mul(n: number): VectorPlot;
    static mul(v: VectorPlotLike, n: number): VectorPlot;
    div(n: number): VectorPlot;
    static div(v: VectorPlotLike, n: number): VectorPlot;
    scale(n: number): VectorPlot;
    static scale(v: VectorPlotLike, n: number): VectorPlot;
    limit(n: number): VectorPlot;
    static limit(v: VectorPlotLike, n: number): VectorPlot;
    mix(v: VectorPlotLike, alpha: number): VectorPlot;
    static mix(v1: VectorPlotLike, v2: VectorPlotLike, alpha: number): VectorPlot;
    norm(): VectorPlot;
    normalize: () => VectorPlot;
    static norm(v: VectorPlotLike): VectorPlot;
    static normalize: typeof VectorPlot.norm;
    distance(v: VectorPlotLike): number;
    distanceSq(v: VectorPlotLike): number;
    static distance(v1: VectorPlotLike, v2: VectorPlotLike): number;
    static distanceSq(v1: VectorPlotLike, v2: VectorPlotLike): number;
    dot(v: VectorPlotLike): number;
    static dot(v1: VectorPlotLike, v2: VectorPlotLike): number;
    cross(v: VectorPlotLike): number;
    static cross(v1: VectorPlotLike, v2: VectorPlotLike): number;
    orthogonalProjection(v?: VectorPlotLike): VectorPlot[];
    orth: (v?: VectorPlotLike) => VectorPlot[];
    orthogonalProjectionScalar(v?: VectorPlotLike): number[];
    orthogonalProjectionLength: (v?: VectorPlotLike) => number[];
    orthLen: (v?: VectorPlotLike) => number[];
    static orthogonalProjection(v1: VectorPlotLike, v2?: VectorPlotLike): VectorPlot[];
    static orth: typeof VectorPlot.orthogonalProjection;
    static orthogonalProjectionScalar(v1: VectorPlotLike, v2?: VectorPlotLike): number[];
    static orthogonalProjectionLength: typeof VectorPlot.orthogonalProjectionScalar;
    static orthLen: typeof VectorPlot.orthogonalProjectionScalar;
    projection(v?: VectorPlotLike): VectorPlot;
    projectionHorizontal: (v?: VectorPlotLike) => VectorPlot;
    projH: (v?: VectorPlotLike) => VectorPlot;
    proj: (v?: VectorPlotLike) => VectorPlot;
    projectionScalar(v?: VectorPlotLike): number;
    projectionLength: (v?: VectorPlotLike) => number;
    projLenH: (v?: VectorPlotLike) => number;
    static projection(v1: VectorPlotLike, v2?: VectorPlotLike): VectorPlot;
    static projectionHorizontal: typeof VectorPlot.projection;
    static projH: typeof VectorPlot.projection;
    static proj: typeof VectorPlot.projection;
    static projectionScalar(v1: VectorPlotLike, v2?: VectorPlotLike): number;
    static projectionLength: typeof VectorPlot.projectionScalar;
    static projLenH: typeof VectorPlot.projectionScalar;
    rejection(v: VectorPlotLike): VectorPlot;
    projectionVertical: (v: VectorPlotLike) => VectorPlot;
    projV: (v: VectorPlotLike) => VectorPlot;
    oproj: (v: VectorPlotLike) => VectorPlot;
    rejectionScalar(v: VectorPlotLike): number;
    rejectionLength: (v: VectorPlotLike) => number;
    projLenV: (v: VectorPlotLike) => number;
    static rejection(v1: VectorPlotLike, v2?: VectorPlotLike): VectorPlot;
    static projectionVertical: typeof VectorPlot.rejection;
    static projV: typeof VectorPlot.rejection;
    static oproj: typeof VectorPlot.rejection;
    static rejectionScalar(v1: VectorPlotLike, v2?: VectorPlotLike): number;
    static rejectionLength: typeof VectorPlot.rejectionScalar;
    static projLenV: typeof VectorPlot.rejectionScalar;
    thetaDeg(): number;
    thetaRad(): number;
    static thetaDeg(v: VectorPlotLike): number;
    static thetaRad(v: VectorPlotLike): number;
    angleTo(v: VectorPlotLike): number;
    angleToRad: (v: VectorPlotLike) => number;
    angleToDeg(v: VectorPlotLike): number;
    static angleTo(v1: VectorPlotLike, v2: VectorPlotLike): number;
    static angleToRad: typeof VectorPlot.angleTo;
    static angleToDeg(v1: VectorPlotLike, v2: VectorPlotLike): number;
    rotate(angle: number): this;
    rotateRad: (angle: number) => this;
    rotateDeg(angle: number): this;
    rotateVert(): this;
    static rotate(v: VectorPlotLike, angle: number): VectorPlot;
    static rotateRad: typeof Vector.rotate;
    static rotateDeg(v: VectorPlotLike, angle: number): VectorPlot;
    static rotateVert(v: VectorPlotLike): VectorPlot;
    rotateTo(v: VectorPlotLike | number): this;
    rotateToRad(angle: number): this;
    rotateToDeg(angle: number): this;
    static rotateTo(v1: VectorPlotLike, v2: VectorPlotLike | number): VectorPlot;
    static rotateToRad(v1: VectorPlotLike, angle: number): VectorPlot;
    static rotateToDeg(v1: VectorPlotLike, angle: number): VectorPlot;
    inRange(v: VectorPlot, range: number): boolean;
    static inRange(v1: VectorPlotLike, v2: VectorPlotLike, range: number): boolean;
    quadrant(): number;
    static quadrant(v: VectorPlotLike): number;
    neg(): VectorPlot;
    static neg(v: VectorPlotLike): VectorPlot;
    static readonly ZERO: VectorPlotConstant;
    static readonly UNIT: VectorPlotConstant;
}
export interface VectorPlotLike {
    theta: number;
    r: number;
}
