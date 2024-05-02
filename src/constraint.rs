pub trait Constraint {
    pub fn apply(&self, point: &mut Vec2);
}

pub struct Circle {
    pub center: Vec2,
    pub radius: f64
}
impl Constraint for Circle {
    pub fn apply(&self, point: &mut Vec2) {
        let offset = point - self.center;
        let distance = offset.length();
        if distance > self.radius {
            *point = self.center + offset * (radius / distance);
        }
    }
}
