import parse_query from "./parse-query";

import init, { World, Constraint, ConstraintShape, Vec3, PointCharge } from "electron-simulator"
await init();



const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

let width = window.innerWidth;
let height = window.innerHeight;
function resize_canvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener("resize", resize_canvas);
resize_canvas();


const iterations = Number(parse_query().iterations) || 1;
const fps = Number(parse_query().fps) || Infinity;
const FOV = Number(parse_query().FOV) || 800;
const charge_radius = Number(parse_query().radius) || 10;

const constraint = new Constraint(
    ConstraintShape.Sphere,
    new Float64Array([width / 2, height / 2, 0, Math.min(width, height) / 2])
);
const world = new World(9e9, constraint.clone());
const e = 0.01;


/** array of indexes of the array in rust */
let charges: number[] = [];

window.addEventListener("mousedown", event => {
    charges.push(world.add_charge(new PointCharge(false, new Vec3(event.x, event.y, 0.1), new Vec3(event.x, event.y, 0.1), -e)));
});

for(let a = 0;a < 1.99999 * Math.PI;a += Math.PI / 64) {
    let x = width / 2 + height / 2 * Math.cos(a);
    let y = height / 2 + height / 2 * Math.sin(a);
    charges.push(world.add_charge(new PointCharge(false, new Vec3(x, y, 0), new Vec3(x, y, 0), -e)));
}


function render_constraint() {
    if (constraint.shape === ConstraintShape.Sphere) {
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.arc(constraint.get_data(0), constraint.get_data(1), constraint.get_data(3), 0, 2 * Math.PI);
        ctx.fill();
    }
}
function render_charges() {
    for (let idx of charges) {
        let charge = world.get_charge(idx);
        ctx.fillStyle = charge.charge > 0 ? "red" : "yellow";
        ctx.beginPath();
        ctx.arc(charge.pos.x, charge.pos.y, charge_radius * FOV / (charge.pos.z + FOV), 0, 2 * Math.PI);
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
