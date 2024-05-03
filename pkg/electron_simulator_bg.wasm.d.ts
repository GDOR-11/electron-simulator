/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function __wbg_vec2_free(a: number): void;
export function __wbg_get_vec2_x(a: number): number;
export function __wbg_set_vec2_x(a: number, b: number): void;
export function __wbg_get_vec2_y(a: number): number;
export function __wbg_set_vec2_y(a: number, b: number): void;
export function vec2_new(a: number, b: number): number;
export function vec2_normalized(a: number): number;
export function vec2_sq_length(a: number): number;
export function vec2_length(a: number): number;
export function __wbg_pointcharge_free(a: number): void;
export function __wbg_get_pointcharge_locked(a: number): number;
export function __wbg_set_pointcharge_locked(a: number, b: number): void;
export function __wbg_get_pointcharge_pos(a: number): number;
export function __wbg_set_pointcharge_pos(a: number, b: number): void;
export function __wbg_get_pointcharge_last_pos(a: number): number;
export function __wbg_set_pointcharge_last_pos(a: number, b: number): void;
export function __wbg_get_pointcharge_charge(a: number): number;
export function __wbg_set_pointcharge_charge(a: number, b: number): void;
export function pointcharge_new(a: number, b: number, c: number, d: number): number;
export function pointcharge_step(a: number, b: number, c: number): void;
export function __wbg_world_free(a: number): void;
export function world_new(a: number, b: number): number;
export function world_add_charge(a: number, b: number): number;
export function world_get_charge(a: number, b: number): number;
export function world_get_electric_field(a: number, b: number): number;
export function world_step(a: number, b: number, c: number): void;
export function __wbg_constraint_free(a: number): void;
export function __wbg_get_constraint_shape(a: number): number;
export function __wbg_set_constraint_shape(a: number, b: number): void;
export function constraint_new(a: number, b: number, c: number): number;
export function constraint_clone(a: number): number;
export function constraint_get_data(a: number, b: number): number;
export function constraint_apply(a: number, b: number): void;
export function __wbindgen_malloc(a: number, b: number): number;
