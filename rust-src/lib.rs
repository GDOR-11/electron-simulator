mod vec3;
mod point_charge;
mod constraint;

use point_charge::PointCharge;
use vec3::Vec3;
use constraint::Constraint;

use wasm_bindgen::prelude::*;


#[wasm_bindgen]
pub struct World {
    charges: Vec<PointCharge>,
    constraint: Constraint,
    pub k: f64
}

#[wasm_bindgen]
impl World {
    #[wasm_bindgen(constructor)]
    pub fn new(k: f64, constraint: Constraint) -> Self {
        World { charges: vec![], constraint, k }
    }
    pub fn add_charge(&mut self, point: PointCharge) -> usize {
        self.charges.push(point);
        self.charges.len() - 1
    }
    pub unsafe fn get_charge(&self, index: usize) -> PointCharge {
        self.charges[index]
    }
    pub fn get_constraint(&self) -> Constraint {
        self.constraint.clone()
    }
    pub fn charge_count(&self) -> usize {
        self.charges.len()
    }
    pub fn get_electric_field(&self, point: Vec3) -> Vec3 {
        let mut electric_field = Vec3::new(0.0, 0.0, 0.0);
        for charge in &self.charges {
            let displacement = charge.pos - point;
            electric_field += displacement * self.k * charge.charge * displacement.sq_length().powf(-1.5);
        }
        electric_field
    }
    pub fn step(&mut self, dt: f64, substeps: u32) {
        let subdt = dt / substeps as f64;
        for _ in 0..substeps {
            let mut forces = vec![Vec3::new(0.0, 0.0, 0.0); self.charges.len()];
            for i in 0..self.charges.len() {
                for j in i + 1..self.charges.len() {
                    let displacement = self.charges[i].pos - self.charges[j].pos;
                    let force = displacement * (self.k * self.charges[i].charge * self.charges[j].charge * displacement.sq_length().powf(-1.5));
                    forces[i] += force;
                    forces[j] -= force;
                }
            }
            for i in 0..self.charges.len() {
                self.charges[i].step(subdt, forces[i]);
                self.constraint.apply(&mut self.charges[i].pos);
            }
        }
    }
}
