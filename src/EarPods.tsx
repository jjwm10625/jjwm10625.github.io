/* eslint-disable react-hooks/immutability -- Mutable Rapier bodies and Three geometry are simulation state. */
import { useMemo, useRef, useEffect, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import {
  RigidBody,
  CapsuleCollider,
  BallCollider,
  useSphericalJoint,
  type RapierRigidBody,
} from "@react-three/rapier";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import { CABLE_START, REST, INITIAL } from "./seGeometry";
type BodyRef = RefObject<RapierRigidBody>;
type Segment = {
  ref: BodyRef;
  position: THREE.Vector3;
  rotation: THREE.Quaternion;
  length: number;
};
function path(points: THREE.Vector3[], count: number): Segment[] {
  const curve = new THREE.CatmullRomCurve3(points),
    p = curve.getSpacedPoints(count);
  return Array.from({ length: count }, (_, i) => ({
    ref: { current: null! },
    position: p[i]
      .clone()
      .add(p[i + 1])
      .multiplyScalar(0.5),
    length: p[i].distanceTo(p[i + 1]),
    rotation: new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      p[i]
        .clone()
        .sub(p[i + 1])
        .normalize(),
    ),
  }));
}
function Joint({
  a,
  b,
  pa,
  pb,
}: {
  a: BodyRef;
  b: BodyRef;
  pa: [number, number, number];
  pb: [number, number, number];
}) {
  useSphericalJoint(a, b, [pa, pb]);
  return null;
}
export function Earbud({ side }: { side: "L" | "R" }) {
  const grille = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#202326";
    ctx.fillRect(0, 0, 128, 128);
    for (let y = 0; y < 128; y += 8) {
      for (let x = 0; x < 128; x += 8) {
        ctx.fillStyle = "#5a5d60";
        ctx.beginPath();
        ctx.arc(x + (y % 16 ? 4 : 0), y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);
  useEffect(() => () => grille.dispose(), [grille]);
  return (
    <group scale={[side === "L" ? -1 : 1, 1, 1]}>
      {/* Broad, rounded EarPods shell and its tapered acoustic outlet. */}
      <mesh position={[0, 0.12, 0]} scale={[0.174, 0.164, 0.127]}>
        <sphereGeometry args={[1, 48, 32]} />
        <meshPhysicalMaterial color="#fafafa" roughness={0.19} clearcoat={1} clearcoatRoughness={0.12} />
      </mesh>
      <group position={[0.105, 0.13, 0.036]} scale={[0.079, 0.113, 0.1]}>
        {/* The grille follows a recessed spherical cap instead of a projecting flat disc. */}
        <mesh rotation={[0, 0, -Math.PI / 2]}>
          <sphereGeometry args={[1, 48, 32, 0, Math.PI * 2, 0.6, Math.PI - 0.6]} />
          <meshPhysicalMaterial color="#fafafa" roughness={0.19} clearcoat={1} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[0, 0, -Math.PI / 2]}>
          <sphereGeometry args={[0.994, 48, 20, 0, Math.PI * 2, 0, 0.61]} />
          <meshStandardMaterial map={grille} roughness={0.8} />
        </mesh>
      </group>
      {/* Horizontal side grille, as on the supplied headphone-plug EarPods. */}
      <RoundedBox args={[0.077, 0.031, 0.006]} radius={0.014} smoothness={5} position={[-0.058, 0.137, 0.119]} rotation={[0, -0.25, 0]}>
        <meshStandardMaterial map={grille} roughness={0.7} />
      </RoundedBox>
      <mesh position={[-0.025, -0.075, 0]}>
        <cylinderGeometry args={[0.044, 0.036, 0.29, 32]} />
        <meshPhysicalMaterial color="#fafafa" roughness={0.22} clearcoat={0.8} />
      </mesh>
      <mesh position={[-0.014, -0.008, -0.005]} scale={[0.058, 0.13, 0.052]}>
        <sphereGeometry args={[1, 32, 24]} />
        <meshPhysicalMaterial color="#fafafa" roughness={0.22} clearcoat={0.8} />
      </mesh>
      <mesh position={[-0.011, -0.234, 0]}>
        <cylinderGeometry args={[0.027, 0.023, 0.045, 24]} />
        <meshStandardMaterial color="#e6e7e7" roughness={0.38} />
      </mesh>
      <RoundedBox args={[0.006, 0.048, 0.003]} radius={0.002} position={[-0.047, -0.15, 0.03]}>
        <meshStandardMaterial color="#b8babc" roughness={0.65} />
      </RoundedBox>
      <RoundedBox args={[0.007, 0.039, 0.003]} radius={0.003} position={[0, 0.205, -0.113]}>
        <meshStandardMaterial color="#494b4d" roughness={0.7} />
      </RoundedBox>
    </group>
  );
}

export function EarPods({
  phone,
  bounds,
}: {
  phone: BodyRef;
  bounds: RefObject<THREE.Vector3[]>;
}) {
  const left = useRef<RapierRigidBody>(null!),
    right = useRef<RapierRigidBody>(null!),
    tubes = useRef<THREE.Mesh[]>([]);
  const data = useMemo(() => {
    const start = new THREE.Vector3(...CABLE_START)
        .applyQuaternion(INITIAL)
        .add(REST),
      y = new THREE.Vector3(0.45, -1.85, 0.18),
      lp = new THREE.Vector3(-1.65, -0.25, 0.3),
      rp = new THREE.Vector3(1.85, -0.35, 0.15);
    return {
      main: path(
        [
          start,
          new THREE.Vector3(-0.8, -1.9, 0.18),
          new THREE.Vector3(-0.4, -2.22, 0.25),
          y,
        ],
        16,
      ),
      left: path(
        [
          y,
          new THREE.Vector3(-0.35, -1.45, 0.38),
          new THREE.Vector3(-1.35, -1.15, 0.4),
          lp.clone().add(new THREE.Vector3(0, -0.25, 0)),
        ],
        16,
      ),
      right: path(
        [
          y,
          new THREE.Vector3(1.35, -1.7, 0.25),
          new THREE.Vector3(1.7, -0.95, 0.35),
          rp.clone().add(new THREE.Vector3(0, -0.25, 0)),
        ],
        14,
      ),
      lp,
      rp,
    };
  }, []);
  const chains = [data.main, data.left, data.right];
  useFrame((_, dt) => {
    for (const [ref, rest] of [
      [left, data.lp],
      [right, data.rp],
    ] as const) {
      const b = ref.current;
      if (!b) continue;
      const p = b.translation(),
        v = b.linvel();
      const f = rest
        .clone()
        .sub(new THREE.Vector3(p.x, p.y, p.z))
        .multiplyScalar(0.1)
        .addScaledVector(new THREE.Vector3(v.x, v.y, v.z), -0.07)
        .add(new THREE.Vector3(0, 0.008 * 2.5, 0));
      b.applyImpulse(f.multiplyScalar(Math.min(dt, 1 / 30)), true);
    }
    const diagnostic: unknown[] = [];
    bounds.current = [];
    chains.forEach((chain, index) => {
      const endpoints: THREE.Vector3[] = [],
        links = [];
      for (const s of chain) {
        const b = s.ref.current;
        if (!b) return;
        const q = new THREE.Quaternion().copy(b.rotation()),
          p = new THREE.Vector3().copy(b.translation()),
          a = new THREE.Vector3(0, s.length / 2, 0).applyQuaternion(q).add(p),
          z = new THREE.Vector3(0, -s.length / 2, 0).applyQuaternion(q).add(p);
        if (!endpoints.length) endpoints.push(a.clone());
        endpoints.push(z.clone());
        links.push({ start: a, end: z, length: s.length });
      }
      // Render one continuous curve through shared joint centers, with exact socket ends.
      // This hides solver tolerances without stretching or replacing the physical links.
      if (links.length === chain.length) {
        for (let i = 1; i < links.length; i++)
          endpoints[i]
            .copy(links[i - 1].end)
            .add(links[i].start)
            .multiplyScalar(0.5);
        if (index === 0 && phone.current) {
          endpoints[0]
            .set(...CABLE_START)
            .applyQuaternion(
              new THREE.Quaternion().copy(phone.current.rotation()),
            )
            .add(new THREE.Vector3().copy(phone.current.translation()));
        } else {
          const b = data.main.at(-1)!.ref.current;
          if (b)
            endpoints[0]
              .set(0, -data.main.at(-1)!.length / 2, 0)
              .applyQuaternion(new THREE.Quaternion().copy(b.rotation()))
              .add(new THREE.Vector3().copy(b.translation()));
        }
        const bud =
          index === 1 ? left.current : index === 2 ? right.current : null;
        if (bud)
          endpoints[endpoints.length - 1]
            .set(0, -0.25, 0)
            .applyQuaternion(new THREE.Quaternion().copy(bud.rotation()))
            .add(new THREE.Vector3().copy(bud.translation()));
      }
      const tube = tubes.current[index];
      if (tube && endpoints.length > 1) {
        const g = new THREE.TubeGeometry(
          new THREE.CatmullRomCurve3(endpoints),
          chain.length * 8,
          index === 0 ? 0.022 : 0.017,
          7,
          false,
        );
        tube.geometry.dispose();
        tube.geometry = g;
      }
      bounds.current.push(...endpoints);
      diagnostic.push(links);
    });
    if (import.meta.env.DEV && phone.current) {
      const p = phone.current.translation(),
        q = new THREE.Quaternion().copy(phone.current.rotation()),
        start = new THREE.Vector3(...CABLE_START)
          .applyQuaternion(q)
          .add(new THREE.Vector3(p.x, p.y, p.z));
      const canvas = document.querySelector("canvas");
      if (canvas)
        canvas.dataset.earpods = JSON.stringify({
          chains: diagnostic,
          connector: start,
          leftStem: left.current
            ? new THREE.Vector3(0, -0.25, 0)
                .applyQuaternion(
                  new THREE.Quaternion().copy(left.current.rotation()),
                )
                .add(new THREE.Vector3().copy(left.current.translation()))
            : null,
          rightStem: right.current
            ? new THREE.Vector3(0, -0.25, 0)
                .applyQuaternion(
                  new THREE.Quaternion().copy(right.current.rotation()),
                )
                .add(new THREE.Vector3().copy(right.current.translation()))
            : null,
          left: left.current?.translation(),
          right: right.current?.translation(),
          rests: [data.lp, data.rp],
        });
    }
  });
  return (
    <>
      {chains.map((chain, k) => (
        <group key={k}>
          {chain.map((s, i) => (
            <group key={i}>
              <RigidBody
                ref={s.ref}
                position={s.position.toArray()}
                quaternion={s.rotation.toArray()}
                colliders={false}
                linearDamping={5}
                angularDamping={8}
                additionalSolverIterations={20}
                ccd
              >
                <CapsuleCollider
                  args={[Math.max(0.005, s.length / 2 - 0.017), 0.017]}
                  mass={0.0016}
                  collisionGroups={0x00020001}
                />
                {k === 0 && i === chain.length - 1 && (
                  <RoundedBox
                    args={[0.067, s.length + 0.015, 0.06]}
                    radius={0.022}
                  >
                    <meshStandardMaterial color="#ebeeec" roughness={0.42} />
                  </RoundedBox>
                )}
                {k === 2 && i === 8 && (
                  <group>
                    <RoundedBox args={[0.074, 0.44, 0.059]} radius={0.026}>
                      <meshPhysicalMaterial
                        color="#f7f7f3"
                        roughness={0.29}
                        clearcoat={0.4}
                      />
                    </RoundedBox>
                    {[-0.13, 0, 0.13].map((y) => (
                      <mesh key={y} position={[0, y, 0.031]}>
                        <boxGeometry args={[0.044, 0.007, 0.002]} />
                        <meshStandardMaterial color="#c9cdd0" />
                      </mesh>
                    ))}
                  </group>
                )}
              </RigidBody>
              {i > 0 && (
                <Joint
                  a={chain[i - 1].ref}
                  b={s.ref}
                  pa={[0, -chain[i - 1].length / 2, 0]}
                  pb={[0, s.length / 2, 0]}
                />
              )}
            </group>
          ))}
          <mesh
            ref={(m) => {
              if (m) tubes.current[k] = m;
            }}
          >
            <bufferGeometry />
            <meshStandardMaterial
              color="#d6dddd"
              roughness={0.42}
              metalness={0.02}
            />
          </mesh>
        </group>
      ))}
      <Joint
        a={phone}
        b={data.main[0].ref}
        pa={CABLE_START}
        pb={[0, data.main[0].length / 2, 0]}
      />
      {[data.left, data.right].map((chain, i) => (
        <Joint
          key={i}
          a={data.main.at(-1)!.ref}
          b={chain[0].ref}
          pa={[0, -data.main.at(-1)!.length / 2, 0]}
          pb={[0, chain[0].length / 2, 0]}
        />
      ))}
      {[
        [left, data.lp, "L", data.left],
        [right, data.rp, "R", data.right],
      ].map(([ref, p, side, chain]) => {
        const c = chain as Segment[];
        return (
          <group key={side as string}>
            <RigidBody
              ref={ref as BodyRef}
              position={(p as THREE.Vector3).toArray()}
              colliders={false}
              linearDamping={2.2}
              angularDamping={4}
              ccd
            >
              <BallCollider
                args={[0.16]}
                mass={0.008}
                collisionGroups={0x00020001}
              />
              <Earbud side={side as "L" | "R"} />
            </RigidBody>
            <Joint
              a={c.at(-1)!.ref}
              b={ref as BodyRef}
              pa={[0, -c.at(-1)!.length / 2, 0]}
              pb={[0, -0.25, 0]}
            />
          </group>
        );
      })}
    </>
  );
}
