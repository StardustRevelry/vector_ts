import Vector, {VectorLike} from './index';

export class VectorPlotConstant {
  readonly theta: number;
  readonly r: number;

  // constructors 构造函数

  constructor(theta: number, r: number) {
    this.theta = theta;
    this.r = r;
  }

  static fromCoords(v: VectorLike): VectorPlot {
    const {x, y} = v;
    const theta = Math.atan2(y, x);
    const r = Math.sqrt(x ** 2 + y ** 2);
    return new VectorPlot(theta, r);
  }

  static fromArray(arr: number[]): VectorPlot {
    const theta = arr[0] || 0;
    const r = arr[1] || 0;
    return new VectorPlot(theta, r);
  }

  static fromObj(obj: VectorPlotLike): VectorPlot {
    const theta = obj.theta;
    const r = obj.r;
    return new VectorPlot(theta, r);
  }

  static fromJson(json: string): VectorPlot {
    const obj = JSON.parse(json);
    return VectorPlot.fromObj(obj);
  }

  // randomize 随机函数

  static randomize(topLeft:VectorLike|VectorPlotLike, bottomRight:VectorLike|VectorPlotLike): VectorPlot {
    if ("r" in topLeft && "theta" in topLeft) {
      topLeft = Vector.fromPlot(topLeft)
    }
    if ("r" in bottomRight && "theta" in bottomRight) {
      bottomRight = Vector.fromPlot(bottomRight)
    }
    return VectorPlot.fromCoords(Vector.randomize(topLeft, bottomRight));
  }

  static randomizeCircle(center:VectorLike|VectorPlotLike, radius:number): VectorPlot {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radius;
    if ("x" in center && "y" in center) {
      center = VectorPlot.fromCoords(center);
    }
    return new VectorPlot(angle, r).add(center);
  }

  static randomizeUnit(): VectorPlot {
    return new VectorPlot(Math.random() * Math.PI * 2, 1);
  }

  // utils 工具函数

  stringify(): string {
    return JSON.stringify(this);
  }
  toString = this.stringify;

  toObject(): VectorPlotLike {
    return {theta: this.theta, r: this.r};
  }

  clone(): VectorPlot {
    return new VectorPlot(this.theta, this.r);
  }
}

export default class VectorPlot {
  theta: number;
  r: number;

  // constructors 构造函数

  constructor(theta: number, r: number) {
    this.theta = theta;
    this.r = r;
    this.toStandard()
  }

  static fromCoords(v: VectorLike): VectorPlot {
    const {x, y} = v;
    const theta = Math.atan2(y, x);
    const r = Math.sqrt(x ** 2 + y ** 2);
    return new VectorPlot(theta, r);
  }

  static fromArray(arr: number[]): VectorPlot {
    const theta = arr[0] || 0;
    const r = arr[1] || 0;
    return new VectorPlot(theta, r);
  }

  static fromObj(obj: VectorPlotLike): VectorPlot {
    const theta = obj.theta;
    const r = obj.r;
    return new VectorPlot(theta, r);
  }

  static fromJson(json: string): VectorPlot {
    const obj = JSON.parse(json);
    return VectorPlot.fromObj(obj);
  }

  // randomize 随机函数

  static randomize(topLeft:VectorLike|VectorPlotLike, bottomRight:VectorLike|VectorPlotLike): VectorPlot {
    if ("r" in topLeft && "theta" in topLeft) {
      topLeft = Vector.fromPlot(topLeft)
    }
    if ("r" in bottomRight && "theta" in bottomRight) {
      bottomRight = Vector.fromPlot(bottomRight)
    }
    return VectorPlot.fromCoords(Vector.randomize(topLeft, bottomRight));
  }

  static randomizeCircle(center:VectorLike|VectorPlotLike, radius:number): VectorPlot {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radius;
    if ("x" in center && "y" in center) {
      center = VectorPlot.fromCoords(center);
    }
    return new VectorPlot(angle, r).add(center);
  }

  static randomizeUnit(): VectorPlot {
    return new VectorPlot(Math.random() * Math.PI * 2, 1);
  }

  // utils 工具函数

  stringify(): string {
    return JSON.stringify(this);
  }
  toString = this.stringify;

  toObject(): VectorPlotLike {
    return {theta: this.theta, r: this.r};
  }

