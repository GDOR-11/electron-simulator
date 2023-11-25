use super::vec2::Vec2;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Point {
    pub locked: bool,
    pub pos: Vec2,
    pub last_pos: Vec2,
}

#[wasm_bindgen]
impl Point {
    #[wasm_bindgen(constructor)]
    pub fn new(locked: bool, pos: Vec2, last_pos: Vec2) -> Point {
        Point { locked, pos, last_pos }
    }
    pub fn step(&mut self, dt: f64, force: Vec2) {
        if self.locked { return; }

        let pos = self.pos;
        self.pos = 2.0 * self.pos - self.last_pos + force * dt * dt;
        self.last_pos = pos;
    }
}
