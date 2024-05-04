import VectorPlot, {VectorPlotConstant, VectorPlotLike} from "./VectorPlot";
import Vector3D, {Vector3DLike} from "./Vector3D";

class VectorConstant {
  readonly x: number;
  readonly y: number;

  constructor(x: number, y: number){
    this.x = x;
    this.y = y;
  }

  static fromPlot(plot: VectorPlotLike): VectorConstant {
    const {theta, r} = plot;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    return new VectorConstant(x, y);
  }

  static fromAngle(angle: number): VectorConstant {
    return new VectorConstant(Math.cos(angle), Math.sin(angle));
  }

  static fromArray(arr: number[]): VectorConstant {
    const x = arr[0] || 0;
    const y = arr[1] || 0;
    return new VectorConstant(x, y);
  }

  static fromObj(obj: VectorLike): VectorConstant {
    const x = obj.x || 0;
    const y = obj.y || 0;
    return new VectorConstant(x, y);
  }

  static fromJson(json: string): VectorConstant {
    const obj = JSON.parse(json);
    return VectorConstant.fromObj(obj);
  }

  stringify(): string {
    return JSON.stringify(this);
  }
  toString = this.stringify;

  toObject(): VectorLike {
    return {x: this.x, y: this.y};
  }

  toVector(): Vector {
    return new Vector(this.x, this.y);
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
}

export default class Vector {
  x: number;
  y: number;

  // constructors 构造函数

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static fromPlot(plot: VectorPlotLike): Vector {
    const {theta, r} = plot;
    const x = r * Math.cos(theta);
    const y = r * Math.sin(theta);
    return new Vector(x, y);
  }

  static fromAngle(angle: number): Vector {
    return new Vector(Math.cos(angle), Math.sin(angle));
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

  // randomize 随机函数

  static randomize(topLeft:VectorLike, bottomRight:VectorLike): Vector {
    const dimensions = Vector.sub(topLeft, bottomRight);
    const x = Math.random() * dimensions.x;
    const y = Math.random() * dimensions.y;
    return new Vector(x + topLeft.x, y + topLeft.y);
  }

  static randomizeX(topLeft:VectorLike, bottomRight:VectorLike): Vector {
    const dimensions = Vector.sub(topLeft, bottomRight);
    const x = Math.random() * dimensions.x;
    return new Vector(x + topLeft.x, topLeft.y);
  }

  static randomizeY(topLeft:VectorLike, bottomRight:VectorLike): Vector {
    const dimensions = Vector.sub(topLeft, bottomRight);
    const y = Math.random() * dimensions.y;
    return new Vector(topLeft.x, y + topLeft.y);
  }

  static randomizeCircle(center:VectorLike, radius:number): Vector {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radius;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r;
    return new Vector(x + center.x, y + center.y);
  }

  // utils 工具函数

  stringify(): string {
    return JSON.stringify(this);
  }
  toString = this.stringify;

  toObject(): VectorLike {
    return {x: this.x, y: this.y};
  }

  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  cloneX(): Vector {
    return new Vector(this.x, 0);
  }

  cloneY(): Vector {
    return new Vector(0, this.y);
  }

  copy(v: VectorLike):Vector {
    this.x = v.x;
    this.y = v.y;
    return this;
  }

  copyX(x: number | VectorLike):Vector {
    typeof x === 'number'? this.x = x : this.x = x.x;
    return this;
  }

  copyY(y: number | VectorLike):Vector {
    typeof y === 'number'? this.y = y : this.y = y.y;
    return this;
  }

  // math 数学运算

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

  static scale(v: VectorLike, len: number) {
    const scale = len / Vector.len(v);
    return new Vector(v.x * scale, v.y * scale);
  }

  limit(len: number) {
    if (this.length() > Math.abs(len)) {
      return this.scale(Math.abs(len));
    }
    return this;
  }

  limitX(x: number) {
    if (this.x > Math.abs(x)) {
      this.x = Math.abs(x);
    }
    return this;
  }

  limitY(y: number) {
    if (this.y > Math.abs(y)) {
      this.y = Math.abs(y);
    }
    return this;
  }

  mix(v: VectorLike, alpha: number) {
    alpha = Math.min(1, Math.max(0, alpha));
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
    const x = v1.x + (v2.x - v1.x) * alpha;
    const y = v1.y + (v2.y - v1.y) * alpha;
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
    const len = Vector.len(v);
    if (len === 0) {
      return new Vector(0,0);
    }
    return Vector.div(v, len);
  }
  static normalize = Vector.norm;

  length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }
  len = this.length;