  toStandard(): VectorPlot {
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

  clone(): VectorPlot {
    return new VectorPlot(this.theta, this.r);
  }

  copy(v:VectorPlotLike): VectorPlot {
    this.r = v.r;
    this.theta = v.theta;
    return this.toStandard()
  }

  // math 数学函数
  add(v: VectorPlotLike): VectorPlot {
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

  static add(v1: VectorPlotLike, v2: VectorPlotLike): VectorPlot {
    const x1 = v1.r * Math.cos(v1.theta);
    const y1 = v1.r * Math.sin(v1.theta);
    const x2 = v2.r * Math.cos(v2.theta);
    const y2 = v2.r * Math.sin(v2.theta);
    const x = x1 + x2;
    const y = y1 + y2;
    return new VectorPlot(Math.atan2(y, x), Math.sqrt(x ** 2 + y ** 2));
  }

  sub(v: VectorPlotLike): VectorPlot {
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

  static sub(v1: VectorPlotLike, v2: VectorPlotLike): VectorPlot {
    const x1 = v1.r * Math.cos(v1.theta);
    const y1 = v1.r * Math.sin(v1.theta);
    const x2 = v2.r * Math.cos(v2.theta);
    const y2 = v2.r * Math.sin(v2.theta);
    const x = x1 - x2;
    const y = y1 - y2;
    return new VectorPlot(Math.atan2(y, x), Math.sqrt(x ** 2 + y ** 2));
  }

  mul(n: number): VectorPlot {
    this.r *= n;
    return this.toStandard();
  }

  static mul(v: VectorPlotLike, n: number): VectorPlot {
    return new VectorPlot(v.theta, v.r * n);
  }

  div(n: number): VectorPlot {
    this.r /= n;
    return this.toStandard();
  }

  static div(v: VectorPlotLike, n: number): VectorPlot {
    return new VectorPlot(v.theta, v.r / n);
  }

  scale(n: number): VectorPlot {
    const scale = n / this.r;
    this.r *= scale;
    return this.toStandard();
  }

  static scale(v: VectorPlotLike, n: number): VectorPlot {
    const scale = n / v.r;
    return new VectorPlot(v.theta, v.r * scale);
  }

  limit(n: number): VectorPlot {
    this.toStandard()
    n = Math.abs(n);
    if (this.r > n) {
      this.r = n;
    }
    return this;
  }

  static limit(v: VectorPlotLike, n: number): VectorPlot {
    const scale = n / v.r;
    return new VectorPlot(v.theta, v.r * scale);
  }

  mix(v: VectorPlotLike, alpha: number): VectorPlot {
    this.r = (1-alpha) * this.r + alpha * v.r;
    this.theta = (1-alpha) * this.theta + alpha * v.theta;
    return this.toStandard();
  }

  static mix(v1: VectorPlotLike, v2: VectorPlotLike, alpha: number): VectorPlot {
    const r = (1-alpha) * v1.r + alpha * v2.r;
    const theta = (1-alpha) * v1.theta + alpha * v2.theta;
    return new VectorPlot(theta, r);
  }

  norm(): VectorPlot {
    this.r = 1;
    return this;
  }
  normalize = this.norm;

  static norm(v: VectorPlotLike): VectorPlot {
    return new VectorPlot(v.theta, 1);
  }
  static normalize = VectorPlot.norm;

  distance(v: VectorPlotLike): number {
    return VectorPlot.sub(this, v).r;
  }
  distanceSq(v: VectorPlotLike): number {
    const x1 = this.r * Math.cos(this.theta);
    const y1 = this.r * Math.sin(this.theta);
    const x2 = v.r * Math.cos(v.theta);
    const y2 = v.r * Math.sin(v.theta);
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
  }

  static distance(v1: VectorPlotLike, v2: VectorPlotLike): number {
    return VectorPlot.sub(v1, v2).r;
  }
  static distanceSq(v1: VectorPlotLike, v2: VectorPlotLike): number {
    const x1 = v1.r * Math.cos(v1.theta);
    const y1 = v1.r * Math.sin(v1.theta);
    const x2 = v2.r * Math.cos(v2.theta);
    const y2 = v2.r * Math.sin(v2.theta);
    return (x1 - x2) ** 2 + (y1 - y2) ** 2;
  }

  dot(v: VectorPlotLike): number {
    return this.r * v.r * Math.cos(this.theta - v.theta);
  }

  static dot(v1: VectorPlotLike, v2: VectorPlotLike): number {
    return v1.r * v2.r * Math.cos(v1.theta - v2.theta);
  }

  cross(v: VectorPlotLike): number {
    return this.r * v.r * Math.sin(this.theta - v.theta);
  }

  static cross(v1: VectorPlotLike, v2: VectorPlotLike): number {
    return v1.r * v2.r * Math.sin(v1.theta - v2.theta);
  }

  // projection 投影函数

  orthogonalProjection(v?: VectorPlotLike): VectorPlot[] {
    v = v || VectorPlot.UNIT;

    const d_theta = this.theta - v.theta;
    return [new VectorPlot(v.theta, this.r*Math.cos(d_theta)),
            new VectorPlot(v.theta+Math.PI*0.5, this.r*Math.sin(d_theta))];
  }
  orth = this.orthogonalProjection;

  orthogonalProjectionScalar(v?: VectorPlotLike): number[] {
    v = v || VectorPlot.UNIT;

    const d_theta = this.theta - v.theta;
    return [this.r*Math.cos(d_theta),
            this.r*Math.sin(d_theta)];
  }
  orthogonalProjectionLength = this.orthogonalProjectionScalar;
  orthLen = this.orthogonalProjectionScalar;

  static orthogonalProjection(v1: VectorPlotLike, v2?: VectorPlotLike): VectorPlot[] {
    v2 = v2 || VectorPlot.UNIT;

    const d_theta = v1.theta - v2.theta;
    return [new VectorPlot(v2.theta, v1.r*Math.cos(d_theta)),
            new VectorPlot(v2.theta+Math.PI*0.5, v1.r*Math.sin(d_theta))];
  }
  static orth = VectorPlot.orthogonalProjection;

  static orthogonalProjectionScalar(v1: VectorPlotLike, v2?: VectorPlotLike): number[] {
    v2 = v2 || VectorPlot.UNIT;

    const d_theta = v1.theta - v2.theta;
    return [v1.r*Math.cos(d_theta),
            v1.r*Math.sin(d_theta)];
  }
  static orthogonalProjectionLength = VectorPlot.orthogonalProjectionScalar;
  static orthLen = VectorPlot.orthogonalProjectionScalar;

  projection(v?: VectorPlotLike): VectorPlot {
    v = v || VectorPlot.UNIT;

    const d_theta = this.theta - v.theta;
    return new VectorPlot(v.theta, this.r*Math.cos(d_theta));
  }
  projectionHorizontal = this.projection;
  projH = this.projection;
  proj = this.projection;

  projectionScalar(v?: VectorPlotLike): number {
    v = v || VectorPlot.UNIT;

    const d_theta = this.theta - v.theta;
    return this.r*Math.cos(d_theta);
  }
  projectionLength = this.projectionScalar;
  projLenH = this.projectionScalar;

  static projection(v1: VectorPlotLike, v2?: VectorPlotLike): VectorPlot {
    v2 = v2 || VectorPlot.UNIT;

    const d_theta = v1.theta - v2.theta;
    return new VectorPlot(v2.theta, v1.r*Math.cos(d_theta));
  }
  static projectionHorizontal = VectorPlot.projection;
  static projH = VectorPlot.projection;
  static proj = VectorPlot.projection;

  static projectionScalar(v1: VectorPlotLike, v2?: VectorPlotLike): number {
    v2 = v2 || VectorPlot.UNIT;

    const d_theta = v1.theta - v2.theta;
    return v1.r*Math.cos(d_theta);
  }
  static projectionLength = VectorPlot.projectionScalar;
  static projLenH = VectorPlot.projectionScalar;

  rejection(v: VectorPlotLike): VectorPlot {
    v = v || VectorPlot.UNIT;

    const d_theta = this.theta - v.theta;
    return new VectorPlot(v.theta, this.r*Math.sin(d_theta));
  }
  projectionVertical = this.rejection;
  projV = this.rejection;
  oproj = this.rejection;

  rejectionScalar(v: VectorPlotLike): number {
    v = v || VectorPlot.UNIT;

    const d_theta = this.theta - v.theta;
    return this.r*Math.sin(d_theta);
  }
  rejectionLength = this.rejectionScalar;
  projLenV = this.rejectionScalar;

  static rejection(v1: VectorPlotLike, v2?: VectorPlotLike): VectorPlot {
    v2 = v2 || VectorPlot.UNIT;

    const d_theta = v1.theta - v2.theta;
    return new VectorPlot(v2.theta, v1.r*Math.sin(d_theta));
  }
  static projectionVertical = VectorPlot.rejection;
  static projV = VectorPlot.rejection;
  static oproj = VectorPlot.rejection;

  static rejectionScalar(v1: VectorPlotLike, v2?: VectorPlotLike): number {
    v2 = v2 || VectorPlot.UNIT;

    const d_theta = v1.theta - v2.theta;
    return v1.r*Math.sin(d_theta);
  }
  static rejectionLength = VectorPlot.rejectionScalar;
  static projLenV = VectorPlot.rejectionScalar;

  // angle 角度运算

  thetaDeg() {
    return radToDeg(this.theta);
  }
  thetaRad() {
    return this.theta;
  }

  static thetaDeg(v: VectorPlotLike) {
    return radToDeg(v.theta);
  }
  static thetaRad(v: VectorPlotLike) {
    return v.theta;
  }

  angleTo(v: VectorPlotLike) {
    const d_theta = v.theta - this.theta;
    return standardizeTheta(d_theta);
  }
  angleToRad = this.angleTo;
  angleToDeg(v: VectorPlotLike) {
    const d_theta = v.theta - this.theta;
    const std_theta = standardizeTheta(d_theta);
    return radToDeg(std_theta);
  };

  static angleTo(v1: VectorPlotLike, v2: VectorPlotLike):number {
    const d_theta = v2.theta - v1.theta;
    return standardizeTheta(d_theta);
  }
  static angleToRad = VectorPlot.angleTo;
  static angleToDeg(v1: VectorPlotLike, v2: VectorPlotLike):number {
    const d_theta = v2.theta - v1.theta;
    const std_theta = standardizeTheta(d_theta);
    return radToDeg(std_theta);
  }

  rotate(angle: number) {
    this.theta += angle;
    return this;
  }
  rotateRad = this.rotate;
  rotateDeg(angle: number) {
    this.theta += degToRad(angle)
    return this;
  }
  rotateVert() {
    this.theta += Math.PI*0.5;
    return this;
  }

  static rotate(v: VectorPlotLike, angle: number):VectorPlot {
    v.theta += angle;
    return new VectorPlot(v.theta, v.r);
  }
  static rotateRad = VectorPlot.rotate;
  static rotateDeg(v: VectorPlotLike, angle: number):VectorPlot {
    v.theta += degToRad(angle)
    return new VectorPlot(v.theta, v.r);
  };
  static rotateVert(v: VectorPlotLike):VectorPlot {
    v.theta += Math.PI*0.5;
    return new VectorPlot(v.theta, v.r);
  };

  rotateTo(v: VectorPlotLike | number) {
    if (typeof v === 'number') {
      this.theta = v;
    }
    else {
      this.theta = v.theta;
    }
    return this;
  }
  rotateToRad(angle: number) {
   this.theta = angle;
   return this;
  }
  rotateToDeg(angle: number) {
   this.theta = degToRad(angle);
   return this;
  }

  static rotateTo(v1: VectorPlotLike, v2: VectorPlotLike | number):VectorPlot {
    const v = VectorPlot.fromObj(v1)
    if (typeof v2 === 'number') {
      v.theta = v2;
    }
    else {
      v.theta = v2.theta;
    }
    return v;
  }
  static rotateToRad(v1: VectorPlotLike, angle: number):VectorPlot {
    return new VectorPlot(angle, v1.r);
  };
  static rotateToDeg(v1: VectorPlotLike, angle: number):VectorPlot {
    return new VectorPlot(degToRad(angle), v1.r);
  };

  // comparison 比较运算

  inRange(v: VectorPlot, range: number) {
    return VectorPlot.sub(this, v).r < range;
  }

  static inRange(v1: VectorPlotLike, v2: VectorPlotLike, range:number) {
    return VectorPlot.sub(v1, v2).r < range;
  }

  quadrant() {
    const t = standardizeTheta(this.theta)+Math.PI; // [0, 2pi)
    return Math.floor(t / (Math.PI * 0.5)) + 1;
  }

  static quadrant(v: VectorPlotLike) {
    const t = standardizeTheta(v.theta)+Math.PI; // [0, 2pi)
    return Math.floor(t / (Math.PI * 0.5)) + 1;
  }

  // unary 单目运算

  neg() {
    return new VectorPlot(this.theta, -this.r);
  }

  static neg(v: VectorPlotLike) {
    return new VectorPlot(v.theta, -v.r);
  }

  //constants 常量

  static readonly ZERO = new VectorPlotConstant(0,0);
  static readonly UNIT = new VectorPlotConstant(0,1);
}

function standardizeTheta(theta: number): number {
  const circles = (theta+Math.PI) / (Math.PI * 2);
  const circle = circles % 1;
  if (circle < 0) {
    theta = (0.5+circle) * Math.PI * 2; // = (1+circles) * Math.PI * 2 - Math.PI;
  }
  else {
    theta = (circle-0.5) * Math.PI * 2; // = circle * Math.PI * 2 - Math.PI;
  }
  return theta;
}

function radToDeg(theta: number): number {
  return theta * 180 / Math.PI;
}

function degToRad(theta: number): number {
  return theta * Math.PI / 180;
}

export interface VectorPlotLike {
  theta: number;
  r: number;
}