/* eslint-disable react-hooks/immutability -- Rapier and Three expose mutable simulation objects. */
import { useRef, useEffect, useMemo } from "react";
import { useFrame, useThree, type ThreeEvent } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import type { RapierRigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { SEModel } from "./SEModel";
import { SE, REST, INITIAL } from "./seGeometry";
import { EarPods } from "./EarPods";
export function Phone({ onDrag }: { onDrag: (v: boolean) => void }) {
  const body = useRef<RapierRigidBody>(null!),
    { camera, gl } = useThree(),
    restRotation = useRef(INITIAL.clone());
  const cableBounds = useRef<THREE.Vector3[]>([]);
  const gesture = useRef<{
    id: number;
    x: number;
    y: number;
    active: boolean;
    local: THREE.Vector3;
    target: THREE.Vector3;
  } | null>(null);
  const temp = useMemo(
    () => ({
      ray: new THREE.Raycaster(),
      plane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
      point: new THREE.Vector3(),
      ndc: new THREE.Vector2(),
    }),
    [],
  );
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const g = gesture.current;
      if (!g || g.id !== e.pointerId) return;
      const dx = e.clientX - g.x,
        dy = e.clientY - g.y;
      if (!g.active && Math.hypot(dx, dy) < 6) return;
      g.active = true;
      onDrag(true);
      const r = gl.domElement.getBoundingClientRect();
      temp.ndc.set(
        ((e.clientX - r.left) / r.width) * 2 - 1,
        (-(e.clientY - r.top) / r.height) * 2 + 1,
      );
      temp.ray.setFromCamera(temp.ndc, camera);
      if (temp.ray.ray.intersectPlane(temp.plane, temp.point)) {
        g.target.copy(temp.point);
        const limit = r.width < 700 ? 1 : 1.75;
        g.target.x = THREE.MathUtils.clamp(g.target.x, -limit, limit);
        g.target.y = THREE.MathUtils.clamp(g.target.y, -0.4, 2.3);
      }
      body.current?.wakeUp();
    };
    const release = (e?: PointerEvent | FocusEvent) => {
      const g = gesture.current;
      if (!g || (e && "pointerId" in e && e.pointerId !== g.id)) return;
      gesture.current = null;
      onDrag(false);
      if (gl.domElement.hasPointerCapture(g.id))
        gl.domElement.releasePointerCapture(g.id);
    };
    const prevent = (e: TouchEvent) => {
      if (gesture.current) e.preventDefault();
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", release);
    window.addEventListener("pointercancel", release);
    window.addEventListener("blur", release);
    gl.domElement.addEventListener("touchstart", prevent, { passive: false });
    gl.domElement.addEventListener("touchmove", prevent, { passive: false });
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", release);
      window.removeEventListener("pointercancel", release);
      window.removeEventListener("blur", release);
      gl.domElement.removeEventListener("touchstart", prevent);
      gl.domElement.removeEventListener("touchmove", prevent);
    };
  }, [gl, camera, temp, onDrag]);
  const grab = (e: ThreeEvent<PointerEvent>) => {
    if (e.button !== 0 || gesture.current) return;
    e.stopPropagation();
    const p = new THREE.Vector3().copy(body.current.translation()),
      q = new THREE.Quaternion().copy(body.current.rotation()),
      local = e.point.clone().sub(p).applyQuaternion(q.clone().invert());
    gesture.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      active: false,
      local,
      target: e.point.clone(),
    };
    gl.domElement.setPointerCapture(e.pointerId);
  };
  useFrame((_, dt) => {
    const b = body.current;
    if (!b) return;
    const p = new THREE.Vector3().copy(b.translation()),
      q = new THREE.Quaternion().copy(b.rotation()),
      v = new THREE.Vector3().copy(b.linvel()),
      g = gesture.current,
      h = Math.min(dt, 1 / 30);
    // A prescribed pose prevents cable constraints from shaking the phone at rest.
    const desiredPosition = g?.active
      ? g.target.clone().sub(g.local.clone().applyQuaternion(q))
      : REST.clone();
    desiredPosition.x = THREE.MathUtils.clamp(desiredPosition.x, -1.2, 1.2);
    desiredPosition.y = THREE.MathUtils.clamp(desiredPosition.y, -0.4, 1);
    const desiredRotation = g?.active
      ? new THREE.Quaternion().setFromEuler(new THREE.Euler(
          -0.1 + (g.target.y - REST.y) * 0.12,
          -0.28 + (g.target.x - REST.x) * 0.18,
          -0.32 - (g.target.x - REST.x) * 0.22,
        ))
      : restRotation.current;
    const blend = 1 - Math.exp(-9 * h);
    p.lerp(desiredPosition, blend);
    q.slerp(desiredRotation, blend);
    if (!g?.active && p.distanceTo(REST) < 0.0001) p.copy(REST);
    if (!g?.active && q.angleTo(desiredRotation) < 0.0001) q.copy(desiredRotation);
    b.setNextKinematicTranslation(p);
    b.setNextKinematicRotation(q);
    const corners = [];
    for (const x of [-SE.width / 2, SE.width / 2])
      for (const y of [-SE.height / 2 - 0.32, SE.height / 2])
        for (const z of [-SE.depth / 2, SE.depth / 2])
          corners.push(new THREE.Vector3(x, y, z).applyQuaternion(q).add(p));
    // Fit the whole arrangement from viewport dimensions, independently of cable motion.
    const cameraDistance = camera instanceof THREE.PerspectiveCamera
      ? Math.max(11, 3.35 / Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)),
          2.9 / (Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect))
      : 11;
    if (camera.position.z !== cameraDistance) {
      camera.position.z = cameraDistance;
      camera.updateMatrixWorld();
    }
    if (import.meta.env.DEV) {
      const grip = new THREE.Vector3(SE.width / 2 - 0.04, 0, SE.depth / 2)
        .applyQuaternion(q)
        .add(p)
        .project(camera);
      gl.domElement.dataset.physics = JSON.stringify({
        phone: p,
        cameraZ: camera.position.z,
        rotation: q,
        dragging: !!g?.active,
        velocity: v,
        corners: corners.map((c) => c.project(camera)),
        grip,
        dimensions: SE,
        screenNormal: new THREE.Vector3(0, 0, 1).applyQuaternion(q),
        rest: REST,
      });
    }
  });
  return (
    <>
      <RigidBody
        ref={body}
        type="kinematicPosition"
        position={REST.toArray()}
        quaternion={INITIAL.toArray()}
        colliders={false}
        linearDamping={0.4}
        angularDamping={0.7}
        ccd
      >
        <CuboidCollider
          args={[SE.width / 2, SE.height / 2, SE.depth / 2]}
          mass={0.113}
          collisionGroups={0x00010002}
        />
        <SEModel onDown={grab} />
      </RigidBody>
      <EarPods phone={body} bounds={cableBounds} />
    </>
  );
}
