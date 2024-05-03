import parse_query from "./parse-query.js";

import init, { World, Constraint, ConstraintShape, Vec2, PointCharge } from "./pkg/electron_simulator.js";
await init();


/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let width, height;
(() => {
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    window.addEventListener("resize", resize);
    resize();
})();


const iterations = Number(parse_query().iterations) || 1;
const fps = Number(parse_query().fps) || Infinity;

const constraint = new Constraint(
    ConstraintShape.Circle,
    new Float64Array([width / 2, height / 2, Math.min(width, height) / 2])
);
const world = new World(9e9, constraint.clone());

/**
 * array of indexes of the array in rust
 * @type {number[]}
 */
let charges = [];

window.idk = 0.01;
window.addEventListener("mousedown", event => {
    charges.push(world.add_charge(new PointCharge(false, new Vec2(event.x, event.y), new Vec2(event.x, event.y), window.idk)));
});

for(let a = 0;a < 1.99999 * Math.PI;a += Math.PI / 32) {
    let x = width / 2 + height / 2 * Math.cos(a);
    let y = height / 2 + height / 2 * Math.sin(a);
    charges.push(world.add_charge(new PointCharge(false, new Vec2(x, y), new Vec2(x, y), window.idk)));
}


function render_constraint() {
    if (constraint.shape === ConstraintShape.Circle) {
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.arc(constraint.get_data(0), constraint.get_data(1), constraint.get_data(2), 0, 2 * Math.PI);
        ctx.fill();
    }
}
function render_charges() {
    for (let idx of charges) {
        let charge = world.get_charge(idx);
        ctx.fillStyle = charge.charge > 0 ? "red" : "yellow";
        ctx.beginPath();
        ctx.arc(charge.pos.x, charge.pos.y, 10, 0, 2 * Math.PI);
        ctx.fill();
    }
}


let start = Date.now();
let frame_count = 0;
let last_frame = start;
let visible = true;
let becameVisible = false;

document.onvisibilitychange = () => [visible, becameVisible] = [!visible, !visible];

function simulation_loop() {
    requestAnimationFrame(simulation_loop);

    if (!visible || becameVisible) {
        frame_count += fps * (Date.now() - last_frame) / 1000;
        last_frame = Date.now();
        if (becameVisible) becameVisible = false;
        if (fps == Infinity) return;
    }

    if (1000 * frame_count / (Date.now() - start) > fps) return;
    frame_count++;

    let dt = fps == Infinity ? (Date.now() - last_frame) / 1000 : 1 / fps;
    last_frame = Date.now();

    ctx.clearRect(0, 0, width, height);
    render_constraint();
    render_charges();
    world.step(dt, iterations);
}
requestAnimationFrame(simulation_loop);
