import Vector from './index';
export class VectorPlotConstant {
    // constructors 构造函数
    constructor(theta, r) {
        Object.defineProperty(this, "theta", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "r", {
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
        this.theta = theta;
        this.r = r;
    }
    static fromCoords(v) {
        const { x, y } = v;
        const theta = Math.atan2(y, x);
        const r = Math.sqrt(x ** 2 + y ** 2);
        return new VectorPlot(theta, r);
    }
    static fromArray(arr) {
        const theta = arr[0] || 0;
        const r = arr[1] || 0;
        return new VectorPlot(theta, r);
    }
    static fromObj(obj) {
        const theta = obj.theta;
        const r = obj.r;
        return new VectorPlot(theta, r);
    }
    static fromJson(json) {
        const obj = JSON.parse(json);
        return VectorPlot.fromObj(obj);
    }
    // randomize 随机函数
    static randomize(topLeft, bottomRight) {
        if ("r" in topLeft && "theta" in topLeft) {
            topLeft = Vector.fromPlot(topLeft);
        }
        if ("r" in bottomRight && "theta" in bottomRight) {
            bottomRight = Vector.fromPlot(bottomRight);
        }
        return VectorPlot.fromCoords(Vector.randomize(topLeft, bottomRight));
    }
    static randomizeCircle(center, radius) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * radius;
        if ("x" in center && "y" in center) {
            center = VectorPlot.fromCoords(center);
        }
        return new VectorPlot(angle, r).add(center);
    }
    static randomizeUnit() {
        return new VectorPlot(Math.random() * Math.PI * 2, 1);
    }
    // utils 工具函数
    stringify() {
        return JSON.stringify(this);
    }
    toObject() {
        return { theta: this.theta, r: this.r };
    }
    clone() {
        return new VectorPlot(this.theta, this.r);
    }
}
class VectorPlot {
    // constructors 构造函数
    constructor(theta, r) {
        Object.defineProperty(this, "theta", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "r", {
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
        this.theta = theta;
        this.r = r;
        this.toStandard();
    }
    static fromCoords(v) {
        const { x, y } = v;
        const theta = Math.atan2(y, x);
        const r = Math.sqrt(x ** 2 + y ** 2);
        return new VectorPlot(theta, r);
    }
    static fromArray(arr) {
        const theta = arr[0] || 0;
        const r = arr[1] || 0;
        return new VectorPlot(theta, r);
    }
    static fromObj(obj) {
        const theta = obj.theta;
        const r = obj.r;
        return new VectorPlot(theta, r);
    }
    static fromJson(json) {
        const obj = JSON.parse(json);
        return VectorPlot.fromObj(obj);
    }
    // randomize 随机函数
    static randomize(topLeft, bottomRight) {
        if ("r" in topLeft && "theta" in topLeft) {
            topLeft = Vector.fromPlot(topLeft);
        }
        if ("r" in bottomRight && "theta" in bottomRight) {
            bottomRight = Vector.fromPlot(bottomRight);
        }
        return VectorPlot.fromCoords(Vector.randomize(topLeft, bottomRight));
    }
    static randomizeCircle(center, radius) {
        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * radius;
        if ("x" in center && "y" in center) {
            center = VectorPlot.fromCoords(center);
        }
        return new VectorPlot(angle, r).add(center);
    }
    static randomizeUnit() {
        return new VectorPlot(Math.random() * Math.PI * 2, 1);
    }
    // utils 工具函数
    stringify() {
        return JSON.stringify(this);
    }
    toObject() {
        return { theta: this.theta, r: this.r };
    }
    toStandard() {
        // Standard: r>0, theta in [-pi, pi)
        if (this.r < 0) {
            this.r = -this.r;
            this.theta += Math.PI;
        }
        if (this.theta >= -Math.PI && this.theta < Math.PI) {
            return this;
        }
        // theta not in [-pi, pi)
        this.theta = standardizeTheta(this.theta);
        return this;
    }
    clone() {
        return new VectorPlot(this.theta, this.r);
    }
    copy(v) {
        this.r = v.r;
        this.theta = v.theta;
        return this.toStandard();
    }
    // math 数学函数
    add(v) {
        const x1 = this.r * Math.cos(this.theta);
        const y1 = this.r * Math.sin(this.theta);
        const x2 = v.r * Math.cos(v.theta);
        const y2 = v.r * Math.sin(v.theta);
        const x = x1 + x2;
        const y = y1 + y2;
        this.theta = Math.atan2(y, x);
        this.r = Math.sqrt(x ** 2 + y ** 2);
        return this.toStandard();
    }
    static add(v1, v2) {
        const x1 = v1.r * Math.cos(v1.theta);
        const y1 = v1.r * Math.sin(v1.theta);
        const x2 = v2.r * Math.cos(v2.theta);
        const y2 = v2.r * Math.sin(v2.theta);
        const x = x1 + x2;
        const y = y1 + y2;
        return new VectorPlot(Math.atan2(y, x), Math.sqrt(x ** 2 + y ** 2));
    }
    sub(v) {
        const x1 = this.r * Math.cos(this.theta);
        const y1 = this.r * Math.sin(this.theta);
        const x2 = v.r * Math.cos(v.theta);
        const y2 = v.r * Math.sin(v.theta);
        const x = x1 - x2;
        const y = y1 - y2;
        this.theta = Math.atan2(y, x);
        this.r = Math.sqrt(x ** 2 + y ** 2);
        return this.toStandard();
    }
    static sub(v1, v2) {
        const x1 = v1.r * Math.cos(v1.theta);
        const y1 = v1.r * Math.sin(v1.theta);
        const x2 = v2.r * Math.cos(v2.theta);
        const y2 = v2.r * Math.sin(v2.theta);
        const x = x1 - x2;
        const y = y1 - y2;
        return new VectorPlot(Math.atan2(y, x), Math.sqrt(x ** 2 + y ** 2));
    }
    mul(n) {
        this.r *= n;
        return this.toStandard();
    }
    static mul(v, n) {
        return new VectorPlot(v.theta, v.r * n);
    }
    div(n) {
        this.r /= n;
        return this.toStandard();
    }
    static div(v, n) {
        return new VectorPlot(v.theta, v.r / n);
    }
    scale(n) {
        const scale = n / this.r;
        this.r *= scale;
        return this.toStandard();
    }
    static scale(v, n) {
        const scale = n / v.r;
        return new VectorPlot(v.theta, v.r * scale);
    }
    limit(n) {
        this.toStandard();
        n = Math.abs(n);
        if (this.r > n) {
            this.r = n;
        }
        return this;
    }
    static limit(v, n) {
        const scale = n / v.r;
        return new VectorPlot(v.theta, v.r * scale);
    }
    mix(v, alpha) {
        this.r = (1 - alpha) * this.r + alpha * v.r;
        this.theta = (1 - alpha) * this.theta + alpha * v.theta;
        return this.toStandard();
    }
    static mix(v1, v2, alpha) {
        const r = (1 - alpha) * v1.r + alpha * v2.r;
        const theta = (1 - alpha) * v1.theta + alpha * v2.theta;
        return new VectorPlot(theta, r);
    }
    norm() {
        this.r = 1;
        return this;
    }
    static norm(v) {
        return new VectorPlot(v.theta, 1);
    }
    distance(v) {
        return VectorPlot.sub(this, v).r;
    }
    distanceSq(v) {
        const x1 = this.r * Math.cos(this.theta);
        const y1 = this.r * Math.sin(this.theta);
        const x2 = v.r * Math.cos(v.theta);
        const y2 = v.r * Math.sin(v.theta);
        return (x1 - x2) ** 2 + (y1 - y2) ** 2;
    }
    static distance(v1, v2) {
        return VectorPlot.sub(v1, v2).r;
    }
    static distanceSq(v1, v2) {
        const x1 = v1.r * Math.cos(v1.theta);
        const y1 = v1.r * Math.sin(v1.theta);
        const x2 = v2.r * Math.cos(v2.theta);
        const y2 = v2.r * Math.sin(v2.theta);
        return (x1 - x2) ** 2 + (y1 - y2) ** 2;
    }
    dot(v) {
        return this.r * v.r * Math.cos(this.theta - v.theta);
    }
    static dot(v1, v2) {
        return v1.r * v2.r * Math.cos(v1.theta - v2.theta);
    }
    cross(v) {
        return this.r * v.r * Math.sin(this.theta - v.theta);
    }
    static cross(v1, v2) {
        return v1.r * v2.r * Math.sin(v1.theta - v2.theta);
    }
    // projection 投影函数
    orthogonalProjection(v) {
        v = v || VectorPlot.UNIT;
        const d_theta = this.theta - v.theta;
        return [new VectorPlot(v.theta, this.r * Math.cos(d_theta)),
            new VectorPlot(v.theta + Math.PI * 0.5, this.r * Math.sin(d_theta))];
    }
    orthogonalProjectionScalar(v) {
        v = v || VectorPlot.UNIT;
        const d_theta = this.theta - v.theta;
        return [this.r * Math.cos(d_theta),
            this.r * Math.sin(d_theta)];
    }
    static orthogonalProjection(v1, v2) {
        v2 = v2 || VectorPlot.UNIT;
        const d_theta = v1.theta - v2.theta;
        return [new VectorPlot(v2.theta, v1.r * Math.cos(d_theta)),
            new VectorPlot(v2.theta + Math.PI * 0.5, v1.r * Math.sin(d_theta))];
    }
    static orthogonalProjectionScalar(v1, v2) {
        v2 = v2 || VectorPlot.UNIT;
        const d_theta = v1.theta - v2.theta;
        return [v1.r * Math.cos(d_theta),
            v1.r * Math.sin(d_theta)];
    }
    projection(v) {
        v = v || VectorPlot.UNIT;
        const d_theta = this.theta - v.theta;
        return new VectorPlot(v.theta, this.r * Math.cos(d_theta));
    }
    projectionScalar(v) {
        v = v || VectorPlot.UNIT;
        const d_theta = this.theta - v.theta;
        return this.r * Math.cos(d_theta);
    }
    static projection(v1, v2) {
        v2 = v2 || VectorPlot.UNIT;
        const d_theta = v1.theta - v2.theta;
        return new VectorPlot(v2.theta, v1.r * Math.cos(d_theta));
    }
    static projectionScalar(v1, v2) {
        v2 = v2 || VectorPlot.UNIT;
        const d_theta = v1.theta - v2.theta;
        return v1.r * Math.cos(d_theta);
    }
    rejection(v) {
        v = v || VectorPlot.UNIT;
        const d_theta = this.theta - v.theta;
        return new VectorPlot(v.theta, this.r * Math.sin(d_theta));
    }
    rejectionScalar(v) {
        v = v || VectorPlot.UNIT;
        const d_theta = this.theta - v.theta;
        return this.r * Math.sin(d_theta);
    }
    static rejection(v1, v2) {
        v2 = v2 || VectorPlot.UNIT;
        const d_theta = v1.theta - v2.theta;
        return new VectorPlot(v2.theta, v1.r * Math.sin(d_theta));
    }
    static rejectionScalar(v1, v2) {
        v2 = v2 || VectorPlot.UNIT;
        const d_theta = v1.theta - v2.theta;
        return v1.r * Math.sin(d_theta);
    }
    // angle 角度运算
    thetaDeg() {
        return radToDeg(this.theta);
    }
    thetaRad() {
        return this.theta;
    }
    static thetaDeg(v) {
        return radToDeg(v.theta);
    }
    static thetaRad(v) {
        return v.theta;
    }
    angleTo(v) {
        const d_theta = v.theta - this.theta;
        return standardizeTheta(d_theta);
    }
    angleToDeg(v) {
        const d_theta = v.theta - this.theta;
        const std_theta = standardizeTheta(d_theta);
        return radToDeg(std_theta);
    }
    ;
    static angleTo(v1, v2) {
        const d_theta = v2.theta - v1.theta;
        return standardizeTheta(d_theta);
    }
    static angleToDeg(v1, v2) {
        const d_theta = v2.theta - v1.theta;
        const std_theta = standardizeTheta(d_theta);
        return radToDeg(std_theta);
    }
    rotate(angle) {
        this.theta += angle;
        return this;
    }
    rotateDeg(angle) {
        this.theta += degToRad(angle);
        return this;
    }
    rotateVert() {
        this.theta += Math.PI * 0.5;
        return this;
    }
    static rotate(v, angle) {
        v.theta += angle;
        return new VectorPlot(v.theta, v.r);
    }
    static rotateDeg(v, angle) {
        v.theta += degToRad(angle);
        return new VectorPlot(v.theta, v.r);
    }
    ;
    static rotateVert(v) {
        v.theta += Math.PI * 0.5;
        return new VectorPlot(v.theta, v.r);
    }
    ;
    rotateTo(v) {
        if (typeof v === 'number') {
            this.theta = v;
        }
        else {
            this.theta = v.theta;
        }
        return this;
    }
    rotateToRad(angle) {
        this.theta = angle;
        return this;
    }
    rotateToDeg(angle) {
        this.theta = degToRad(angle);
        return this;
    }
    static rotateTo(v1, v2) {
        const v = VectorPlot.fromObj(v1);
        if (typeof v2 === 'number') {
            v.theta = v2;
        }
        else {
            v.theta = v2.theta;
        }
        return v;
    }
    static rotateToRad(v1, angle) {
        return new VectorPlot(angle, v1.r);
    }
    ;
    static rotateToDeg(v1, angle) {
        return new VectorPlot(degToRad(angle), v1.r);
    }
    ;
    // comparison 比较运算
    inRange(v, range) {
        return VectorPlot.sub(this, v).r < range;
    }
    static inRange(v1, v2, range) {
        return VectorPlot.sub(v1, v2).r < range;
    }
    quadrant() {
        const t = standardizeTheta(this.theta) + Math.PI; // [0, 2pi)
        return Math.floor(t / (Math.PI * 0.5)) + 1;
    }
    static quadrant(v) {
        const t = standardizeTheta(v.theta) + Math.PI; // [0, 2pi)
        return Math.floor(t / (Math.PI * 0.5)) + 1;
    }
    // unary 单目运算
    neg() {
        return new VectorPlot(this.theta, -this.r);
    }
    static neg(v) {
        return new VectorPlot(v.theta, -v.r);
    }
}
Object.defineProperty(VectorPlot, "normalize", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.norm
});
Object.defineProperty(VectorPlot, "orth", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.orthogonalProjection
});
Object.defineProperty(VectorPlot, "orthogonalProjectionLength", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.orthogonalProjectionScalar
});
Object.defineProperty(VectorPlot, "orthLen", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.orthogonalProjectionScalar
});
Object.defineProperty(VectorPlot, "projectionHorizontal", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.projection
});
Object.defineProperty(VectorPlot, "projH", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.projection
});
Object.defineProperty(VectorPlot, "proj", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.projection
});
Object.defineProperty(VectorPlot, "projectionLength", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.projectionScalar
});
Object.defineProperty(VectorPlot, "projLenH", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.projectionScalar
});
Object.defineProperty(VectorPlot, "projectionVertical", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.rejection
});
Object.defineProperty(VectorPlot, "projV", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.rejection
});
Object.defineProperty(VectorPlot, "oproj", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.rejection
});
Object.defineProperty(VectorPlot, "rejectionLength", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.rejectionScalar
});
Object.defineProperty(VectorPlot, "projLenV", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.rejectionScalar
});
Object.defineProperty(VectorPlot, "angleToRad", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.angleTo
});
Object.defineProperty(VectorPlot, "rotateRad", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: VectorPlot.rotate
});
//constants 常量
Object.defineProperty(VectorPlot, "ZERO", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new VectorPlotConstant(0, 0)
});
Object.defineProperty(VectorPlot, "UNIT", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new VectorPlotConstant(0, 1)
});
export default VectorPlot;
function standardizeTheta(theta) {
    const circles = (theta + Math.PI) / (Math.PI * 2);
    const circle = circles % 1;
    if (circle < 0) {
        theta = (0.5 + circle) * Math.PI * 2; // = (1+circles) * Math.PI * 2 - Math.PI;
    }
    else {
        theta = (circle - 0.5) * Math.PI * 2; // = circle * Math.PI * 2 - Math.PI;
    }
    return theta;
}
function radToDeg(theta) {
    return theta * 180 / Math.PI;
}
function degToRad(theta) {
    return theta * Math.PI / 180;
}