  static len(v: VectorLike): number {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
  }

  lengthSq(): number {
    return this.x ** 2 + this.y ** 2;
  }

  static lengthSq(v: VectorLike): number {
    return v.x ** 2 + v.y ** 2;
  }

  distance(v: VectorLike):number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  static distance(v1: VectorLike, v2: VectorLike): number {
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return Math.sqrt(dx ** 2 + dy ** 2);
  }

  distanceSq(v: VectorLike): number {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return dx ** 2 + dy ** 2;
  }

  static distanceSq(v1: VectorLike, v2: VectorLike): number{
    const dx = v1.x - v2.x;
    const dy = v1.y - v2.y;
    return dx ** 2 + dy ** 2;
  }
  
  distanceX(v: VectorLike): number {
    return this.x - v.x;
  }
  
  static distanceX(v1: VectorLike, v2: VectorLike): number {
    return v1.x - v2.x;
  }
  
  absDistanceX(v: VectorLike): number {
    return Math.abs(this.x - v.x);
  }
  
  static absDistanceX(v1: VectorLike, v2: VectorLike): number {
    return Math.abs(v1.x - v2.x);
  }

  distanceY(v: VectorLike): number {
    return this.y - v.y;
  }

  static distanceY(v1: VectorLike, v2: VectorLike): number {
    return v1.y - v2.y;
  }

  absDistanceY(v: VectorLike): number {
    return Math.abs(this.y - v.y);
  }

