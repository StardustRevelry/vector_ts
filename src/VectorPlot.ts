import Vector, {VectorLike} from './index';

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
    // Standard: r>0, theta in [0, 2pi)
    if (this.r < 0) {
      this.r = -this.r;
      this.theta += Math.PI;
    }
    if (this.theta >= 0 && this.theta < 2*Math.PI) {
      return this;
    }
    // theta not in [0, 2pi)
    const circles = this.theta / (Math.PI * 2);
    const circle = circles % 1;
    if (circle < 0) {
      this.theta = (1+circle) * Math.PI * 2;
    }
    else {
      this.theta = circle * Math.PI * 2;
    }
    return this;
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
}

export interface VectorPlotLike {
  theta: number;
  r: number;
}