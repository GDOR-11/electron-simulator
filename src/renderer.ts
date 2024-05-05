import { Constraint, ConstraintShape, World } from "electron-simulator";

import parse_query from "./parse-query";
const charge_radius = Number(parse_query().radius) || 10;
const sphere_size = Number(parse_query().sphere_size) || 500;
const FOV = Number(parse_query().FOV) || 60;
const max_charges = Number(parse_query().max_charges) || 1024;

import * as THREE from "three";

const canvas = document.getElementsByTagName("canvas")[0];
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas
});
console.log(window.innerWidth, window.innerHeight);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);



import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const camera = new THREE.PerspectiveCamera(FOV, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set(0, 0, 1500);

const controls = new OrbitControls(camera, canvas);
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.1;


window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
});




const scene = new THREE.Scene();

const charges_mesh = new THREE.InstancedMesh(
    new THREE.SphereGeometry(charge_radius),
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    max_charges
);
charges_mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
scene.add(charges_mesh);



export function render_constraint(constraint: Constraint) {
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.1 });
    if (constraint.shape === ConstraintShape.Sphere) {
        scene.add(new THREE.Mesh(
            new THREE.SphereGeometry(sphere_size),
            material
        ));
    }
}

function update_charges(world: World) {
    charges_mesh.count = world.charge_count();

    let dummy = new THREE.Object3D();
    for (let i = 0; i < world.charge_count(); i++) {
        let charge = world.get_charge(i);

        dummy.position.set(charge.pos.x, charge.pos.y, charge.pos.z);
        dummy.updateMatrix();

        charges_mesh.setMatrixAt(i, dummy.matrix);
    }

    charges_mesh.instanceMatrix.needsUpdate = true;
}
export function render_world(world: World) {
    update_charges(world);

    controls.update();
    renderer.render(scene, camera);
}
