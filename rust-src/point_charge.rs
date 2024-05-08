use crate::Vec3;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct PointCharge {
    pub locked: bool,
    pub pos: Vec3,
    pub last_pos: Vec3,
    pub charge: f64,
    pub mass: f64,
    last_dt: f64
}

#[wasm_bindgen]
impl PointCharge {
    #[wasm_bindgen(constructor)]
    pub fn new(locked: bool, pos: Vec3, velocity: Vec3, charge: f64, mass: f64) -> PointCharge {
        PointCharge { locked, pos, last_pos: pos - velocity, charge, mass, last_dt: -1.0 }
    }
    pub fn step(&mut self, dt: f64, acceleration: Vec3) {
        if self.locked { return; }
        if self.last_dt == -1.0 { self.last_dt = dt; }

        let pos = self.pos;
        self.pos = self.pos + (self.pos - self.last_pos) * dt / self.last_dt + 0.5 * acceleration * dt * (dt + self.last_dt);
        self.last_pos = pos;
        self.last_dt = dt;
    }
}
