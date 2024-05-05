export default class Vector3D {
    constructor(x, y, z) {
        Object.defineProperty(this, "x", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "y", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "z", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
    }
    static add(v1, v2) {
        return new Vector3D(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z);
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
    }
    static sub(v1, v2) {
        return new Vector3D(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z);
    }
    mul(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }
    static mul(v, s) {
        return new Vector3D(v.x * s, v.y * s, v.z * s);
    }
    div(s) {
        this.x /= s;
        this.y /= s;
        this.z /= s;
        return this;
    }
    static div(v, s) {
        return new Vector3D(v.x / s, v.y / s, v.z / s);
    }
    scale(len) {
        const scale = len / this.length();
        return this.mul(scale);
    }
    normalize() {
        const len = this.length();
        if (len === 0) {
            return this;
        }
        return this.div(len);
    }
    static normalize(v) {
        const len = v.length();
        if (len === 0) {
            return v;
        }
        return v.div(len);
    }
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    static len(v) {
        return Math.sqrt(v.x ** 2 + v.y ** 2 + v.z ** 2);
    }
    static distance(v1, v2) {
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        const dz = v1.z - v2.z;
        return Math.sqrt(dx ** 2 + dy ** 2 + dz ** 2);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
    }
    cross(v) {
        const x = this.y * v.z - this.z * v.y;
        const y = this.z * v.x - this.x * v.z;
        const z = this.x * v.y - this.y * v.x;
        return new Vector3D(x, y, z);
    }
    static cross(v1, v2) {
        const x = v1.y * v2.z - v1.z * v2.y;
        const y = v1.z * v2.x - v1.x * v2.z;
        const z = v1.x * v2.y - v1.y * v2.x;
        return new Vector3D(x, y, z);
    }
    ncross(v) {
        const x = this.y * v.z - this.z * v.y;
        const y = this.z * v.x - this.x * v.z;
        const z = this.x * v.y - this.y * v.x;
        return new Vector3D(x, y, z).normalize();
    }
    static ncross(v1, v2) {
        const x = v1.y * v2.z - v1.z * v2.y;
        const y = v1.z * v2.x - v1.x * v2.z;
        const z = v1.x * v2.y - v1.y * v2.x;
        return new Vector3D(x, y, z).normalize();
    }
    neg() {
        return new Vector3D(-this.x, -this.y, -this.z);
    }
    toNeg() {
        this.x = -this.x;
        this.y = -this.y;
        this.z = -this.z;
        return this;
    }
    static neg(v) {
        return new Vector3D(-v.x, -v.y, -v.z);
    }
    abs() {
        return new Vector3D(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
    }
    toAbs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        this.z = Math.abs(this.z);
        return this;
    }
    static abs(v) {
        return new Vector3D(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
    }
    clone() {
        return new Vector3D(this.x, this.y, this.z);
    }
}
