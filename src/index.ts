import init, { World, Constraint, ConstraintShape, Vec3, PointCharge } from "electron-simulator"
await init();

import { render_world, render_constraint } from "./renderer";

import gui from "./gui";
const settings = {
    unboundedFPS: false,
    fps: 60,
    iterations: 16
};
(folder => {
    folder.add(settings, "unboundedFPS").onChange(val => {
        if(val) {
            (fps as any).__li.setAttribute("style", "display: none;");
        } else {
            (fps as any).__li.setAttribute("style", "display: block;");
        }
    });
    const fps = folder.add(settings, "fps", 1, 60, 1);
    folder.add(settings, "iterations", 1, 256, 1);
})(gui.addFolder("Simulation control"));


import parse_query from "./parse-query";
const sphere_size = Number(parse_query().sphere_size) || 500;
const initial_charges = Number(parse_query().initial_charges) || 64;
const k = Number(parse_query().k) || 1e7;

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
const e = 1;

render_constraint(constraint);

(folder => {
    const properties = {
        pos: { x: 0, y: 0, z: 0 },
        vel: { x: 0, y: 0, z: 0 },
        charge: -e,
        mass: 1,
        locked: false,
        create() {
            world.add_charge(new PointCharge(
                this.locked,
                new Vec3(this.pos.x, this.pos.y, this.pos.z),
                new Vec3(this.vel.x, this.vel.y, this.vel.z),
                this.charge, this.mass
            ));
        },
        get_field() {
            let field = world.get_electric_field(new Vec3(this.pos.x, this.pos.y, this.pos.z));
            alert(`${field.x}, ${field.y}, ${field.z}`);
        }
    };
    folder.add(properties.pos, "x").name("x");
    folder.add(properties.pos, "y").name("y");
    folder.add(properties.pos, "z").name("z");
    folder.add(properties.vel, "x").name("Vx");
    folder.add(properties.vel, "y").name("Vy");
    folder.add(properties.vel, "z").name("Vz");
    folder.add(properties, "charge", -10, 10);
    folder.add(properties, "mass", 1e-5, 1e2);
    folder.add(properties, "locked");
    folder.add(properties, "create").name("create charge");
    folder.add(properties, "get_field").name("get electric field");
})(gui.addFolder("Simulation interations"));


// fibonacci sphere algorithm
for (let i = 0; i < initial_charges; i++) {
    let y = 1 - 2 * i / (initial_charges - 1);
    let r = Math.sqrt(1 - y * y);
    let theta = i * Math.PI * (Math.sqrt(5) - 1);
    let x = r * Math.cos(theta);
    let z = r * Math.sin(theta);

    // I had to make it into a function because for some stupid reason I can't use Vec3 twice even though it implements Clone and Copy
    let pos = () => new Vec3(sphere_size * x, sphere_size * y, sphere_size * z);
    world.add_charge(new PointCharge(false, pos(), pos(), -e, 1));
}



let last_frames: number[] = [Date.now()];

function simulation_loop() {
    requestAnimationFrame(simulation_loop);
    if (last_frames.length > 16) {
        last_frames.shift();
    }

    let fps = settings.unboundedFPS ? Infinity : settings.fps;
    let last_frame = last_frames[last_frames.length - 1];

    if (1000 > fps * (Date.now() - last_frame) && 1000 * last_frames.length / (Date.now() - last_frames[0]) > fps) return;
    last_frames.push(Date.now());

    let dt = fps === Infinity ? (Date.now() - last_frame) / 1000 : 1 / fps;
    render_world(world);
    world.step(dt, settings.iterations);
}
requestAnimationFrame(simulation_loop);
