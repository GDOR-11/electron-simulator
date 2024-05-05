import init, { World, Constraint, ConstraintShape, Vec3, PointCharge } from "electron-simulator"
await init();

import render_world from "./renderer";

import parse_query from "./parse-query";
const iterations = Number(parse_query().iterations) || 1;
const fps = Number(parse_query().fps) || Infinity;


const constraint = new Constraint(
    ConstraintShape.Sphere,
    new Float64Array([
        // center
        window.innerWidth / 2, window.innerHeight / 2, 0,
        // radius
        Math.min(window.innerWidth, window.innerHeight) / 2
    ])
);
const world = new World(9e9, constraint.clone());
const e = 0.01;


window.addEventListener("mousedown", event => {
    world.add_charge(
        new PointCharge(
            false,
            new Vec3(event.x, event.y, 0.1),
            new Vec3(event.x, event.y, 0.1),
            -e
        )
    );
});

for (let a = 0; a < 1.99999 * Math.PI; a += Math.PI / 64) {
    let x = window.innerWidth / 2 + window.innerHeight / 2 * Math.cos(a);
    let y = window.innerHeight / 2 + window.innerHeight / 2 * Math.sin(a);

    world.add_charge(
        new PointCharge(
            false,
            new Vec3(x, y, 0),
            new Vec3(x, y, 0),
            -e
        )
    );
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
