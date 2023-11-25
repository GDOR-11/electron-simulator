mod vec2;
mod point;
mod joint;

use vec2::Vec2;
use point::Point;
use joint::Joint;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct World {
    points: Vec<Point>,
    joints: Vec<Joint>,
    pub gravity: Vec2
}

#[wasm_bindgen]
impl World {
    #[wasm_bindgen(constructor)]
    pub fn new(gravity: Vec2) -> Self {
        World { points: vec![], joints: vec![], gravity }
    }
    pub fn add_point(&mut self, point: Point) -> *const Point {
        self.points.push(point);
        self.points.last().unwrap() as *const Point
    }
    pub fn add_joint(&mut self, joint: Joint) -> *const Joint {
        self.joints.push(joint);
        self.joints.last().unwrap() as *const Joint
    }
    pub unsafe fn get_point(ptr: *const Point) -> Point {
        ptr.read()
    }
    pub fn step(&mut self, dt: f64, substeps: u32) {
        let subdt = dt / substeps as f64;
        for _ in 0..substeps {
            for point in &mut self.points {
                point.step(subdt, self.gravity);
            }
            for joint in &mut self.joints {
                joint.apply_constraint();
            }
        }
    }
}
