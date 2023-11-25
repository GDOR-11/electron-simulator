import "./canvas-resizer.js";
import parse_query from "./parse-query.js";

import init, {World, Vec2, Point, Joint} from "./pkg/verlet_solver.js";
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
const pendulum_canvas = document.getElementById("pendulum-canvas");
const pendulum_ctx = pendulum_canvas.getContext("2d");
/** @type{HTMLCanvasElement} */
const trail_canvas = document.getElementById("trail-canvas");
const trail_ctx = trail_canvas.getContext("2d", { willReadFrequently: true });

const amount = Number(parse_query().amount) || 4;
const iterations = Number(parse_query().iterations) || 1024;
const fps = Number(parse_query().fps) || Infinity;

const world = new World(new Vec2(0, 500));

/**
 * array of pointers to the points
 * @type {number[]}
 */
let points = [];

function initialize_pendulum(amount) {
    amount++; // points = pendulums + 1
    let length = Math.min(width / 2, height * 0.9);
    for(let i = 0;i < amount;i++) {
        let position = new Vec2(width / 2 + length * i / (amount - 1), height * 0.1);
        points[i] = world.add_point(new Point(i == 0, position, new Vec2(position.x, position.y)));
    }
    for(let i = 0;i < points.length - 1;i++) {
        world.add_joint(new Joint(points[i], points[i + 1]));
    }
}

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
