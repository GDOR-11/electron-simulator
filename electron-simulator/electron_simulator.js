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

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArrayF64ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 8, 8) >>> 0;
    getFloat64Memory0().set(arg, ptr / 8);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
*/
export const ConstraintShape = Object.freeze({ Sphere:0,"0":"Sphere", });

const ConstraintFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_constraint_free(ptr >>> 0));
/**
*/
export class Constraint {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Constraint.prototype);
        obj.__wbg_ptr = ptr;
        ConstraintFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        ConstraintFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_constraint_free(ptr);
    }
    /**
    * @returns {ConstraintShape}
    */
    get shape() {
        const ret = wasm.__wbg_get_constraint_shape(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {ConstraintShape} arg0
    */
    set shape(arg0) {
        wasm.__wbg_set_constraint_shape(this.__wbg_ptr, arg0);
    }
    /**
    * @param {ConstraintShape} shape
    * @param {Float64Array} data
    */
    constructor(shape, data) {
        const ptr0 = passArrayF64ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.constraint_new(shape, ptr0, len0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {Constraint}
    */
    clone() {
        const ret = wasm.constraint_clone(this.__wbg_ptr);
        return Constraint.__wrap(ret);
    }
    /**
    * @param {number} index
    * @returns {number}
    */
    get_data(index) {
        const ret = wasm.constraint_get_data(this.__wbg_ptr, index);
        return ret;
    }
    /**
    * @param {Vec3} point
    */
    apply(point) {
        _assertClass(point, Vec3);
        wasm.constraint_apply(this.__wbg_ptr, point.__wbg_ptr);
    }
}

const PointChargeFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_pointcharge_free(ptr >>> 0));
/**
*/
export class PointCharge {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PointCharge.prototype);
        obj.__wbg_ptr = ptr;
        PointChargeFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        PointChargeFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_pointcharge_free(ptr);
    }
    /**
    * @returns {boolean}
    */
    get locked() {
        const ret = wasm.__wbg_get_pointcharge_locked(this.__wbg_ptr);
        return ret !== 0;
    }
    /**
    * @param {boolean} arg0
    */
    set locked(arg0) {
        wasm.__wbg_set_pointcharge_locked(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {Vec3}
    */
    get pos() {
        const ret = wasm.__wbg_get_pointcharge_pos(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
    * @param {Vec3} arg0
    */
    set pos(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_pointcharge_pos(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {Vec3}
    */
    get last_pos() {
        const ret = wasm.__wbg_get_pointcharge_last_pos(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
    * @param {Vec3} arg0
    */
    set last_pos(arg0) {
        _assertClass(arg0, Vec3);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_pointcharge_last_pos(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {number}
    */
    get charge() {
        const ret = wasm.__wbg_get_pointcharge_charge(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set charge(arg0) {
        wasm.__wbg_set_pointcharge_charge(this.__wbg_ptr, arg0);
    }
    /**
    * @param {boolean} locked
    * @param {Vec3} pos
    * @param {Vec3} last_pos
    * @param {number} charge
    */
    constructor(locked, pos, last_pos, charge) {
        _assertClass(pos, Vec3);
        var ptr0 = pos.__destroy_into_raw();
        _assertClass(last_pos, Vec3);
        var ptr1 = last_pos.__destroy_into_raw();
        const ret = wasm.pointcharge_new(locked, ptr0, ptr1, charge);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {number} dt
    * @param {Vec3} force
    */
    step(dt, force) {
        _assertClass(force, Vec3);
        var ptr0 = force.__destroy_into_raw();
        wasm.pointcharge_step(this.__wbg_ptr, dt, ptr0);
    }
}

const Vec3Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vec3_free(ptr >>> 0));
/**
*/
export class Vec3 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vec3.prototype);
        obj.__wbg_ptr = ptr;
        Vec3Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vec3Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vec3_free(ptr);
    }
    /**
    * @returns {number}
    */
    get x() {
        const ret = wasm.__wbg_get_vec3_x(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_vec3_x(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        const ret = wasm.__wbg_get_vec3_y(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_vec3_y(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get z() {
        const ret = wasm.__wbg_get_vec3_z(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set z(arg0) {
        wasm.__wbg_set_vec3_z(this.__wbg_ptr, arg0);
    }
    /**
    * @param {number} x
    * @param {number} y
    * @param {number} z
    */
    constructor(x, y, z) {
        const ret = wasm.vec3_new(x, y, z);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {Vec3}
    */
    normalized() {
        const ret = wasm.vec3_normalized(this.__wbg_ptr);
        return Vec3.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    sq_length() {
        const ret = wasm.vec3_sq_length(this.__wbg_ptr);
        return ret;
    }
    /**
    * @returns {number}
    */
    length() {
        const ret = wasm.vec3_length(this.__wbg_ptr);
        return ret;
    }
}

const WorldFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_world_free(ptr >>> 0));
/**
*/
export class World {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WorldFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_world_free(ptr);
    }
    /**
    * @returns {number}
    */
    get k() {
        const ret = wasm.__wbg_get_vec3_x(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set k(arg0) {
        wasm.__wbg_set_vec3_x(this.__wbg_ptr, arg0);
    }
    /**
    * @param {number} k
    * @param {Constraint} constraint
    */
    constructor(k, constraint) {
        _assertClass(constraint, Constraint);
        var ptr0 = constraint.__destroy_into_raw();
        const ret = wasm.world_new(k, ptr0);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @param {PointCharge} point
    * @returns {number}
    */
    add_charge(point) {
        _assertClass(point, PointCharge);
        var ptr0 = point.__destroy_into_raw();
        const ret = wasm.world_add_charge(this.__wbg_ptr, ptr0);
        return ret >>> 0;
    }
    /**
    * @param {number} index
    * @returns {PointCharge}
    */
    get_charge(index) {
        const ret = wasm.world_get_charge(this.__wbg_ptr, index);
        return PointCharge.__wrap(ret);
    }
    /**
    * @returns {Constraint}
    */
    get_constraint() {
        const ret = wasm.world_get_constraint(this.__wbg_ptr);
        return Constraint.__wrap(ret);
    }
    /**
    * @returns {number}
    */
    charge_count() {
        const ret = wasm.world_charge_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {Vec3} point
    * @returns {Vec3}
    */
    get_electric_field(point) {
        _assertClass(point, Vec3);
        var ptr0 = point.__destroy_into_raw();
        const ret = wasm.world_get_electric_field(this.__wbg_ptr, ptr0);
        return Vec3.__wrap(ret);
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
    cachedFloat64Memory0 = null;
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
        input = new URL('electron_simulator_bg.wasm', import.meta.url);
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
