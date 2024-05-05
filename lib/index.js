import VectorPlot, { VectorPlotConstant } from "./VectorPlot";
import Vector3D from "./Vector3D";
class VectorConstant {
    constructor(x, y) {
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
        Object.defineProperty(this, "toString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.stringify
        });
        this.x = x;
        this.y = y;
    }
    static fromPlot(plot) {
        const { theta, r } = plot;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        return new VectorConstant(x, y);
    }
    static fromAngle(angle) {
        return new VectorConstant(Math.cos(angle), Math.sin(angle));
    }
    static fromArray(arr) {
        const x = arr[0] || 0;
        const y = arr[1] || 0;
        return new VectorConstant(x, y);
    }
    static fromObj(obj) {
        const x = obj.x || 0;
        const y = obj.y || 0;
        return new VectorConstant(x, y);
    }
    static fromJson(json) {
        const obj = JSON.parse(json);
        return VectorConstant.fromObj(obj);
    }
    stringify() {
        return JSON.stringify(this);
    }
    toObject() {
        return { x: this.x, y: this.y };
    }
    toVector() {
        return new Vector(this.x, this.y);
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    cloneX() {
        return new Vector(this.x, 0);
    }
    cloneY() {
        return new Vector(0, this.y);
    }
}
class Vector {
    // constructors 构造函数
    constructor(x, y) {
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
        Object.defineProperty(this, "toString", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.stringify
        });
        Object.defineProperty(this, "normalize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.norm
        });
        Object.defineProperty(this, "len", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.length
        });
        Object.defineProperty(this, "orth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.orthogonalProjection
        });
        Object.defineProperty(this, "orthogonalProjectionLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.orthogonalProjectionScalar
        });
        Object.defineProperty(this, "orthLen", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.orthogonalProjectionScalar
        });
        Object.defineProperty(this, "projectionHorizontal", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.projection
        });
        Object.defineProperty(this, "projH", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.projection
        });
        Object.defineProperty(this, "proj", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.projection
        });
        Object.defineProperty(this, "projectionLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.projectionScalar
        });
        Object.defineProperty(this, "projLenH", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.projectionScalar
        });
        Object.defineProperty(this, "projectionVertical", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.rejection
        });
        Object.defineProperty(this, "projV", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.rejection
        });
        Object.defineProperty(this, "oproj", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.rejection
        });
        Object.defineProperty(this, "rejectionLength", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.rejectionScalar
        });
        Object.defineProperty(this, "projLenV", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.rejectionScalar
        });
        Object.defineProperty(this, "angleRad", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.angle
        });
        Object.defineProperty(this, "angleToRad", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.angleTo
        });
        Object.defineProperty(this, "rotateRad", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.rotate
        });
        this.x = x;
        this.y = y;
    }
    static fromPlot(plot) {
        const { theta, r } = plot;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        return new Vector(x, y);
    }
    static fromAngle(angle) {
        return new Vector(Math.cos(angle), Math.sin(angle));
    }
    static fromArray(arr) {
        const x = arr[0] || 0;
        const y = arr[1] || 0;
        return new Vector(x, y);
    }
    static fromObj(obj) {
        const x = obj.x || 0;
        const y = obj.y || 0;
        return new Vector(x, y);
    }
    static fromJson(json) {
        const obj = JSON.parse(json);
        return Vector.fromObj(obj);
    }
    // randomize 随机函数
    static randomize(topLeft, bottomRight) {
        const dimensions = Vector.sub(topLeft, bottomRight);
        const x = Math.random() * dimensions.x;
        const y = Math.random() * dimensions.y;
        return new Vector(x + topLeft.x, y + topLeft.y);
    }
    static randomizeX(topLeft, bottomRight) {
        const dimensions = Vector.sub(topLeft, bottomRight);
        const x = Math.random() * dimensions.x;
        return new Vector(x + topLeft.x, topLeft.y);
    }
    static randomizeY(topLeft, bottomRight) {
        const dimensions = Vector.sub(topLeft, bottomRight);
        const y = Math.random() * dimensions.y;
        return new Vector(topLeft.x, y + topLeft.y);
    }
    static randomizeCircle(center, radius) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * radius;
        const x = Math.cos(angle) * r;
        const y = Math.sin(angle) * r;
        return new Vector(x + center.x, y + center.y);
    }
    // utils 工具函数
    stringify() {
        return JSON.stringify(this);
    }
    toObject() {
        return { x: this.x, y: this.y };
    }
    clone() {
        return new Vector(this.x, this.y);
    }
    cloneX() {
        return new Vector(this.x, 0);
    }
    cloneY() {
        return new Vector(0, this.y);
    }
    copy(v) {
        this.x = v.x;
        this.y = v.y;
        return this;
    }
    copyX(x) {
        typeof x === 'number' ? this.x = x : this.x = x.x;
        return this;
    }
    copyY(y) {
        typeof y === 'number' ? this.y = y : this.y = y.y;
        return this;
    }
    // math 数学运算
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    addX(x) {
        typeof x === "number" ? this.x += x : this.x += x.x;
        return this;
    }
    addY(y) {
        typeof y === "number" ? this.y += y : this.y += y.y;
        return this;
    }
    static add(v1, v2) {
        return new Vector(v1.x + v2.x, v1.y + v2.y);
    }
    static addX(v1, x) {
        typeof x === "number" ? x = { x, y: 0 } : x = { x: x.x, y: 0 };
        return Vector.add(v1, x);
    }
    static addY(v1, y) {
        typeof y === "number" ? y = { x: 0, y } : y = { x: 0, y: y.y };
        return Vector.add(v1, y);
    }
    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }
    subX(x) {
        typeof x === "number" ? this.x -= x : this.x -= x.x;
        return this;
    }
    subY(y) {
        typeof y === "number" ? this.y -= y : this.y -= y.y;
        return this;
    }
    static sub(v1, v2) {
        return new Vector(v1.x - v2.x, v1.y - v2.y);
    }
    static subX(v1, x) {
        typeof x === "number" ? x = { x, y: 0 } : x = { x: x.x, y: 0 };
        return Vector.sub(v1, x);
    }
    static subY(v1, y) {
        typeof y === "number" ? y = { x: 0, y } : y = { x: 0, y: y.y };
        return Vector.sub(v1, y);
    }
    mul(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }
    mulX(sx) {
        this.x *= sx;
        return this;
    }
    mulY(sy) {
        this.y *= sy;
        return this;
    }
    static mul(v, s) {
        return new Vector(v.x * s, v.y * s);
    }
    static mulX(v, sx) {
        return new Vector(v.x * sx, 0);
    }
    static mulY(v, sy) {
        return new Vector(0, v.y * sy);
    }
    div(s) {
        this.x /= s;
        this.y /= s;
        return this;
    }
    divX(sx) {
        this.x /= sx;
        return this;
    }
    divY(sy) {
        this.y /= sy;
        return this;
    }
    static div(v, s) {
        return new Vector(v.x / s, v.y / s);
    }
    static divX(v, sx) {
        return new Vector(v.x / sx, 0);
    }
    static divY(v, sy) {
        return new Vector(0, v.y / sy);
    }
    scale(len) {
        const scale = len / this.length();
        return this.mul(scale);
    }
    static scale(v, len) {
        const scale = len / Vector.len(v);
        return new Vector(v.x * scale, v.y * scale);
    }
    limit(len) {
        if (this.length() > Math.abs(len)) {
            return this.scale(Math.abs(len));
        }
        return this;
    }
    limitX(x) {
        if (this.x > Math.abs(x)) {
            this.x = Math.abs(x);
        }
        return this;
    }
    limitY(y) {
        if (this.y > Math.abs(y)) {
            this.y = Math.abs(y);
        }
        return this;
    }
    mix(v, alpha = 0.5) {
        alpha = Math.min(1, Math.max(0, alpha));
        this.x += (v.x - this.x) * alpha;
        this.y += (v.y - this.y) * alpha;
        return this;
    }
    mixX(x, alpha = 0.5) {
        typeof x === "number" ? x : x = x.x;
        this.x += (x - this.x) * alpha;
        return this;
    }
    mixY(y, alpha = 0.5) {
        typeof y === "number" ? y : y = y.y;
        this.y += (y - this.y) * alpha;
        return this;
    }
    static mix(v1, v2, alpha = 0.5) {
        const x = v1.x + (v2.x - v1.x) * alpha;
        const y = v1.y + (v2.y - v1.y) * alpha;
        return new Vector(x, y);
    }
    static mixX(v1, x, alpha = 0.5) {
        x = typeof x === "number" ? x : x.x;
        return new Vector(v1.x + (x - v1.x) * alpha, 0);
    }
    static mixY(v1, y, alpha = 0.5) {
        y = typeof y === "number" ? y : y.y;
        return new Vector(0, v1.y + (y - v1.y) * alpha);
    }
    norm() {
        const len = this.length();
        if (len === 0) {
            return this;
        }
        return this.div(len);
    }
    static norm(v) {
        const len = Vector.len(v);
        if (len === 0) {
            return new Vector(0, 0);
        }
        return Vector.div(v, len);
    }
    length() {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    static len(v) {
        return Math.sqrt(v.x ** 2 + v.y ** 2);
    }
    lengthSq() {
        return this.x ** 2 + this.y ** 2;
    }
    static lengthSq(v) {
        return v.x ** 2 + v.y ** 2;
    }
    distance(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }
    static distance(v1, v2) {
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        return Math.sqrt(dx ** 2 + dy ** 2);
    }
    distanceSq(v) {
        const dx = this.x - v.x;
        const dy = this.y - v.y;
        return dx ** 2 + dy ** 2;
    }
    static distanceSq(v1, v2) {
        const dx = v1.x - v2.x;
        const dy = v1.y - v2.y;
        return dx ** 2 + dy ** 2;
    }
    distanceX(v) {
        return this.x - v.x;
    }
    static distanceX(v1, v2) {
        return v1.x - v2.x;
    }
    absDistanceX(v) {
        return Math.abs(this.x - v.x);
    }
    static absDistanceX(v1, v2) {
        return Math.abs(v1.x - v2.x);
    }
    distanceY(v) {
        return this.y - v.y;
    }
    static distanceY(v1, v2) {
        return v1.y - v2.y;
    }
    absDistanceY(v) {
        return Math.abs(this.y - v.y);
    }
    static absDistanceY(v1, v2) {
        return Math.abs(v1.y - v2.y);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    static dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y;
    }
    cross(v) {
        return this.x * v.y - this.y * v.x;
    }
    static cross(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x;
    }
    // projections 投影运算
    orthogonalProjection(v) {
        if (!v || v.x === 0 && v.y === 0) {
            // 默认投影到x,y坐标轴上
            return [new Vector(this.x, 0), new Vector(0, this.y)];
        }
        else {
            const h_vector = new Vector(v.y, -v.x);
            return [Vector.scale(v, this.dot(v)), h_vector.scale(this.dot(h_vector))];
        }
    }
    orthogonalProjectionScalar(v) {
        if (!v || v.x === 0 && v.y === 0) {
            // 默认投影到x,y坐标轴上
            return [this.x, this.y];
        }
        else {
            const h_vector = new Vector(v.y, -v.x);
            return [Vector.dot(this, v), Vector.dot(this, h_vector)];
        }
    }
    static orthogonalProjection(v1, v2) {
        if (!v2 || v2.x === 0 && v2.y === 0) {
            // 默认投影到x,y坐标轴上
            return [new Vector(v1.x, 0), new Vector(0, v1.y)];
        }
        else {
            const h_vector = new Vector(v2.y, -v2.x);
            return [Vector.scale(v2, Vector.dot(v1, v2)), h_vector.scale(Vector.dot(v1, h_vector))];
        }
    }
    static orthogonalProjectionScalar(v1, v2) {
        if (!v2 || v2.x === 0 && v2.y === 0) {
            // 默认投影到x,y坐标轴上
            return [v1.x, v1.y];
        }
        else {
            const h_vector = new Vector(v2.y, -v2.x);
            return [Vector.dot(v1, v2), Vector.dot(v1, h_vector)];
        }
    }
    projection(v) {
        if (!v || v.x === 0) {
            return new Vector(this.x, 0);
        }
        else {
            return Vector.scale(v, this.dot(v));
        }
    }
    projectionScalar(v) {
        if (!v || v.x === 0) {
            return this.x;
        }
        else {
            return Vector.dot(this, v);
        }
    }
    static projection(v1, v2) {
        if (!v2 || v2.x === 0) {
            return new Vector(v1.x, 0);
        }
        else {
            return Vector.scale(v2, Vector.dot(v1, v2));
        }
    }
    static projectionScalar(v1, v2) {
        if (!v2 || v2.x === 0) {
            return v1.x;
        }
        else {
            return Vector.dot(v1, v2);
        }
    }
    rejection(v) {
        if (!v || v.y === 0) {
            return new Vector(0, this.y);
        }
        else {
            const h_vector = new Vector(v.y, -v.x);
            return Vector.scale(h_vector, this.dot(h_vector));
        }
    }
    rejectionScalar(v) {
        if (!v || v.y === 0) {
            return this.y;
        }
        else {
            const h_vector = new Vector(v.y, -v.x);
            return Vector.dot(this, h_vector);
        }
    }
    static rejection(v1, v2) {
        if (!v2 || v2.y === 0) {
            return new Vector(0, v1.y);
        }
        else {
            const h_vector = new Vector(v2.y, -v2.x);
            return Vector.scale(h_vector, Vector.dot(v1, h_vector));
        }
    }
    static rejectionScalar(v1, v2) {
        if (!v2 || v2.y === 0) {
            return v1.y;
        }
        else {
            const h_vector = new Vector(v2.y, -v2.x);
            return Vector.dot(v1, h_vector);
        }
    }
    // angles 角度运算
    angle() {
        return Math.atan2(this.y, this.x);
    }
    angleDeg() {
        return this.angle() * 180 / Math.PI;
    }
    static angle(v1) {
        return Math.atan2(v1.y, v1.x);
    }
    static angleDeg(v1) {
        return Math.atan2(v1.y, v1.x) * 180 / Math.PI;
    }
    angleTo(v) {
        const dot_result = this.dot(v);
        const len1 = this.length();
        const len2 = Vector.len(v);
        const cos_theta = dot_result / (len1 * len2);
        return Math.acos(cos_theta);
    }
    angleToDeg(v) {
        return this.angleTo(v) * 180 / Math.PI;
    }
    static angleTo(v1, v2) {
        const dot_result = Vector.dot(v1, v2);
        const len1 = Vector.len(v1);
        const len2 = Vector.len(v2);
        const cos_theta = dot_result / (len1 * len2);
        return Math.acos(cos_theta);
    }
    static angleToDeg(v1, v2) {
        return Vector.angleTo(v1, v2) * 180 / Math.PI;
    }
    static angleCosTo(v1, v2) {
        const dot_result = Vector.dot(v1, v2);
        const len1 = Vector.len(v1);
        const len2 = Vector.len(v2);
        return dot_result / (len1 * len2);
    }
    static angleSinTo(v1, v2) {
        const cross_result = Vector.cross(v1, v2);
        const len1 = Vector.len(v1);
        const len2 = Vector.len(v2);
        return cross_result / (len1 * len2);
    }
    rotate(angle) {
        const cosa = Math.cos(angle);
        const sina = Math.sin(angle);
        /**
         * 旋转矩阵 R:
         * | cos(a), -sin(a) |
         * | sin(a),  cos(a) |
         * 结果:
         * R · v
         */
        this.x = this.x * cosa - this.y * sina;
        this.y = this.x * sina + this.y * cosa;
        return this;
    }
    rotateDeg(angle) {
        return this.rotate(angle * Math.PI / 180);
    }
    rotateVert() {
        return new Vector(this.y, -this.x);
    }
    static rotate(v, angle) {
        const cosa = Math.cos(angle);
        const sina = Math.sin(angle);
        /**
         * 旋转矩阵 R:
         * | cos(a), -sin(a) |
         * | sin(a),  cos(a) |
         * 结果:
         * R · v
         */
        v.x = v.x * cosa - v.y * sina;
        v.y = v.x * sina + v.y * cosa;
        return new Vector(v.x, v.y);
    }
    static rotateDeg(v, angle) {
        return Vector.rotate(v, angle * Math.PI / 180);
    }
    static rotateVert(v) {
        return new Vector(v.y, -v.x);
    }
    rotateTo(v) {
        if (typeof v === 'number') {
            return this.rotateToRad(v);
        }
        else {
            const dot_result = this.dot(v);
            const cross_result = this.cross(v);
            const len1 = this.length();
            const len2 = Vector.len(v);
            const cos_theta = dot_result / (len1 * len2);
            const sin_theta = cross_result / (len1 * len2);
            this.x = this.x * cos_theta - this.y * sin_theta;
            this.y = this.x * sin_theta + this.y * cos_theta;
            return this;
        }
    }
    rotateToRad(angle) {
        const v = Vector.fromAngle(angle);
        const dot_result = this.dot(v);
        const cross_result = this.cross(v);
        const len1 = this.length();
        const len2 = 1;
        const cos_theta = dot_result / (len1 * len2);
        const sin_theta = cross_result / (len1 * len2);
        this.x = this.x * cos_theta - this.y * sin_theta;
        this.y = this.x * sin_theta + this.y * cos_theta;
        return this;
    }
    rotateToDeg(angle) {
        return this.rotateToRad(angle * Math.PI / 180);
    }
    static rotateTo(v1, v2) {
        if (typeof v2 === 'number') {
            return Vector.rotateToRad(v1, v2);
        }
        else {
            const dot_result = Vector.dot(v1, v2);
            const cross_result = Vector.cross(v1, v2);
            const len1 = Vector.len(v1);
            const len2 = Vector.len(v2);
            const cos_theta = dot_result / (len1 * len2);
            const sin_theta = cross_result / (len1 * len2);
            const x = v1.x * cos_theta - v1.y * sin_theta;
            const y = v1.x * sin_theta + v1.y * cos_theta;
            return new Vector(x, y);
        }
    }
    static rotateToRad(v, angle) {
        const v2 = Vector.fromAngle(angle);
        const dot_result = Vector.dot(v, v2);
        const cross_result = Vector.cross(v, v2);
        const len1 = Vector.len(v);
        const len2 = 1;
        const cos_theta = dot_result / (len1 * len2);
        const sin_theta = cross_result / (len1 * len2);
        const x = v.x * cos_theta - v.y * sin_theta;
        const y = v.x * sin_theta + v.y * cos_theta;
        return new Vector(x, y);
    }
    static rotateToDeg(v, angle) {
        return Vector.rotateToRad(v, angle * Math.PI / 180);
    }
    // comparison 比较运算
    inRange(v, range) {
        return this.distanceSq(v) <= range ** 2;
    }
    static inRange(v1, v2, range) {
        return Vector.distanceSq(v1, v2) <= range ** 2;
    }
    inRect(x, y, width, height) {
        if (typeof x === 'number' && typeof y === 'number' && typeof width === 'number' && typeof height === 'number') {
            return this.x >= x && this.x <= x + width && this.y >= y && this.y <= y + height;
        }
        else if (typeof x === 'object' && typeof y === 'object') {
            return this.x >= x.x && this.x <= x.x + y.x && this.y >= x.y && this.y <= x.y + y.y;
        }
        else {
            return false;
        }
    }
    static inRect(v, x, y, width, height) {
        if (typeof x === 'number' && typeof y === 'number' && typeof width === 'number' && typeof height === 'number') {
            return v.x >= x && v.x <= x + width && v.y >= y && v.y <= y + height;
        }
        else if (typeof x === 'object' && typeof y === 'object') {
            return v.x >= x.x && v.x <= x.x + y.x && v.y >= x.y && v.y <= x.y + y.y;
        }
        else {
            return false;
        }
    }
    quadrant() {
        if (this.x >= 0 && this.y >= 0) {
            return 1;
        }
        else if (this.x < 0 && this.y >= 0) {
            return 2;
        }
        else if (this.x < 0 && this.y < 0) {
            return 3;
        }
        else { // this.x >= 0 && this.y < 0
            return 4;
        }
    }
    static quadrant(v) {
        if (v.x >= 0 && v.y >= 0) {
            return 1;
        }
        else if (v.x < 0 && v.y >= 0) {
            return 2;
        }
        else if (v.x < 0 && v.y < 0) {
            return 3;
        }
        else { // v.x >= 0 && v.y < 0
            return 4;
        }
    }
    inQuadrant(quadrant) {
        switch (quadrant) {
            case 1:
                return this.x >= 0 && this.y >= 0;
            case 2:
                return this.x <= 0 && this.y >= 0;
            case 3:
                return this.x <= 0 && this.y <= 0;
            case 4:
                return this.x >= 0 && this.y <= 0;
            default:
                return false;
        }
    }
    static inQuadrant(v, quadrant) {
        switch (quadrant) {
            case 1:
                return v.x >= 0 && v.y >= 0;
            case 2:
                return v.x <= 0 && v.y >= 0;
            case 3:
                return v.x <= 0 && v.y <= 0;
            case 4:
                return v.x >= 0 && v.y <= 0;
            default:
                return false;
        }
    }
    // unary 一元运算
    neg() {
        return new Vector(-this.x, -this.y);
    }
    negX() {
        return new Vector(-this.x, this.y);
    }
    negY() {
        return new Vector(this.x, -this.y);
    }
    toNeg() {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }
    toNegX() {
        this.x = -this.x;
        return this;
    }
    toNegY() {
        this.y = -this.y;
        return this;
    }
    static neg(v) {
        return new Vector(-v.x, -v.y);
    }
    abs() {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    }
    toAbs() {
        this.x = Math.abs(this.x);
        this.y = Math.abs(this.y);
        return this;
    }
    static abs(v) {
        return new Vector(Math.abs(v.x), Math.abs(v.y));
    }
    floor() {
        return new Vector(Math.floor(this.x), Math.floor(this.y));
    }
    toFloor() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this;
    }
    static floor(v) {
        return new Vector(Math.floor(v.x), Math.floor(v.y));
    }
    ceil() {
        return new Vector(Math.ceil(this.x), Math.ceil(this.y));
    }
    toCeil() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this;
    }
    static ceil(v) {
        return new Vector(Math.ceil(v.x), Math.ceil(v.y));
    }
    round() {
        return new Vector(Math.round(this.x), Math.round(this.y));
    }
    toRound() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this;
    }
    static round(v) {
        return new Vector(Math.round(v.x), Math.round(v.y));
    }
}
Object.defineProperty(Vector, "normalize", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.norm
});
Object.defineProperty(Vector, "orth", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.orthogonalProjection
});
Object.defineProperty(Vector, "orthogonalProjectionLength", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.orthogonalProjectionScalar
});
Object.defineProperty(Vector, "orthLen", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.orthogonalProjectionScalar
});
Object.defineProperty(Vector, "projectionHorizontal", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.projection
});
Object.defineProperty(Vector, "projH", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.projection
});
Object.defineProperty(Vector, "proj", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.projection
});
Object.defineProperty(Vector, "projectionLength", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.projectionScalar
});
Object.defineProperty(Vector, "projLenH", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.projectionScalar
});
Object.defineProperty(Vector, "projectionVertical", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.rejection
});
Object.defineProperty(Vector, "projV", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.rejection
});
Object.defineProperty(Vector, "oproj", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.rejection
});
Object.defineProperty(Vector, "rejectionLength", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.rejectionScalar
});
Object.defineProperty(Vector, "projLenV", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.rejectionScalar
});
Object.defineProperty(Vector, "angleRad", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.angle
});
Object.defineProperty(Vector, "angleToRad", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.angleTo
});
Object.defineProperty(Vector, "rotateRad", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: Vector.rotate
});
// constants 常量
Object.defineProperty(Vector, "ZERO", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new VectorConstant(0, 0)
});
Object.defineProperty(Vector, "UNIT_X", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new VectorConstant(1, 0)
});
Object.defineProperty(Vector, "UNIT_Y", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new VectorConstant(0, 1)
});
export default Vector;
export { Vector, VectorConstant, VectorPlot, VectorPlotConstant, Vector3D, };
