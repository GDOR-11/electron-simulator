mod vec2;
mod point_charge;
mod constraint;

use point_charge::PointCharge;
use vec2::Vec2;
use constraint::Constraint;

use wasm_bindgen::prelude::*;


// TODO: generalized physical constraint
// what I probably want to do is code the functions here in rust and JS side gets to choose which
// one is used. This way its easy to create new ones without much trouble, and it's pretty
// performant too

#[wasm_bindgen]
pub struct World {
    charges: Vec<PointCharge>,
    constraint: Constraint
    k: f64
}

#[wasm_bindgen]
impl World {
    #[wasm_bindgen(constructor)]
    pub fn new(k: f64, constraint: Constraint) -> Self {
        World { charges: vec![], constraint, k }
    }
    pub fn add_charge(&mut self, point: PointCharge) -> *const PointCharge {
        self.charges.push(point);
        self.charges.last().unwrap() as *const PointCharge
    }
    pub unsafe fn get_charge(ptr: *const PointCharge) -> PointCharge {
        ptr.read()
    }
    pub fn step(&mut self, dt: f64, substeps: u32) {
        let subdt = dt / substeps as f64;
        for _ in 0..substeps {
            let mut forces = vec![Vec2::new(0.0, 0.0); self.charges.len()];
            for i in 0..self.charges.len() {
                for j in i + 1..self.charges.len() {
                    let displacement = self.charges[i].pos - self.charges[j].pos;
                    let force = self.k * self.charges[i].charge * self.charges[j].charge * displacement.length().powi(-2);
                    forces[i] += force * displacement;
                    forces[j] -= force * displacement;
                }
            }
            for i in 0..self.charges.len() {
                self.charges[i].step(subdt, forces[i]);
                self.constraint.apply(&self.charges[i].pos);
            }
        }
    }
}
