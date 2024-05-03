import parse_query from "./parse-query.js";

import init, {World, Constraint, ConstraintShape, Vec2, PointCharge} from "./pkg/electron_simulator.js";
await init();

let width, height;
(() => {
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();
})();

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fps = Number(parse_query().fps) || Infinity;

const constraint = new Constraint(
    ConstraintShape.Circle,
    new Float64Array([ width / 2, height / 2, Math.min(width, height) / 2 ])
);
const world = new World(9e9, constraint);

/**
 * array of pointers to the points
 * @type {number[]}
 */
let charges = [];
charges.push(world.add_charge(new PointCharge(false, new Vec2(0.0, 0.0), new Vec2(0.0, 0.0))));
console.log(World.get_charge(charges[0]));

initialize_pendulum(amount);

/** @type {Vec2 || null} */
let last_pos = null;
function render_pendulum() {
    pendulum_ctx.clearRect(0, 0, width, height);

    pendulum_ctx.lineWidth = 3;
    pendulum_ctx.strokeStyle = "grey";
    pendulum_ctx.beginPath();
    for(let i = 0;i < points.length;i++) {
        let point = World.get_point(points[i]);
        if(i == 0) {
            pendulum_ctx.moveTo(point.pos.x, point.pos.y);
        } else {
            pendulum_ctx.lineTo(point.pos.x, point.pos.y);
        }
    }
    pendulum_ctx.stroke();

    pendulum_ctx.fillStyle = "yellow";
    for(let i = 0;i < points.length;i++) {
        let point = World.get_point(points[i]);
        pendulum_ctx.beginPath();
        pendulum_ctx.arc(point.pos.x, point.pos.y, 6, 0, 2 * Math.PI);
        pendulum_ctx.fill();

        if(i == 0) {
            pendulum_ctx.moveTo(point.pos.x, point.pos.y);
        } else {
            pendulum_ctx.lineTo(point.pos.x, point.pos.y);
        }
    }

    let point = World.get_point(points[points.length - 1]);

    if(!last_pos) last_pos = point.pos;

    trail_ctx.strokeStyle = "blue";
    trail_ctx.lineWidth = 1;

    trail_ctx.beginPath();
    trail_ctx.moveTo(last_pos.x, last_pos.y);
    trail_ctx.lineTo(point.pos.x, point.pos.y);
    trail_ctx.stroke();

    last_pos = point.pos;
}




let start = Date.now();
let frame_count = 0;
let last_frame = start;
let visible = true;
let becameVisible = false;

document.onvisibilitychange = () => [visible, becameVisible] = [!visible, !visible];

function simulation_loop() {
    requestAnimationFrame(simulation_loop);
    
    if(!visible || becameVisible) {
        frame_count += fps * (Date.now() - last_frame) / 1000;
        last_frame = Date.now();
        if(becameVisible) becameVisible = false;
        if(fps == Infinity) return;
    }

    if(1000 * frame_count / (Date.now() - start) > fps) return;
    frame_count++;

    let dt = fps == Infinity ? (Date.now() - last_frame) / 1000 : 1 / fps;
    last_frame = Date.now();

    render_pendulum();
    world.step(dt, iterations);
}
requestAnimationFrame(simulation_loop);