  static absDistanceY(v1: VectorLike, v2: VectorLike): number {
    return Math.abs(v1.y - v2.y);
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

  // projections 投影运算

  orthogonalProjection(v?: VectorLike): Vector[] {
    if (!v || v.x === 0 && v.y === 0) {
      // 默认投影到x,y坐标轴上
      return [new Vector(this.x, 0), new Vector(0, this.y)];
    }
    else {
      const h_vector = new Vector(v.y, -v.x);
      return [Vector.scale(v, this.dot(v)), h_vector.scale(this.dot(h_vector))];
    }
  }
  orth = this.orthogonalProjection;

  orthogonalProjectionScalar(v?: VectorLike): number[] {
    if (!v || v.x === 0 && v.y === 0) {
      // 默认投影到x,y坐标轴上
      return [this.x, this.y];
    }
    else {
      const h_vector = new Vector(v.y, -v.x);
      return [Vector.dot(this, v), Vector.dot(this, h_vector)];
    }
  }
  orthogonalProjectionLength = this.orthogonalProjectionScalar;
  orthLen = this.orthogonalProjectionScalar;

  static orthogonalProjection(v1: VectorLike, v2?: VectorLike): Vector[] {
    if (!v2 || v2.x === 0 && v2.y === 0) {
      // 默认投影到x,y坐标轴上
      return [new Vector(v1.x, 0), new Vector(0, v1.y)];
    }
    else {
      const h_vector = new Vector(v2.y, -v2.x);
      return [Vector.scale(v2, Vector.dot(v1, v2)), h_vector.scale(Vector.dot(v1, h_vector))];
    }
  }
  static orth = Vector.orthogonalProjection;

  static orthogonalProjectionScalar(v1: VectorLike, v2?: VectorLike): number[] {
    if (!v2 || v2.x === 0 && v2.y === 0) {
      // 默认投影到x,y坐标轴上
      return [v1.x, v1.y];
    }
    else {
      const h_vector = new Vector(v2.y, -v2.x);
      return [Vector.dot(v1, v2), Vector.dot(v1, h_vector)];
    }
  }
  static orthogonalProjectionLength = Vector.orthogonalProjectionScalar;
  static orthLen = Vector.orthogonalProjectionScalar;

  projection(v?: VectorLike): Vector {
    if (!v || v.x === 0) {
      return new Vector(this.x, 0);
    }
    else {
      return Vector.scale(v, this.dot(v));
    }
  }
  projectionHorizontal = this.projection;
  projH = this.projection;
  proj = this.projection;

  projectionScalar(v?: VectorLike): number {
    if (!v || v.x === 0) {
      return this.x;
    }
    else {
      return Vector.dot(this, v);
    }
  }
  projectionLength = this.projectionScalar;
  projLenH = this.projectionScalar;

  static projection(v1: VectorLike, v2?: VectorLike): Vector {
    if (!v2 || v2.x === 0) {
      return new Vector(v1.x, 0);
    }
    else {
      return Vector.scale(v2, Vector.dot(v1, v2));
    }
  }
  static projectionHorizontal = Vector.projection;
  static projH = Vector.projection;
  static proj = Vector.projection;

  static projectionScalar(v1: VectorLike, v2?: VectorLike): number {
    if (!v2 || v2.x === 0) {
      return v1.x;
    }
    else {
      return Vector.dot(v1, v2);
    }
  }
  static projectionLength = Vector.projectionScalar;
  static projLenH = Vector.projectionScalar;

  rejection(v?: VectorLike): Vector {
    if (!v || v.y === 0) {
      return new Vector(0, this.y);
    }
    else {
      const h_vector = new Vector(v.y, -v.x);
      return Vector.scale(h_vector, this.dot(h_vector));
    }
  }
  projectionVertical = this.rejection;
  projV = this.rejection;
  oproj = this.rejection;

  rejectionScalar(v?: VectorLike): number {
    if (!v || v.y === 0) {
      return this.y;
    }
    else {
      const h_vector = new Vector(v.y, -v.x);
      return Vector.dot(this, h_vector);
    }
  }
  rejectionLength = this.rejectionScalar;
  projLenV = this.rejectionScalar;

  static rejection(v1: VectorLike, v2?: VectorLike): Vector {
    if (!v2 || v2.y === 0) {
      return new Vector(0, v1.y);
    }
    else {
      const h_vector = new Vector(v2.y, -v2.x);
      return Vector.scale(h_vector, Vector.dot(v1, h_vector));
    }
  }
  static projectionVertical = Vector.rejection;
  static projV = Vector.rejection;
  static oproj = Vector.rejection;

  static rejectionScalar(v1: VectorLike, v2?: VectorLike): number {
    if (!v2 || v2.y === 0) {
      return v1.y;
    }
    else {
      const h_vector = new Vector(v2.y, -v2.x);
      return Vector.dot(v1, h_vector);
    }
  }
  static rejectionLength = Vector.rejectionScalar;
  static projLenV = Vector.rejectionScalar;

  // angles 角度运算

  angle(): number {
    return Math.atan2(this.y, this.x);
  }
  angleRad = this.angle;
  angleDeg(): number {
    return this.angle() * 180 / Math.PI;
  }

  static angle(v1: VectorLike): number {
    return Math.atan2(v1.y, v1.x);
  }
  static angleRad = Vector.angle;
  static angleDeg(v1: VectorLike): number {
    return Math.atan2(v1.y, v1.x) * 180 / Math.PI;
  }

  angleTo(v: VectorLike): number {
    const dot_result = this.dot(v);
    const len1 = this.length();
    const len2 = Vector.len(v);
    const cos_theta = dot_result / (len1 * len2);
    return Math.acos(cos_theta);
  }
  angleToRad = this.angleTo;
  angleToDeg(v: VectorLike): number {
    return this.angleTo(v) * 180 / Math.PI;
  }

  static angleTo(v1: VectorLike, v2: VectorLike): number {
    const dot_result = Vector.dot(v1, v2);
    const len1 = Vector.len(v1);
    const len2 = Vector.len(v2);
    const cos_theta = dot_result / (len1 * len2);
    return Math.acos(cos_theta);
  }
  static angleToRad = Vector.angleTo;
  static angleToDeg(v1: VectorLike, v2: VectorLike): number {
    return Vector.angleTo(v1, v2) * 180 / Math.PI;
  }

  static angleCosTo(v1: VectorLike, v2: VectorLike): number {
    const dot_result = Vector.dot(v1, v2);
    const len1 = Vector.len(v1);
    const len2 = Vector.len(v2);
    return dot_result / (len1 * len2);
  }
  static angleSinTo(v1: VectorLike, v2: VectorLike): number {
    const cross_result = Vector.cross(v1, v2);
    const len1 = Vector.len(v1);
    const len2 = Vector.len(v2);
    return cross_result / (len1 * len2);
  }

  rotate(angle: number): Vector {
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
  rotateRad = this.rotate;
  rotateDeg(angle: number): Vector {
    return this.rotate(angle * Math.PI / 180);
  }
  rotateVert(): Vector {
    return new Vector(this.y, -this.x);
  }

  static rotate(v:VectorLike, angle: number): Vector {
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
  static rotateRad = Vector.rotate;
  static rotateDeg(v:VectorLike, angle: number): Vector {
    return Vector.rotate(v, angle * Math.PI / 180);
  }
  static rotateVert(v: VectorLike): Vector {
    return new Vector(v.y, -v.x);
  }

  rotateTo(v: VectorLike | number): Vector {
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
      return this
    }
  }
  rotateToRad(angle: number): Vector {
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
  rotateToDeg(angle: number): Vector {
    return this.rotateToRad(angle * Math.PI / 180);
  }

  static rotateTo(v1: VectorLike, v2: VectorLike | number): Vector {
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
  static rotateToRad(v: VectorLike, angle: number): Vector {
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
  static rotateToDeg(v: VectorLike, angle: number): Vector {
    return Vector.rotateToRad(v, angle * Math.PI / 180);
  }

  // comparison 比较运算

  inRange(v:Vector, range: number): boolean {
    return this.distanceSq(v) <= range**2;
  }

  static inRange(v1: VectorLike, v2: VectorLike, range: number):boolean {
    return Vector.distanceSq(v1, v2) <= range**2;
  }

  quadrant(): number {
    if ( this.x >= 0 && this.y >= 0) {
      return 1;
    }
    else if ( this.x < 0 && this.y >= 0) {
      return 2;
    }
    else if ( this.x < 0 && this.y < 0) {
      return 3;
    }
    else { // this.x >= 0 && this.y < 0
      return 4;
    }
  }

  static quadrant(v: VectorLike): number {
    if ( v.x >= 0 && v.y >= 0) {
      return 1;
    }
    else if ( v.x < 0 && v.y >= 0) {
      return 2;
    }
    else if ( v.x < 0 && v.y < 0) {
      return 3;
    }
    else { // v.x >= 0 && v.y < 0
      return 4;
    }
  }

  // unary 一元运算

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

  floor(): Vector {
    return new Vector(Math.floor(this.x), Math.floor(this.y))
  }

  toFloor(): Vector{
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }

  static floor(v: VectorLike): Vector{
    return new Vector(Math.floor(v.x), Math.floor(v.y));
  }

  ceil(): Vector {
    return new Vector(Math.ceil(this.x), Math.ceil(this.y))
  }

  toCeil(): Vector{
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }

  static ceil(v: VectorLike): Vector{
    return new Vector(Math.ceil(v.x), Math.ceil(v.y));
  }

  round(): Vector {
    return new Vector(Math.round(this.x), Math.round(this.y))
  }

  toRound(): Vector{
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }

  static round(v: VectorLike): Vector{
    return new Vector(Math.round(v.x), Math.round(v.y));
  }

  // constants 常量

  static readonly ZERO = new VectorConstant(0, 0);
  static readonly UNIT_X = new VectorConstant(1, 0);
  static readonly UNIT_Y = new VectorConstant(0, 1);
}

export {
  Vector,
  VectorConstant,
  VectorPlot,
  VectorPlotConstant,
  Vector3D,
}

export type {
  VectorPlotLike,
  Vector3DLike
}

export interface VectorLike {
  x: number;
  y: number;
  z?: number; // 兼容三维向量
}


