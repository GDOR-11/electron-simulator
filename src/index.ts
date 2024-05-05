import init, { World, Constraint, ConstraintShape, Vec3, PointCharge } from "electron-simulator"
await init();

import { render_world, render_constraint } from "./renderer";

import parse_query from "./parse-query";
const iterations = Number(parse_query().iterations) || 10;
const fps = Number(parse_query().fps) || Infinity;
const sphere_size = Number(parse_query().sphere_size) || 500;
const initial_charges = Number(parse_query().initial_charges) || 64;
const k = Number(parse_query().k) || 9e9;

const constraint = new Constraint(
    ConstraintShape.Sphere,
    new Float64Array([
        // center
        0, 0, 0,
        // radius
        sphere_size
    ])
);
const world = new World(k, constraint.clone());
const e = 0.01;

render_constraint(constraint);

window.addEventListener("keydown", event => {
    if (event.key !== " ") return;
    let pos = () => new Vec3(0, 0, 0);
    world.add_charge(new PointCharge(false, pos(), pos(), -e));
});


// fibonacci sphere algorithm
for (let i = 0; i < initial_charges; i++) {
    let y = 1 - 2 * i / (initial_charges - 1);
    let r = Math.sqrt(1 - y * y);
    let theta = i * Math.PI * (Math.sqrt(5) - 1);
    let x = r * Math.cos(theta);
    let z = r * Math.sin(theta);

    // I had to make it into a function because for some stupid reason I can't use Vec3 twice even though it implements Clone and Copy
    let pos = () => new Vec3(sphere_size * x, sphere_size * y, sphere_size * z);
    world.add_charge(new PointCharge(false, pos(), pos(), -e));
}


let start = Date.now();
let frame_count = 0;
let last_frame = start;
let visible = true;
let becameVisible = false;

document.onvisibilitychange = () => [visible, becameVisible] = [!visible, !visible];

// some complex logic to ensure that FPS handling is as good as possible
// I wrote this a while ago, so I'm not sure exactly what it does, but it works lmao
function simulation_loop() {
    requestAnimationFrame(simulation_loop);

    if (!visible || becameVisible) {
        frame_count += fps * (Date.now() - last_frame) / 1000;
        last_frame = Date.now();
        if (becameVisible) becameVisible = false;
        if (fps === Infinity) return;
    }

    if (1000 * frame_count / (Date.now() - start) > fps) return;
    frame_count++;

    let dt = fps === Infinity ? (Date.now() - last_frame) / 1000 : 1 / fps;
    last_frame = Date.now();

    render_world(world);
    world.step(dt, iterations);
}
requestAnimationFrame(simulation_loop);
