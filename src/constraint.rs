use crate::Vec2;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub enum ConstraintShape {
    Circle
}

#[wasm_bindgen]
pub struct Constraint {
    pub shape: ConstraintShape,
    data: Vec<f64> 
}

// its a pain in the ass to make the data visible to the JS side, so I did this to make it visible
// only to rust
impl Constraint {
    pub fn get_data(&self) -> &[f64] {
        self.data.as_slice()
    }
}

#[wasm_bindgen]
impl Constraint {
    pub fn new(shape: ConstraintShape, data: &[f64]) -> Self {
        Self { shape, data: data.to_owned() }
    }
    pub fn apply(&self, point: &mut Vec2) {
        match self.shape {
            ConstraintShape::Circle => {
                let (center, radius) = ( Vec2::new(self.data[0], self.data[1]), self.data[2] );
                let offset = *point - center;
                let distance = offset.length();
                if distance > radius {
                    *point = center + offset * (radius / distance);
                }
            }
        }
    }
}
