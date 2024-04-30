export default class Vector3D {
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

  static len(v: Vector3D): number {
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

export interface Vector3DLike {
  x: number;
  y: number;
  z: number;
}