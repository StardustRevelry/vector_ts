class Vector {
  x: number;
  y: number;

  // 构造函数

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static fromArray(arr: number[]): Vector {
    const x = arr[0] || 0;
    const y = arr[1] || 0;
    return new Vector(x, y);
  }

  static fromObj(obj: VectorLike): Vector {
    const x = obj.x || 0;
    const y = obj.y || 0;
    return new Vector(x, y);
  }

  static fromJson(json: string): Vector {
    const obj = JSON.parse(json);
    return Vector.fromObj(obj);
  }

  // 工具函数

  stringify(): string {
    return JSON.stringify(this);
  }

  clone(): VectorLike {
    return new Vector(this.x, this.y);
  }

  cloneX(): VectorLike {
    return new Vector(this.x, 0);
  }

  cloneY(): Vector {
    return new Vector(0, this.y);
  }

  copy(v: VectorLike) {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  copyX(x: number | VectorLike) {
    typeof x === 'number'? this.x = x : this.x = x.x;
    return this;
  }

  copyY(y: number | VectorLike) {
    typeof y === 'number'? this.y = y : this.y = y.y;
    return this;
  }

  // 数学运算

  add(v: VectorLike): Vector {
    this.x += v.x;
    this.y += v.y;
    return this;
  }

  addX(x: number|VectorLike): Vector {
    typeof x === "number" ? this.x += x : this.x += x.x;
    return this;
  }

  addY(y: number|VectorLike): Vector {
    typeof y === "number" ? this.y += y : this.y += y.y;
    return this;
  }

  static add(v1: VectorLike, v2: VectorLike): Vector {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  }

  static addX(v1: VectorLike, x: number|VectorLike): Vector {
    typeof x === "number" ? x = {x, y: 0} : x = {x: x.x, y: 0};
    return Vector.add(v1, x);
  }

  static addY(v1: VectorLike, y: number|VectorLike): Vector {
    typeof y === "number" ? y = {x: 0, y} : y = {x: 0, y: y.y};
    return Vector.add(v1, y);
  }

  sub(v: VectorLike): Vector {
    this.x -= v.x;
    this.y -= v.y;
    return this;
  }

  subX(x: number|VectorLike): Vector {
    typeof x === "number" ? this.x -= x : this.x -= x.x;
    return this;
  }

  subY(y: number|VectorLike): Vector {
    typeof y === "number" ? this.y -= y : this.y -= y.y;
    return this;
  }

  static sub(v1: VectorLike, v2: VectorLike): Vector {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  }

  static subX(v1: VectorLike, x: number|VectorLike): Vector {
    typeof x === "number" ? x = {x, y: 0} : x = {x: x.x, y: 0};
    return Vector.sub(v1, x);
  }

  static subY(v1: VectorLike, y: number|VectorLike): Vector {
    typeof y === "number" ? y = {x: 0, y} : y = {x: 0, y: y.y};
    return Vector.sub(v1, y);
  }

  mul(s: number): Vector {
    this.x *= s;
    this.y *= s;
    return this;
  }

  mulX(sx: number): Vector {
    this.x *= sx;
    return this;
  }

  mulY(sy: number): Vector {
    this.y *= sy;
    return this;
  }

  static mul(v: VectorLike, s: number): Vector {
    return new Vector(v.x * s, v.y * s);
  }

  static mulX(v: VectorLike, sx: number): Vector {
    return new Vector(v.x * sx, 0);
  }

  static mulY(v: VectorLike, sy: number): Vector {
    return new Vector(0, v.y * sy);
  }

  div(s: number): Vector {
    this.x /= s;
    this.y /= s;
    return this;
  }

  divX(sx: number): Vector {
    this.x /= sx;
    return this;
  }

  divY(sy: number): Vector {
    this.y /= sy;
    return this;
  }

  static div(v: VectorLike, s: number): Vector {
    return new Vector(v.x / s, v.y / s);
  }

  static divX(v: VectorLike, sx: number): Vector {
    return new Vector(v.x / sx, 0);
  }

  static divY(v: VectorLike, sy: number): Vector {
    return new Vector(0, v.y / sy);
  }

  scale(len: number) {
    const scale = len / this.length();
    return this.mul(scale);
  }

  limit(len: number) {
    if (this.length() > len) {
      return this.scale(len);
    }
    return this;
  }

  limitX(x: number) {
    if (this.x > x) {
      this.x = x;
    }
    return this;
  }

  limitY(y: number) {
    if (this.y > y) {
      this.y = y;
    }
    return this;
  }

  mix(v: VectorLike, alpha: number) {
    this.x += (v.x - this.x) * alpha;
    this.y += (v.y - this.y) * alpha;
    return this;
  }

  mixX(x: number|VectorLike, alpha: number) {
    typeof x === "number" ? x : x = x.x;
    this.x += (x - this.x) * alpha;
    return this;
  }

  mixY(y: number|VectorLike, alpha: number) {
    typeof y === "number" ? y : y = y.y;
    this.y += (y - this.y) * alpha;
    return this;
  }

  static mix(v1: VectorLike, v2: VectorLike, alpha: number) {
    const x = v1.x + (v2.x - v1.x)
    const y = v1.y + (v2.y - v1.y)
    return new Vector(x, y);
  }

  static mixX(v1: VectorLike, x: number|VectorLike, alpha: number) {
    x = typeof x === "number" ? x : x.x;
    return new Vector(v1.x + (x - v1.x) * alpha, 0);
  }

  static mixY(v1: VectorLike, y: number|VectorLike, alpha: number) {
    y = typeof y === "number" ? y : y.y;
    return new Vector(0, v1.y + (y - v1.y) * alpha);
  }

  norm(): Vector {
    const len = this.length();
    if (len === 0) {
      return this;
    }
    return this.div(len);
  }
  normalize = this.norm;

  static norm(v: VectorLike | Vector): Vector {
    const len = Vector.length(v);
    if (len === 0) {
      return new Vector(0,0);
    }
    return Vector.div(v, len);
  }
  static normalize = Vector.norm;

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  static length(v: VectorLike): number {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
  }

  static distance(v1: VectorLike, v2: VectorLike): number {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  dot(v: VectorLike): number {
    return this.x * v.x + this.y * v.y;
  }

  static dot(v1: VectorLike, v2: VectorLike): number {
    return v1.x * v2.x + v1.y * v2.y;
  }

  cross(v: VectorLike): number {
    return this.x * v.y - this.y * v.x;
  }

  static cross(v1: VectorLike, v2: VectorLike): number {
    return v1.x * v2.y - v1.y * v2.x;
  }

  // 角度运算

  // TODO: 关于向量的角度运算

  // 取反/绝对值

  neg(): Vector {
    return new Vector(-this.x, -this.y);
  }

  negX(): Vector {
    return new Vector(-this.x, this.y);
  }

  negY(): Vector {
    return new Vector(this.x, -this.y);
  }

  toNeg(): Vector {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }

  toNegX(): Vector {
    this.x = -this.x;
    return this;
  }

  toNegY(): Vector {
    this.y = -this.y;
    return this;
  }

  static neg(v: VectorLike): Vector {
    return new Vector(-v.x, -v.y);
  }

  abs(): Vector {
    return new Vector(Math.abs(this.x), Math.abs(this.y));
  }

  toAbs(): Vector {
    this.x = Math.abs(this.x);
    this.y = Math.abs(this.y);
    return this;
  }

  static abs(v: VectorLike): Vector {
    return new Vector(Math.abs(v.x), Math.abs(v.y));
  }
}

// TODO: 二维极坐标向量

class Vector2dPlot {

}

class Vector3D {
  x: number;
  y: number;
  z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  add(v: Vector3D): Vector3D {
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
  }

  static add(v1: Vector3D, v2: Vector3D): Vector3D {
    return new Vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
  }

  sub(v: Vector3D): Vector3D {
    this.x -= v.x;
    this.y -= v.y;
    this.z -= v.z;
    return this;
  }

  static sub(v1: Vector3D, v2: Vector3D): Vector3D {
    return new Vector3D(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
  }

  mul(s: number): Vector3D {
    this.x *= s;
    this.y *= s;
    this.z *= s;
    return this;
  }

  static mul(v: Vector3D, s: number): Vector3D {
    return new Vector3D(v.x * s, v.y * s, v.z * s);
  }

  div(s: number): Vector3D {
    this.x /= s;
    this.y /= s;
    this.z /= s;
    return this;
  }

  static div(v: Vector3D, s: number): Vector3D {
    return new Vector3D(v.x / s, v.y / s, v.z / s);
  }

  scale(len: number) {
    const scale = len / this.length();
    return this.mul(scale);
  }

  normalize(): Vector3D {
    const len = this.length();
    if (len === 0) {
      return this;
    }
    return this.div(len);
  }

  static normalize(v: Vector3D): Vector3D {
    const len = v.length();
    if (len === 0) {
      return v;
    }
    return v.div(len);
  }

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  static length(v: Vector3D): number {
    return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
  }

  static distance(v1: Vector3D, v2: Vector3D): number {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    const dz = v1.z - v2.z;
    return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
  }

  dot(v: Vector3D): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  static dot(v1: Vector3D, v2: Vector3D): number {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  cross(v: Vector3D): Vector3D {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vector3D(x, y, z);
  }

  static cross(v1: Vector3D, v2: Vector3D): Vector3D {
    const x = v1.y * v2.z - v1.z * v2.y;
    const y = v1.z * v2.x - v1.x * v2.z;
    const z = v1.x * v2.y - v1.y * v2.x;
    return new Vector3D(x, y, z);
  }

  ncross(v: Vector3D): Vector3D {
    const x = this.y * v.z - this.z * v.y;
    const y = this.z * v.x - this.x * v.z;
    const z = this.x * v.y - this.y * v.x;
    return new Vector3D(x, y, z).normalize();
  }

  static ncross(v1: Vector3D, v2: Vector3D): Vector3D {
    const x = v1.y * v2.z - v1.z * v2.y;
    const y = v1.z * v2.x - v1.x * v2.z;
    const z = v1.x * v2.y - v1.y * v2.x;
    return new Vector3D(x, y, z).normalize();
  }

  neg(): Vector3D {
    return new Vector3D(-this.x, -this.y, -this.z);
  }

  toNeg(): Vector3D {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  static neg(v: Vector3D): Vector3D {
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

  static abs(v: Vector3D) {
    return new Vector3D(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
  }

  clone(): Vector3D {
    return new Vector3D(this.x, this.y, this.z);
  }
}

class Vector3DPlot {

}

export interface VectorLike {
  x: number;
  y: number;
  z?: number;
}

export interface Vector3DLike {
  x: number;
  y: number;
  z: number;
}

export {
  Vector,
  Vector2dPlot,
  Vector3D,
  Vector3DPlot,
}
