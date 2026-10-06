import * as THREE from "three";
// Apple iPhone SE (2016): every dimension uses one uniform mm conversion.
export const SE = {
  mmScale: 0.03,
  width: 58.6 * 0.03,
  height: 123.8 * 0.03,
  depth: 7.6 * 0.03,
  screenWidth: 49.9 * 0.03,
  screenHeight: 88.6 * 0.03,
  corner: 5.8 * 0.03,
};
export function roundedShape(width: number, height: number, radius: number) {
  const x = -width / 2,
    y = -height / 2,
    r = radius,
    s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + width - r, y);
  s.quadraticCurveTo(x + width, y, x + width, y + r);
  s.lineTo(x + width, y + height - r);
  s.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  s.lineTo(x + r, y + height);
  s.quadraticCurveTo(x, y + height, x, y + height - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}
export function frameGeometry() {
  const bevel = 0.012,
    depth = SE.depth - 0.004 - 2 * bevel;
  const g = new THREE.ExtrudeGeometry(
    roundedShape(
      SE.width - 2 * bevel,
      SE.height - 2 * bevel,
      SE.corner - bevel,
    ),
    {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 1,
      curveSegments: 20,
    },
  );
  g.translate(0, 0, -depth / 2);
  g.computeVertexNormals();
  return g;
}
export function faceGeometry(width: number, height: number, radius: number) {
  const g = new THREE.ShapeGeometry(roundedShape(width, height, radius), 24),
    p = g.getAttribute("position"),
    uv = g.getAttribute("uv");
  for (let i = 0; i < p.count; i++)
    uv.setXY(
      i,
      (p.getX(i) + width / 2) / width,
      (p.getY(i) + height / 2) / height,
    );
  return g;
}
export function appleShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.2);
  s.bezierCurveTo(0.15, 0.35, 0.4, 0.32, 0.46, 0.2);
  s.bezierCurveTo(0.27, 0.13, 0.26, -0.1, 0.47, -0.14);
  s.bezierCurveTo(0.35, -0.45, 0.18, -0.53, 0, -0.44);
  s.bezierCurveTo(-0.2, -0.55, -0.42, -0.45, -0.48, -0.18);
  s.bezierCurveTo(-0.63, 0.1, -0.48, 0.34, -0.23, 0.31);
  s.bezierCurveTo(-0.12, 0.29, -0.08, 0.2, 0, 0.2);
  s.closePath();
  s.moveTo(0.01, 0.33);
  s.bezierCurveTo(0.02, 0.51, 0.16, 0.6, 0.29, 0.6);
  s.bezierCurveTo(0.3, 0.43, 0.13, 0.33, 0.01, 0.33);
  return s;
}
export const JACK: [number, number, number] = [-0.644, -SE.height / 2, 0];
export const CABLE_START: [number, number, number] = [
  -0.644,
  -SE.height / 2 - 0.32,
  0,
];

export const REST = new THREE.Vector3(0, 0.65, 0);
export const INITIAL = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(-0.1, -0.28, -0.32),
);

export function rearBandGeometry() {
  const w = SE.width - 0.03,
    h = 0.505,
    r = SE.corner - 0.012,
    x = -w / 2,
    y = -h / 2,
    s = new THREE.Shape();
  s.moveTo(x, y);
  s.lineTo(x + w, y);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y);
  return new THREE.ShapeGeometry(s, 24);
}
