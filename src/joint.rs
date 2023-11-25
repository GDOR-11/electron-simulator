use crate::point::Point;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Joint {
    a: &'static mut Point,
    b: &'static mut Point,
    half_length: f64
}

#[wasm_bindgen]
impl Joint {
    #[wasm_bindgen(constructor)]
    pub unsafe fn new(a: *mut Point, b: *mut Point) -> Self {
        let half_length = (a.read().pos - b.read().pos).length() / 2.0;
        Joint { a: a.as_mut().unwrap(), b: b.as_mut().unwrap(), half_length }
    }
    pub fn apply_constraint(&mut self) {
        let mut offset = (self.b.pos - self.a.pos) * (0.5 - self.half_length / (self.a.pos - self.b.pos).length());
        if self.a.locked ^ self.b.locked { offset *= 2.0; }

        if !self.a.locked {
            self.a.pos += offset;
        }
        if !self.b.locked {
            self.b.pos -= offset;
        }
    }
}
