let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}
/**
*/
export class Joint {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_joint_free(ptr);
    }
    /**
    * @param {number} a
    * @param {number} b
    */
    constructor(a, b) {
        const ret = wasm.joint_new(a, b);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    */
    apply_constraint() {
        wasm.joint_apply_constraint(this.__wbg_ptr);
    }
}
/**
*/
export class Point {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Point.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_point_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    get locked() {
        const ret = wasm.__wbg_get_point_locked(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set locked(arg0) {
        wasm.__wbg_set_point_locked(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {Vec2}
    */
    get pos() {
        const ret = wasm.__wbg_get_point_pos(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
    * @param {Vec2} arg0
    */
    set pos(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_point_pos(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {Vec2}
    */
    get last_pos() {
        const ret = wasm.__wbg_get_point_last_pos(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
    * @param {Vec2} arg0
    */
    set last_pos(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_point_last_pos(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {boolean} locked
    * @param {Vec2} pos
    * @param {Vec2} last_pos
    */
    constructor(locked, pos, last_pos) {
        _assertClass(pos, Vec2);
        var ptr0 = pos.__destroy_into_raw();
        _assertClass(last_pos, Vec2);
        var ptr1 = last_pos.__destroy_into_raw();
        const ret = wasm.point_new(locked, ptr0, ptr1);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {number} dt
    * @param {Vec2} force
    */
    step(dt, force) {
        _assertClass(force, Vec2);
        var ptr0 = force.__destroy_into_raw();
        wasm.point_step(this.__wbg_ptr, dt, ptr0);
    }
}
/**
*/
export class Vec2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vec2.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vec2_free(ptr);
    }
    /**
    * @returns {number}
    */
    get x() {
        const ret = wasm.__wbg_get_vec2_x(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_vec2_x(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        const ret = wasm.__wbg_get_vec2_y(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_vec2_y(this.__wbg_ptr, arg0);
    }
    /**
    * @param {number} x
    * @param {number} y
    */
    constructor(x, y) {
        const ret = wasm.vec2_new(x, y);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {number}
    */
    length() {
        const ret = wasm.vec2_length(this.__wbg_ptr);
        return ret;
    }
}
/**
*/
export class World {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_world_free(ptr);
    }
    /**
    * @returns {Vec2}
    */
    get gravity() {
        const ret = wasm.__wbg_get_point_pos(this.__wbg_ptr);
        return Vec2.__wrap(ret);
    }
    /**
    * @param {Vec2} arg0
    */
    set gravity(arg0) {
        _assertClass(arg0, Vec2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_point_pos(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {Vec2} gravity
    */
    constructor(gravity) {
        _assertClass(gravity, Vec2);
        var ptr0 = gravity.__destroy_into_raw();
        const ret = wasm.world_new(ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {Point} point
    * @returns {number}
    */
    add_point(point) {
        _assertClass(point, Point);
        var ptr0 = point.__destroy_into_raw();
        const ret = wasm.world_add_point(this.__wbg_ptr, ptr0);
        return ret >>> 0;
    }
    /**
    * @param {Joint} joint
    * @returns {number}
    */
    add_joint(joint) {
        _assertClass(joint, Joint);
        var ptr0 = joint.__destroy_into_raw();
        const ret = wasm.world_add_joint(this.__wbg_ptr, ptr0);
        return ret >>> 0;
    }
    /**
    * @param {number} ptr
    * @returns {Point}
    */
    static get_point(ptr) {
        const ret = wasm.world_get_point(ptr);
        return Point.__wrap(ret);
    }
    /**
    * @param {number} dt
    * @param {number} substeps
    */
    step(dt, substeps) {
        wasm.world_step(this.__wbg_ptr, dt, substeps);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('verlet_solver_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
