import { Constraint, ConstraintShape, World } from "electron-simulator";
import parse_query from "./parse-query";

const charge_radius = Number(parse_query().radius) || 10;
const FOV = Number(parse_query().FOV) || 1250;

const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function render_constraint(constraint: Constraint) {
    if (constraint.shape === ConstraintShape.Sphere) {
        ctx.fillStyle = "grey";
        ctx.beginPath();
        ctx.arc(constraint.get_data(0), constraint.get_data(1), constraint.get_data(3), 0, 2 * Math.PI);
        ctx.fill();
    }
}
function render_charges(world: World) {
    for (let i = 0; i < world.charge_count(); i++) {
        let charge = world.get_charge(i);
        ctx.fillStyle = charge.charge > 0 ? "red" : "yellow";
        ctx.beginPath();
        ctx.arc(charge.pos.x, charge.pos.y, charge_radius * FOV / (charge.pos.z + FOV), 0, 2 * Math.PI);
        ctx.fill();
    }
}

export default function render_world(world: World) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    render_constraint(world.get_constraint());
    render_charges(world);
}
