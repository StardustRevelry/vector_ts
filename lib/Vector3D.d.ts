export default class Vector3D {
    x: number;
    y: number;
    z: number;
    constructor(x: number, y: number, z: number);
    add(v: Vector3D): Vector3D;
    static add(v1: Vector3D, v2: Vector3D): Vector3D;
    sub(v: Vector3D): Vector3D;
    static sub(v1: Vector3D, v2: Vector3D): Vector3D;
    mul(s: number): Vector3D;
    static mul(v: Vector3D, s: number): Vector3D;
    div(s: number): Vector3D;
    static div(v: Vector3D, s: number): Vector3D;
    scale(len: number): Vector3D;
    normalize(): Vector3D;
    static normalize(v: Vector3D): Vector3D;
    length(): number;
    static len(v: Vector3D): number;
    static distance(v1: Vector3D, v2: Vector3D): number;
    dot(v: Vector3D): number;
    static dot(v1: Vector3D, v2: Vector3D): number;
    cross(v: Vector3D): Vector3D;
    static cross(v1: Vector3D, v2: Vector3D): Vector3D;
    ncross(v: Vector3D): Vector3D;
    static ncross(v1: Vector3D, v2: Vector3D): Vector3D;
    neg(): Vector3D;
    toNeg(): Vector3D;
    static neg(v: Vector3D): Vector3D;
    abs(): Vector3D;
    toAbs(): Vector3D;
    static abs(v: Vector3D): Vector3D;
    clone(): Vector3D;
}
export interface Vector3DLike {
    x: number;
    y: number;
    z: number;
}
