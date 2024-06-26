use crate::Vec3;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Clone, Copy)]
pub enum ConstraintShape {
    Sphere
}

#[wasm_bindgen]
pub struct Constraint {
    pub shape: ConstraintShape,
    data: Vec<f64> 
}

#[wasm_bindgen]
impl Constraint {
    #[wasm_bindgen(constructor)]
    pub fn new(shape: ConstraintShape, data: &[f64]) -> Self {
        Self { shape, data: data.to_owned() }
    }
    pub fn clone(&self) -> Self {
        Self { shape: self.shape, data: self.data.clone() }
    }
    pub fn get_data(&self, index: usize) -> f64 {
        self.data[index]
    }
    pub fn apply(&self, point: &mut Vec3) {
        match self.shape {
            ConstraintShape::Sphere => {
                let (center, radius) = ( Vec3::new(self.data[0], self.data[1], self.data[2]), self.data[3] );
                let offset = *point - center;
                let distance = offset.length();
                if distance > radius {
                    *point = center + offset * (radius / distance);
                }
            }
        }
    }
}
