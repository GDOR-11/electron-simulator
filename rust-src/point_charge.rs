use crate::Vec3;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub struct PointCharge {
    pub locked: bool,
    pub pos: Vec3,
    pub last_pos: Vec3,
    pub charge: f64
}

#[wasm_bindgen]
impl PointCharge {
    #[wasm_bindgen(constructor)]
    pub fn new(locked: bool, pos: Vec3, last_pos: Vec3, charge: f64) -> PointCharge {
        PointCharge { locked, pos, last_pos, charge }
    }
    pub fn step(&mut self, dt: f64, force: Vec3) {
        if self.locked { return; }

        let pos = self.pos;
        self.pos = 2.0 * self.pos - self.last_pos + force * dt * dt;
        self.last_pos = pos;
    }
}
