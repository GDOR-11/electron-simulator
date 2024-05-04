/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./electron-simulator/electron_simulator.js":
/*!**************************************************!*\
  !*** ./electron-simulator/electron_simulator.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Constraint: () => (/* binding */ Constraint),\n/* harmony export */   ConstraintShape: () => (/* binding */ ConstraintShape),\n/* harmony export */   PointCharge: () => (/* binding */ PointCharge),\n/* harmony export */   Vec3: () => (/* binding */ Vec3),\n/* harmony export */   World: () => (/* binding */ World),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   initSync: () => (/* binding */ initSync)\n/* harmony export */ });\nlet wasm;\n\nconst cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );\n\nif (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };\n\nlet cachedUint8Memory0 = null;\n\nfunction getUint8Memory0() {\n    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {\n        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);\n    }\n    return cachedUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    ptr = ptr >>> 0;\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction _assertClass(instance, klass) {\n    if (!(instance instanceof klass)) {\n        throw new Error(`expected instance of ${klass.name}`);\n    }\n    return instance.ptr;\n}\n\nlet cachedFloat64Memory0 = null;\n\nfunction getFloat64Memory0() {\n    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {\n        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);\n    }\n    return cachedFloat64Memory0;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nfunction passArrayF64ToWasm0(arg, malloc) {\n    const ptr = malloc(arg.length * 8, 8) >>> 0;\n    getFloat64Memory0().set(arg, ptr / 8);\n    WASM_VECTOR_LEN = arg.length;\n    return ptr;\n}\n/**\n*/\nconst ConstraintShape = Object.freeze({ Sphere:0,\"0\":\"Sphere\", });\n\nconst ConstraintFinalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_constraint_free(ptr >>> 0));\n/**\n*/\nclass Constraint {\n\n    static __wrap(ptr) {\n        ptr = ptr >>> 0;\n        const obj = Object.create(Constraint.prototype);\n        obj.__wbg_ptr = ptr;\n        ConstraintFinalization.register(obj, obj.__wbg_ptr, obj);\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        ConstraintFinalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_constraint_free(ptr);\n    }\n    /**\n    * @returns {ConstraintShape}\n    */\n    get shape() {\n        const ret = wasm.__wbg_get_constraint_shape(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @param {ConstraintShape} arg0\n    */\n    set shape(arg0) {\n        wasm.__wbg_set_constraint_shape(this.__wbg_ptr, arg0);\n    }\n    /**\n    * @param {ConstraintShape} shape\n    * @param {Float64Array} data\n    */\n    constructor(shape, data) {\n        const ptr0 = passArrayF64ToWasm0(data, wasm.__wbindgen_malloc);\n        const len0 = WASM_VECTOR_LEN;\n        const ret = wasm.constraint_new(shape, ptr0, len0);\n        this.__wbg_ptr = ret >>> 0;\n        return this;\n    }\n    /**\n    * @returns {Constraint}\n    */\n    clone() {\n        const ret = wasm.constraint_clone(this.__wbg_ptr);\n        return Constraint.__wrap(ret);\n    }\n    /**\n    * @param {number} index\n    * @returns {number}\n    */\n    get_data(index) {\n        const ret = wasm.constraint_get_data(this.__wbg_ptr, index);\n        return ret;\n    }\n    /**\n    * @param {Vec3} point\n    */\n    apply(point) {\n        _assertClass(point, Vec3);\n        wasm.constraint_apply(this.__wbg_ptr, point.__wbg_ptr);\n    }\n}\n\nconst PointChargeFinalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_pointcharge_free(ptr >>> 0));\n/**\n*/\nclass PointCharge {\n\n    static __wrap(ptr) {\n        ptr = ptr >>> 0;\n        const obj = Object.create(PointCharge.prototype);\n        obj.__wbg_ptr = ptr;\n        PointChargeFinalization.register(obj, obj.__wbg_ptr, obj);\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        PointChargeFinalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_pointcharge_free(ptr);\n    }\n    /**\n    * @returns {boolean}\n    */\n    get locked() {\n        const ret = wasm.__wbg_get_pointcharge_locked(this.__wbg_ptr);\n        return ret !== 0;\n    }\n    /**\n    * @param {boolean} arg0\n    */\n    set locked(arg0) {\n        wasm.__wbg_set_pointcharge_locked(this.__wbg_ptr, arg0);\n    }\n    /**\n    * @returns {Vec3}\n    */\n    get pos() {\n        const ret = wasm.__wbg_get_pointcharge_pos(this.__wbg_ptr);\n        return Vec3.__wrap(ret);\n    }\n    /**\n    * @param {Vec3} arg0\n    */\n    set pos(arg0) {\n        _assertClass(arg0, Vec3);\n        var ptr0 = arg0.__destroy_into_raw();\n        wasm.__wbg_set_pointcharge_pos(this.__wbg_ptr, ptr0);\n    }\n    /**\n    * @returns {Vec3}\n    */\n    get last_pos() {\n        const ret = wasm.__wbg_get_pointcharge_last_pos(this.__wbg_ptr);\n        return Vec3.__wrap(ret);\n    }\n    /**\n    * @param {Vec3} arg0\n    */\n    set last_pos(arg0) {\n        _assertClass(arg0, Vec3);\n        var ptr0 = arg0.__destroy_into_raw();\n        wasm.__wbg_set_pointcharge_last_pos(this.__wbg_ptr, ptr0);\n    }\n    /**\n    * @returns {number}\n    */\n    get charge() {\n        const ret = wasm.__wbg_get_pointcharge_charge(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set charge(arg0) {\n        wasm.__wbg_set_pointcharge_charge(this.__wbg_ptr, arg0);\n    }\n    /**\n    * @param {boolean} locked\n    * @param {Vec3} pos\n    * @param {Vec3} last_pos\n    * @param {number} charge\n    */\n    constructor(locked, pos, last_pos, charge) {\n        _assertClass(pos, Vec3);\n        var ptr0 = pos.__destroy_into_raw();\n        _assertClass(last_pos, Vec3);\n        var ptr1 = last_pos.__destroy_into_raw();\n        const ret = wasm.pointcharge_new(locked, ptr0, ptr1, charge);\n        this.__wbg_ptr = ret >>> 0;\n        return this;\n    }\n    /**\n    * @param {number} dt\n    * @param {Vec3} force\n    */\n    step(dt, force) {\n        _assertClass(force, Vec3);\n        var ptr0 = force.__destroy_into_raw();\n        wasm.pointcharge_step(this.__wbg_ptr, dt, ptr0);\n    }\n}\n\nconst Vec3Finalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_vec3_free(ptr >>> 0));\n/**\n*/\nclass Vec3 {\n\n    static __wrap(ptr) {\n        ptr = ptr >>> 0;\n        const obj = Object.create(Vec3.prototype);\n        obj.__wbg_ptr = ptr;\n        Vec3Finalization.register(obj, obj.__wbg_ptr, obj);\n        return obj;\n    }\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        Vec3Finalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_vec3_free(ptr);\n    }\n    /**\n    * @returns {number}\n    */\n    get x() {\n        const ret = wasm.__wbg_get_vec3_x(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set x(arg0) {\n        wasm.__wbg_set_vec3_x(this.__wbg_ptr, arg0);\n    }\n    /**\n    * @returns {number}\n    */\n    get y() {\n        const ret = wasm.__wbg_get_vec3_y(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set y(arg0) {\n        wasm.__wbg_set_vec3_y(this.__wbg_ptr, arg0);\n    }\n    /**\n    * @returns {number}\n    */\n    get z() {\n        const ret = wasm.__wbg_get_vec3_z(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @param {number} arg0\n    */\n    set z(arg0) {\n        wasm.__wbg_set_vec3_z(this.__wbg_ptr, arg0);\n    }\n    /**\n    * @param {number} x\n    * @param {number} y\n    * @param {number} z\n    */\n    constructor(x, y, z) {\n        const ret = wasm.vec3_new(x, y, z);\n        this.__wbg_ptr = ret >>> 0;\n        return this;\n    }\n    /**\n    * @returns {Vec3}\n    */\n    normalized() {\n        const ret = wasm.vec3_normalized(this.__wbg_ptr);\n        return Vec3.__wrap(ret);\n    }\n    /**\n    * @returns {number}\n    */\n    sq_length() {\n        const ret = wasm.vec3_sq_length(this.__wbg_ptr);\n        return ret;\n    }\n    /**\n    * @returns {number}\n    */\n    length() {\n        const ret = wasm.vec3_length(this.__wbg_ptr);\n        return ret;\n    }\n}\n\nconst WorldFinalization = (typeof FinalizationRegistry === 'undefined')\n    ? { register: () => {}, unregister: () => {} }\n    : new FinalizationRegistry(ptr => wasm.__wbg_world_free(ptr >>> 0));\n/**\n*/\nclass World {\n\n    __destroy_into_raw() {\n        const ptr = this.__wbg_ptr;\n        this.__wbg_ptr = 0;\n        WorldFinalization.unregister(this);\n        return ptr;\n    }\n\n    free() {\n        const ptr = this.__destroy_into_raw();\n        wasm.__wbg_world_free(ptr);\n    }\n    /**\n    * @param {number} k\n    * @param {Constraint} constraint\n    */\n    constructor(k, constraint) {\n        _assertClass(constraint, Constraint);\n        var ptr0 = constraint.__destroy_into_raw();\n        const ret = wasm.world_new(k, ptr0);\n        this.__wbg_ptr = ret >>> 0;\n        return this;\n    }\n    /**\n    * @param {PointCharge} point\n    * @returns {number}\n    */\n    add_charge(point) {\n        _assertClass(point, PointCharge);\n        var ptr0 = point.__destroy_into_raw();\n        const ret = wasm.world_add_charge(this.__wbg_ptr, ptr0);\n        return ret >>> 0;\n    }\n    /**\n    * @param {number} index\n    * @returns {PointCharge}\n    */\n    get_charge(index) {\n        const ret = wasm.world_get_charge(this.__wbg_ptr, index);\n        return PointCharge.__wrap(ret);\n    }\n    /**\n    * @param {Vec3} point\n    * @returns {Vec3}\n    */\n    get_electric_field(point) {\n        _assertClass(point, Vec3);\n        var ptr0 = point.__destroy_into_raw();\n        const ret = wasm.world_get_electric_field(this.__wbg_ptr, ptr0);\n        return Vec3.__wrap(ret);\n    }\n    /**\n    * @param {number} dt\n    * @param {number} substeps\n    */\n    step(dt, substeps) {\n        wasm.world_step(this.__wbg_ptr, dt, substeps);\n    }\n}\n\nasync function __wbg_load(module, imports) {\n    if (typeof Response === 'function' && module instanceof Response) {\n        if (typeof WebAssembly.instantiateStreaming === 'function') {\n            try {\n                return await WebAssembly.instantiateStreaming(module, imports);\n\n            } catch (e) {\n                if (module.headers.get('Content-Type') != 'application/wasm') {\n                    console.warn(\"`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\\n\", e);\n\n                } else {\n                    throw e;\n                }\n            }\n        }\n\n        const bytes = await module.arrayBuffer();\n        return await WebAssembly.instantiate(bytes, imports);\n\n    } else {\n        const instance = await WebAssembly.instantiate(module, imports);\n\n        if (instance instanceof WebAssembly.Instance) {\n            return { instance, module };\n\n        } else {\n            return instance;\n        }\n    }\n}\n\nfunction __wbg_get_imports() {\n    const imports = {};\n    imports.wbg = {};\n    imports.wbg.__wbindgen_throw = function(arg0, arg1) {\n        throw new Error(getStringFromWasm0(arg0, arg1));\n    };\n\n    return imports;\n}\n\nfunction __wbg_init_memory(imports, maybe_memory) {\n\n}\n\nfunction __wbg_finalize_init(instance, module) {\n    wasm = instance.exports;\n    __wbg_init.__wbindgen_wasm_module = module;\n    cachedFloat64Memory0 = null;\n    cachedUint8Memory0 = null;\n\n\n    return wasm;\n}\n\nfunction initSync(module) {\n    if (wasm !== undefined) return wasm;\n\n    const imports = __wbg_get_imports();\n\n    __wbg_init_memory(imports);\n\n    if (!(module instanceof WebAssembly.Module)) {\n        module = new WebAssembly.Module(module);\n    }\n\n    const instance = new WebAssembly.Instance(module, imports);\n\n    return __wbg_finalize_init(instance, module);\n}\n\nasync function __wbg_init(input) {\n    if (wasm !== undefined) return wasm;\n\n    if (typeof input === 'undefined') {\n        input = new URL(/* asset import */ __webpack_require__(/*! electron_simulator_bg.wasm */ \"./electron-simulator/electron_simulator_bg.wasm\"), __webpack_require__.b);\n    }\n    const imports = __wbg_get_imports();\n\n    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {\n        input = fetch(input);\n    }\n\n    __wbg_init_memory(imports);\n\n    const { instance, module } = await __wbg_load(await input, imports);\n\n    return __wbg_finalize_init(instance, module);\n}\n\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__wbg_init);\n\n\n//# sourceURL=webpack://e-sim/./electron-simulator/electron_simulator.js?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _parse_query__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parse-query */ \"./src/parse-query.ts\");\n/* harmony import */ var electron_simulator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! electron-simulator */ \"./electron-simulator/electron_simulator.js\");\n\n\nawait (0,electron_simulator__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\nconst canvas = document.getElementsByTagName(\"canvas\")[0];\nconst ctx = canvas.getContext(\"2d\");\nlet width = window.innerWidth;\nlet height = window.innerHeight;\nfunction resize_canvas() {\n    width = window.innerWidth;\n    height = window.innerHeight;\n    canvas.width = width;\n    canvas.height = height;\n}\nwindow.addEventListener(\"resize\", resize_canvas);\nresize_canvas();\nconst iterations = Number((0,_parse_query__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().iterations) || 1;\nconst fps = Number((0,_parse_query__WEBPACK_IMPORTED_MODULE_0__[\"default\"])().fps) || Infinity;\nconst constraint = new electron_simulator__WEBPACK_IMPORTED_MODULE_1__.Constraint(electron_simulator__WEBPACK_IMPORTED_MODULE_1__.ConstraintShape.Sphere, new Float64Array([width / 2, height / 2, 0, Math.min(width, height) / 2]));\nconst world = new electron_simulator__WEBPACK_IMPORTED_MODULE_1__.World(9e9, constraint.clone());\nconst e = 0.01;\n/** array of indexes of the array in rust */\nlet charges = [];\nwindow.addEventListener(\"mousedown\", event => {\n    charges.push(world.add_charge(new electron_simulator__WEBPACK_IMPORTED_MODULE_1__.PointCharge(false, new electron_simulator__WEBPACK_IMPORTED_MODULE_1__.Vec3(event.x, event.y, 0), new electron_simulator__WEBPACK_IMPORTED_MODULE_1__.Vec3(event.x, event.y, 0), -e)));\n});\nfor (let a = 0; a < 1.99999 * Math.PI; a += Math.PI / 32) {\n    let x = width / 2 + height / 2 * Math.cos(a);\n    let y = height / 2 + height / 2 * Math.sin(a);\n    charges.push(world.add_charge(new electron_simulator__WEBPACK_IMPORTED_MODULE_1__.PointCharge(false, new electron_simulator__WEBPACK_IMPORTED_MODULE_1__.Vec3(x, y, 0), new electron_simulator__WEBPACK_IMPORTED_MODULE_1__.Vec3(x, y, 0), -e)));\n}\nfunction render_constraint() {\n    if (constraint.shape === electron_simulator__WEBPACK_IMPORTED_MODULE_1__.ConstraintShape.Sphere) {\n        ctx.fillStyle = \"grey\";\n        ctx.beginPath();\n        ctx.arc(constraint.get_data(0), constraint.get_data(1), constraint.get_data(3), 0, 2 * Math.PI);\n        ctx.fill();\n    }\n}\nfunction render_charges() {\n    for (let idx of charges) {\n        let charge = world.get_charge(idx);\n        ctx.fillStyle = charge.charge > 0 ? \"red\" : \"yellow\";\n        ctx.beginPath();\n        ctx.arc(charge.pos.x, charge.pos.y, 10, 0, 2 * Math.PI);\n        ctx.fill();\n    }\n}\nlet start = Date.now();\nlet frame_count = 0;\nlet last_frame = start;\nlet visible = true;\nlet becameVisible = false;\ndocument.onvisibilitychange = () => [visible, becameVisible] = [!visible, !visible];\nfunction simulation_loop() {\n    requestAnimationFrame(simulation_loop);\n    if (!visible || becameVisible) {\n        frame_count += fps * (Date.now() - last_frame) / 1000;\n        last_frame = Date.now();\n        if (becameVisible)\n            becameVisible = false;\n        if (fps == Infinity)\n            return;\n    }\n    if (1000 * frame_count / (Date.now() - start) > fps)\n        return;\n    frame_count++;\n    let dt = fps == Infinity ? (Date.now() - last_frame) / 1000 : 1 / fps;\n    last_frame = Date.now();\n    ctx.clearRect(0, 0, width, height);\n    render_constraint();\n    render_charges();\n    world.step(dt, iterations);\n}\nrequestAnimationFrame(simulation_loop);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } }, 1);\n\n//# sourceURL=webpack://e-sim/./src/index.ts?");

/***/ }),

/***/ "./src/parse-query.ts":
/*!****************************!*\
  !*** ./src/parse-query.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ parse_query)\n/* harmony export */ });\n/** thing I use to memoize the function */\nlet saved_query_data = null;\nfunction parse_query() {\n    if (saved_query_data != null)\n        return saved_query_data;\n    let query = location.search.substring(1);\n    let query_data = {};\n    for (let data of query.split(\"&\")) {\n        let split = data.split(\"=\");\n        query_data[split[0]] = split[1];\n    }\n    saved_query_data = query_data;\n    return query_data;\n}\n\n\n//# sourceURL=webpack://e-sim/./src/parse-query.ts?");

/***/ }),

/***/ "./electron-simulator/electron_simulator_bg.wasm":
/*!*******************************************************!*\
  !*** ./electron-simulator/electron_simulator_bg.wasm ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"ab124c92bc1b97566b7c.wasm\";\n\n//# sourceURL=webpack://e-sim/./electron-simulator/electron_simulator_bg.wasm?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;