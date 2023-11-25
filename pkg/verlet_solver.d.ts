/* tslint:disable */
/* eslint-disable */
/**
*/
export class Joint {
  free(): void;
/**
* @param {number} a
* @param {number} b
*/
  constructor(a: number, b: number);
/**
*/
  apply_constraint(): void;
}
/**
*/
export class Point {
  free(): void;
/**
* @param {boolean} locked
* @param {Vec2} pos
* @param {Vec2} last_pos
*/
  constructor(locked: boolean, pos: Vec2, last_pos: Vec2);
/**
* @param {number} dt
* @param {Vec2} force
*/
  step(dt: number, force: Vec2): void;
/**
*/
  last_pos: Vec2;
/**
*/
  locked: boolean;
/**
*/
  pos: Vec2;
}
/**
*/
export class Vec2 {
  free(): void;
/**
* @param {number} x
* @param {number} y
*/
  constructor(x: number, y: number);
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
}
/**
*/
export class World {
  free(): void;
/**
* @param {Vec2} gravity
*/
  constructor(gravity: Vec2);
/**
* @param {Point} point
* @returns {number}
*/
  add_point(point: Point): number;
/**
* @param {Joint} joint
* @returns {number}
*/
  add_joint(joint: Joint): number;
/**
* @param {number} ptr
* @returns {Point}
*/
  static get_point(ptr: number): Point;
/**
* @param {number} dt
* @param {number} substeps
*/
  step(dt: number, substeps: number): void;
/**
*/
  gravity: Vec2;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_joint_free: (a: number) => void;
  readonly joint_new: (a: number, b: number) => number;
  readonly joint_apply_constraint: (a: number) => void;
  readonly __wbg_vec2_free: (a: number) => void;
  readonly __wbg_get_vec2_x: (a: number) => number;
  readonly __wbg_set_vec2_x: (a: number, b: number) => void;
  readonly __wbg_get_vec2_y: (a: number) => number;
  readonly __wbg_set_vec2_y: (a: number, b: number) => void;
  readonly vec2_new: (a: number, b: number) => number;
  readonly vec2_length: (a: number) => number;
  readonly __wbg_point_free: (a: number) => void;
  readonly __wbg_get_point_locked: (a: number) => number;
  readonly __wbg_set_point_locked: (a: number, b: number) => void;
  readonly __wbg_get_point_pos: (a: number) => number;
  readonly __wbg_set_point_pos: (a: number, b: number) => void;
  readonly __wbg_get_point_last_pos: (a: number) => number;
  readonly __wbg_set_point_last_pos: (a: number, b: number) => void;
  readonly point_new: (a: number, b: number, c: number) => number;
  readonly point_step: (a: number, b: number, c: number) => void;
  readonly __wbg_world_free: (a: number) => void;
  readonly world_new: (a: number) => number;
  readonly world_add_point: (a: number, b: number) => number;
  readonly world_add_joint: (a: number, b: number) => number;
  readonly world_get_point: (a: number) => number;
  readonly world_step: (a: number, b: number, c: number) => void;
  readonly __wbg_get_world_gravity: (a: number) => number;
  readonly __wbg_set_world_gravity: (a: number, b: number) => void;
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
