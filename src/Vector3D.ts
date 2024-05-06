export default class Vector3D {
  x: number;
  y: number;
  z: number;

  // constructor 构造函数

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static fromArray(arr: number[]): Vector3D {
    const x = arr[0] || 0;
    const y = arr[1] || 0;
    const z = arr[2] || 0;
    return new Vector3D(x, y, z);
  }

  static fromObj(obj: Vector3DLike): Vector3D {
    const x = obj.x || 0;
    const y = obj.y || 0;
    const z = obj.z || 0;
    return new Vector3D(x, y, z);
  }

  static fromJson(json: string): Vector3D {
    const obj = JSON.parse(json);
    return Vector3D.fromObj(obj);
  }

  // randomize 随机函数

  static randomize(min: number|Vector3DLike, max: number|Vector3DLike): Vector3D {
    if (typeof min === 'number') {
      min = new Vector3D(min, min, min);
    }
    if (typeof max === 'number') {
      max = new Vector3D(max, max, max);
    }
    const dim = Vector3D.sub(min, max)
    const x = Math.random() * dim.x + min.x;
    const y = Math.random() * dim.y + min.y;
    const z = Math.random() * dim.z + min.z;
    return new Vector3D(x, y, z);
  }

  static randomizeX(min: number|Vector3DLike, max: number|Vector3DLike): Vector3D {
    if (typeof min === 'number') {
      min = new Vector3D(min, min, min);
    }
    if (typeof max === 'number') {
      max = new Vector3D(max, max, max);
    }
    const dim = Vector3D.sub(min, max)
    const x = Math.random() * dim.x + min.x;
    return new Vector3D(x, min.y, min.z);
  }

  static randomizeY(min: number|Vector3DLike, max: number|Vector3DLike): Vector3D {
    if (typeof min === 'number') {
      min = new Vector3D(min, min, min);
    }
    if (typeof max === 'number') {
      max = new Vector3D(max, max, max);
    }
    const dim = Vector3D.sub(min, max)
    const y = Math.random() * dim.y + min.y;
    return new Vector3D(min.x, y, min.z);
  }

  static randomizeZ(min: number|Vector3DLike, max: number|Vector3DLike): Vector3D {
    if (typeof min === 'number') {
      min = new Vector3D(min, min, min);
    }
    if (typeof max === 'number') {
      max = new Vector3D(max, max, max);
    }
    const dim = Vector3D.sub(min, max)
    const z = Math.random() * dim.z + min.z;
    return new Vector3D(min.x, min.y, z);
  }

  static randomizeSpherical(center:Vector3DLike, radius:number):Vector3D {
    const theta = Math.random() * Math.PI;
    const phi = Math.random() * Math.PI * 2;
    const r = Math.pow( Math.random(), 1/3) * radius;

    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.sin(theta) * Math.sin(phi);
    const z = r * Math.cos(theta);
    return new Vector3D(x, y, z);
  }

  static randomizeRectInPlane(min:number|Vector3DLike, max:number|Vector3DLike, normal?:Vector3DLike):Vector3D {
    // TODO Implement this function
    return new Vector3D(0,0,0);

    // if (typeof min === 'number') {
    //   min = new Vector3D(min, min, min);
    // }
    // if (typeof max === 'number') {
    //   max = new Vector3D(max, max, max);
    // }
    // if (!normal) {
    //   normal = new Vector3D(0, 0, 1);
    // }
    // const dim = Vector3D.sub(min, max);
    //
    // return new Vector3D(x, y, z);
  }

  static randomizeCircleInPlane(center:Vector3DLike, radius:number, normal?:Vector3DLike):Vector3D {
    // TODO Implement this function
    return new Vector3D(0,0,0);
  }

  // utils 工具函数

  stringify(): string {
    return JSON.stringify(this);
  }
  toString = this.stringify;

  toObject(): Vector3DLike {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }

  toArray(): number[] {
    return [this.x, this.y, this.z];
  }

  clone(): Vector3D {
    return new Vector3D(this.x, this.y, this.z);
  }

  copy(v: Vector3DLike): Vector3D {
    this.x = v.x;
    this.y = v.y;
    this.z = v.z;
    return this;
  }

  // math 数学运算

  add(v: Vector3DLike): Vector3D {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  static add(v1: Vector3DLike, v2: Vector3DLike): Vector3D {
    return new Vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  sub(v: Vector3DLike): Vector3D {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  static sub(v1: Vector3DLike, v2: Vector3DLike): Vector3D {
    return new Vector3D(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  mul(s: number): Vector3D {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  static mul(v: Vector3DLike, s: number): Vector3D {
    return new Vector3D(v.x * s, v.y * s, v.z * s);
  }

  div(s: number): Vector3D {
    this.x /= s;
    this.y /= s;
    this.z /= s;
    return this;
  }

  static div(v: Vector3DLike, s: number): Vector3D {
    return new Vector3D(v.x / s, v.y / s, v.z / s);
  }

  scale(len: number) {
    const scale = len / this.length();
    return this.mul(scale);
  }

  static scale(v: Vector3DLike, len: number): Vector3D {
    const scale = len / Vector3D.len(v);
    return Vector3D.mul(v, scale);
  }

  limit(len: number): Vector3D {
    if (this.length() > len) {
      return this.scale(len);
    }
    return this;
  }

  static limit(v: Vector3DLike, len: number): Vector3D {
    if (Vector3D.len(v) > len) {
      return Vector3D.scale(v, len);
    }
    return Vector3D.fromObj(v);
  }

  mix(v: Vector3DLike, alpha = 0.5 ): Vector3D {
    return this.add(Vector3D.sub(v, this).mul(alpha));
  }

  static mix(v1: Vector3DLike, v2: Vector3DLike, alpha = 0.5 ): Vector3D {
    return Vector3D.add(v1, Vector3D.sub(v2, v1).mul(alpha));
  }

  normalize(): Vector3D {
    const len = this.length();
    if (len === 0) {
      return this;
    }
    return this.div(len);
  }

  static normalize(v: Vector3DLike): Vector3D {
    const len = Vector3D.len(v);
    if (len === 0) {
      return Vector3D.fromObj(v);
    }
    return Vector3D.div(v,len);
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }
  lengthSq(): number {
    return this.x ** 2 + this.y ** 2 + this.z ** 2;
  }
  len = this.length;

  static len(v: Vector3DLike): number {
    return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
  }
  static lengthSq(v: Vector3DLike): number {
    return v.x ** 2 + v.y ** 2 + v.z ** 2;
  }

  distance(v: Vector3DLike): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
  }
  distanceSq(v: Vector3DLike): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    const dz = this.z - v.z;
    return dx ** 2 + dy ** 2 + dz ** 2;
  }

  static distance(v1: Vector3DLike, v2: Vector3DLike): number {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    const dz = v1.z - v2.z;
    return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
  }
  static distanceSq(v1: Vector3DLike, v2: Vector3DLike): number {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    const dz = v1.z - v2.z;
    return dx ** 2 + dy ** 2 + dz ** 2;
  }

  dot(v: Vector3DLike): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  static dot(v1: Vector3DLike, v2: Vector3DLike): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  cross(v: Vector3DLike): Vector3D {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vector3D(x, y, z);
  }

  static cross(v1: Vector3DLike, v2: Vector3DLike): Vector3D {
    const x = v1.y * v2.z - v1.z * v2.y;
    const y = v1.z * v2.x - v1.x * v2.z;
    const z = v1.x * v2.y - v1.y * v2.x;
    return new Vector3D(x, y, z);
  }

  nCross(v: Vector3DLike): Vector3D {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vector3D(x, y, z).normalize();
  }

  static nCross(v1: Vector3DLike, v2: Vector3DLike): Vector3D {
    const x = v1.y * v2.z - v1.z * v2.y;
    const y = v1.z * v2.x - v1.x * v2.z;
    const z = v1.x * v2.y - v1.y * v2.x;
    return new Vector3D(x, y, z).normalize();
  }

  // projection 投影运算

  // angle 角度运算

  // comparison 比较运算

  inRange(v: Vector3DLike, range:number): boolean {
    return this.distanceSq(v) <= range ** 2;
  }

  static inRange(v1: Vector3DLike, v2: Vector3DLike, range:number): boolean {
    return Vector3D.distanceSq(v1, v2) <= range ** 2;
  }

  inCube(v1: Vector3DLike, v2: Vector3DLike): boolean{
    const xInCube = this.x >= v1.x && this.x <= v2.x;
    const yInCube = this.y >= v1.y && this.y <= v2.y;
    const zInCube = this.z >= v1.z && this.z <= v2.z;
    return xInCube && yInCube && zInCube;
  }

  static inCube(v: Vector3DLike, v1: Vector3DLike, v2: Vector3DLike): boolean{
    const xInCube = v.x <= v1.x && v.x <= v2.x;
    const yInCube = v.y <= v1.y && v.y <= v2.y;
    const zInCube = v.z <= v1.z && v.z <= v2.z;
    return xInCube && yInCube && zInCube;
  }

  // unary 一元运算

  neg(): Vector3D {
    return new Vector3D(-this.x, -this.y, -this.z);
  }

  toNeg(): Vector3D {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  static neg(v: Vector3DLike): Vector3D {
    return new Vector3D(-v.x, -v.y, -v.z);
  }

  abs(): Vector3D {
    return new Vector3D(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
  }

  toAbs(): Vector3D {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    this.z = Math.abs(this.z);
    return this;
  }

  static abs(v: Vector3DLike) {
    return new Vector3D(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
  }

  floor(): Vector3D {
    return new Vector3D(Math.floor(this.x), Math.floor(this.y), Math.floor(this.z));
  }
  ceil(): Vector3D {
    return new Vector3D(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z));
  }
  round(): Vector3D {
    return new Vector3D(Math.round(this.x), Math.round(this.y), Math.round(this.z));
  }

  toFloor(): Vector3D {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }
  toCeil(): Vector3D {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }
  toRound(): Vector3D {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }

  static floor(v: Vector3DLike) {
    return new Vector3D(Math.floor(v.x), Math.floor(v.y), Math.floor(v.z));
  }
  static ceil(v: Vector3DLike) {
    return new Vector3D(Math.ceil(v.x), Math.ceil(v.y), Math.ceil(v.z));
  }
  static round(v: Vector3DLike) {
    return new Vector3D(Math.round(v.x), Math.round(v.y), Math.round(v.z));
  }
}

export interface Vector3DLike {
  x: number;
  y: number;
  z: number;
}