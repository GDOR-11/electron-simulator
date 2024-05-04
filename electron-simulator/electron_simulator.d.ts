/* tslint:disable */
/* eslint-disable */
/**
*/
export enum ConstraintShape {
  Sphere = 0,
}
/**
*/
export class Constraint {
  free(): void;
/**
* @param {ConstraintShape} shape
* @param {Float64Array} data
*/
  constructor(shape: ConstraintShape, data: Float64Array);
/**
* @returns {Constraint}
*/
  clone(): Constraint;
/**
* @param {number} index
* @returns {number}
*/
  get_data(index: number): number;
/**
* @param {Vec3} point
*/
  apply(point: Vec3): void;
/**
*/
  shape: ConstraintShape;
}
/**
*/
export class PointCharge {
  free(): void;
/**
* @param {boolean} locked
* @param {Vec3} pos
* @param {Vec3} last_pos
* @param {number} charge
*/
  constructor(locked: boolean, pos: Vec3, last_pos: Vec3, charge: number);
/**
* @param {number} dt
* @param {Vec3} force
*/
  step(dt: number, force: Vec3): void;
/**
*/
  charge: number;
/**
*/
  last_pos: Vec3;
/**
*/
  locked: boolean;
/**
*/
  pos: Vec3;
}
/**
*/
export class Vec3 {
  free(): void;
/**
* @param {number} x
* @param {number} y
* @param {number} z
*/
  constructor(x: number, y: number, z: number);
/**
* @returns {Vec3}
*/
  normalized(): Vec3;
/**
* @returns {number}
*/
  sq_length(): number;
/**
* @returns {number}
*/
  length(): number;
/**
*/
  x: number;
/**
*/
  y: number;
/**
*/
  z: number;
}
/**
*/
export class World {
  free(): void;
/**
* @param {number} k
* @param {Constraint} constraint
*/
  constructor(k: number, constraint: Constraint);
/**
* @param {PointCharge} point
* @returns {number}
*/
  add_charge(point: PointCharge): number;
/**
* @param {number} index
* @returns {PointCharge}
*/
  get_charge(index: number): PointCharge;
/**
* @param {Vec3} point
* @returns {Vec3}
*/
  get_electric_field(point: Vec3): Vec3;
/**
* @param {number} dt
* @param {number} substeps
*/
  step(dt: number, substeps: number): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_vec3_free: (a: number) => void;
  readonly __wbg_get_vec3_x: (a: number) => number;
  readonly __wbg_set_vec3_x: (a: number, b: number) => void;
  readonly __wbg_get_vec3_y: (a: number) => number;
  readonly __wbg_set_vec3_y: (a: number, b: number) => void;
  readonly __wbg_get_vec3_z: (a: number) => number;
  readonly __wbg_set_vec3_z: (a: number, b: number) => void;
  readonly vec3_new: (a: number, b: number, c: number) => number;
  readonly vec3_normalized: (a: number) => number;
  readonly vec3_sq_length: (a: number) => number;
  readonly vec3_length: (a: number) => number;
  readonly __wbg_pointcharge_free: (a: number) => void;
  readonly __wbg_get_pointcharge_locked: (a: number) => number;
  readonly __wbg_set_pointcharge_locked: (a: number, b: number) => void;
  readonly __wbg_get_pointcharge_pos: (a: number) => number;
  readonly __wbg_set_pointcharge_pos: (a: number, b: number) => void;
  readonly __wbg_get_pointcharge_last_pos: (a: number) => number;
  readonly __wbg_set_pointcharge_last_pos: (a: number, b: number) => void;
  readonly __wbg_get_pointcharge_charge: (a: number) => number;
  readonly __wbg_set_pointcharge_charge: (a: number, b: number) => void;
  readonly pointcharge_new: (a: number, b: number, c: number, d: number) => number;
  readonly pointcharge_step: (a: number, b: number, c: number) => void;
  readonly __wbg_world_free: (a: number) => void;
  readonly world_new: (a: number, b: number) => number;
  readonly world_add_charge: (a: number, b: number) => number;
  readonly world_get_charge: (a: number, b: number) => number;
  readonly world_get_electric_field: (a: number, b: number) => number;
  readonly world_step: (a: number, b: number, c: number) => void;
  readonly __wbg_constraint_free: (a: number) => void;
  readonly __wbg_get_constraint_shape: (a: number) => number;
  readonly __wbg_set_constraint_shape: (a: number, b: number) => void;
  readonly constraint_new: (a: number, b: number, c: number) => number;
  readonly constraint_clone: (a: number) => number;
  readonly constraint_get_data: (a: number, b: number) => number;
  readonly constraint_apply: (a: number, b: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
