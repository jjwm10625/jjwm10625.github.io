import { useMemo, useEffect } from "react";
import { RoundedBox } from "@react-three/drei";
import type { ThreeEvent } from "@react-three/fiber";
import {
  SE,
  frameGeometry,
  faceGeometry,
  appleShape,
  JACK,
  rearBandGeometry,
} from "./seGeometry";
import * as THREE from "three";
import { createScreenTexture } from "./phoneScreen";
function Hole({
  position,
  radius = 0.018,
  rotation = [Math.PI / 2, 0, 0],
}: {
  position: [number, number, number];
  radius?: number;
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation}>
      <circleGeometry args={[radius, 24]} />
      <meshBasicMaterial color="#272b30" />
    </mesh>
  );
}
export function SEModel({
  onDown,
  plug = true,
}: {
  onDown?: (e: ThreeEvent<PointerEvent>) => void;
  plug?: boolean;
}) {
  const frame = useMemo(() => frameGeometry(), []),
    glass = useMemo(
      () => faceGeometry(SE.width - 0.03, SE.height - 0.03, SE.corner - 0.012),
      [],
    ),
    display = useMemo(
      () => faceGeometry(SE.screenWidth, SE.screenHeight, 0.001),
      [],
    ),
    band = useMemo(() => rearBandGeometry(), []),
    logo = useMemo(() => appleShape(), []),
    texture = useMemo(() => createScreenTexture(), []);
  useEffect(() => () => texture.dispose(), [texture]);
  const engraving = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.textAlign = "center";
    ctx.fillStyle = "#555a5e";
    ctx.font = "65px Arial";
    ctx.fillText("iPhone", 256, 94);
    ctx.font = "27px Arial";
    ctx.strokeStyle = "#555a5e";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(232, 119, 48, 40, 8);
    ctx.stroke();
    ctx.fillText("SE", 256, 147);
    const t = new THREE.CanvasTexture(canvas);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => () => engraving.dispose(), [engraving]);
  const metalGrain = useMemo(() => {
    const values = new Uint8Array(256 * 256 * 4);
    let seed = 127;
    for (let i = 0; i < 256 * 256; i++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const value = 115 + (seed % 26);
      values[i * 4] = values[i * 4 + 1] = values[i * 4 + 2] = value;
      values[i * 4 + 3] = 255;
    }
    const t = new THREE.DataTexture(values, 256, 256);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.repeat.set(3, 6);
    t.needsUpdate = true;
    return t;
  }, []);
  useEffect(() => () => metalGrain.dispose(), [metalGrain]);
  const screenBorder = useMemo(
    () => faceGeometry(SE.screenWidth + 0.018, SE.screenHeight + 0.018, 0.014),
    [],
  );
  const shadow = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    const gradient = ctx.createRadialGradient(128, 128, 12, 128, 128, 125);
    gradient.addColorStop(0, "rgba(35,40,48,0.2)");
    gradient.addColorStop(0.5, "rgba(35,40,48,0.09)");
    gradient.addColorStop(1, "rgba(35,40,48,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);
    return new THREE.CanvasTexture(canvas);
  }, []);
  useEffect(() => () => shadow.dispose(), [shadow]);
  const f = SE.depth / 2;
  return (
    <group scale={[1, 1, 0.78]} onPointerDown={(e) => onDown?.(e)}>
      <mesh position={[0.16, -0.12, -f - 0.12]}>
        <planeGeometry args={[SE.width * 1.5, SE.height * 1.2]} />
        <meshBasicMaterial map={shadow} transparent depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh position={[0, -0.77, -f - 0.003]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.9, 0.45]} />
        <meshBasicMaterial
          map={engraving}
          transparent
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh geometry={frame} castShadow>
        <meshStandardMaterial
          color="#c9cdd1"
          metalness={0.86}
          roughness={0.23}
        />
      </mesh>
      <mesh geometry={glass} position={[0, 0, f]}>
        <meshPhysicalMaterial
          color="#f9f9f6"
          roughness={0.2}
          clearcoat={0.7}
          envMapIntensity={1.1}
        />
      </mesh>
      <mesh geometry={glass} position={[0, 0, -f]} rotation={[0, Math.PI, 0]}>
        <meshStandardMaterial
          color="#c5c7c9"
          metalness={0.72}
          roughness={0.36}
          bumpMap={metalGrain}
          bumpScale={0.00065}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh
          key={side}
          position={[0, side * 1.59, -f - 0.001]}
          rotation={[0, Math.PI, side === 1 ? 0 : Math.PI]}
          geometry={band}
        >
          <meshPhysicalMaterial
            color="#f5f5f2"
            roughness={0.19}
            clearcoat={0.65}
            envMapIntensity={0.22}
          />
        </mesh>
      ))}
      <mesh geometry={screenBorder} position={[0, 0, f + 0.0003]}>
        <meshBasicMaterial color="#171a1c" />
      </mesh>
      <mesh
        geometry={display}
        position={[0, 0, f + 0.0006]}
        renderOrder={2}
        onPointerDown={(e) => {
          e.stopPropagation();
          onDown?.(e);
        }}
      >
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          polygonOffset
          polygonOffsetFactor={-2}
          polygonOffsetUnits={-2}
        />
      </mesh>
      <mesh geometry={display} position={[0, 0, f + 0.0012]} renderOrder={3}>
        <meshPhysicalMaterial
          transparent
          opacity={0.16}
          color="#ffffff"
          metalness={0.05}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.06}
          envMapIntensity={1.5}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-3}
          polygonOffsetUnits={-3}
        />
      </mesh>
      <mesh position={[0, -1.584, f + 0.001]}>
        <torusGeometry args={[0.146, 0.007, 12, 64]} />
        <meshStandardMaterial
          color="#90959b"
          metalness={0.95}
          roughness={0.24}
        />
      </mesh>
      <mesh position={[0, -1.584, f + 0.001]}>
        <circleGeometry args={[0.138, 48]} />
        <meshPhysicalMaterial color="#f8f8f4" clearcoat={1} roughness={0.2} />
      </mesh>
      <RoundedBox
        args={[0.245, 0.027, 0.002]}
        radius={0.009}
        position={[0, 1.59, f + 0.001]}
      >
        <meshStandardMaterial color="#34373b" roughness={0.8} />
      </RoundedBox>
      <Hole
        position={[-0.263, 1.59, f + 0.002]}
        radius={0.018}
        rotation={[0, 0, 0]}
      />
      <Hole
        position={[0, 1.71, f + 0.002]}
        radius={0.029}
        rotation={[0, 0, 0]}
      />
      {[-1, 1].flatMap((side) =>
        [-1.36, 1.36].map((y) => (
          <mesh
            key={`${side}-${y}`}
            position={[side * (SE.width / 2 + 0.001), y, 0]}
          >
            <boxGeometry args={[0.003, 0.018, SE.depth - 0.018]} />
            <meshStandardMaterial color="#e7e8e3" roughness={0.55} />
          </mesh>
        )),
      )}
      {/* First generation: circular volume keys on the left, sleep button on top. */}
      {[0.69, 1.05].map((y) => (
        <mesh
          key={y}
          position={[-SE.width / 2 - 0.004, y, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <cylinderGeometry args={[0.079, 0.079, 0.012, 40]} />
          <meshStandardMaterial
            color="#c1c4c7"
            metalness={0.9}
            roughness={0.29}
          />
        </mesh>
      ))}
      <RoundedBox
        args={[0.012, 0.155, 0.051]}
        radius={0.004}
        position={[-SE.width / 2 - 0.002, 1.42, 0]}
      >
        <meshStandardMaterial color="#a8adb2" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      <RoundedBox
        args={[0.34, 0.012, 0.065]}
        radius={0.006}
        position={[0.455, SE.height / 2 + 0.003, 0]}
      >
        <meshStandardMaterial
          color="#c4c7cb"
          metalness={0.85}
          roughness={0.3}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.002, 0.37, 0.095]}
        radius={0.012}
        position={[SE.width / 2 + 0.001, -0.07, 0]}
      >
        <meshStandardMaterial
          color="#7c848e"
          metalness={0.8}
          roughness={0.35}
        />
      </RoundedBox>
      <RoundedBox
        args={[0.002, 0.352, 0.077]}
        radius={0.009}
        position={[SE.width / 2 + 0.002, -0.07, 0]}
      >
        <meshStandardMaterial
          color="#c9cdd1"
          metalness={0.86}
          roughness={0.23}
        />
      </RoundedBox>
      <Hole
        position={[SE.width / 2 + 0.003, -0.187, 0]}
        radius={0.009}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh position={[-0.608, 1.587, -f - 0.003]} rotation={[0, Math.PI, 0]}>
        <ringGeometry args={[0.077, 0.094, 48]} />
        <meshStandardMaterial color="#a7acb2" metalness={0.9} />
      </mesh>
      <Hole
        position={[-0.608, 1.587, -f - 0.004]}
        radius={0.075}
        rotation={[0, Math.PI, 0]}
      />
      <mesh position={[-0.586, 1.605, -f - 0.005]} rotation={[0, Math.PI, 0]}>
        <circleGeometry args={[0.027, 24]} />
        <meshStandardMaterial color="#263346" metalness={0.4} roughness={0.1} />
      </mesh>
      <RoundedBox
        args={[0.078, 0.124, 0.002]}
        radius={0.03}
        position={[-0.275, 1.587, -f - 0.003]}
      >
        <meshStandardMaterial color="#e5dfc9" roughness={0.4} />
      </RoundedBox>
      <Hole
        position={[-0.413, 1.587, -f - 0.002]}
        radius={0.011}
        rotation={[0, Math.PI, 0]}
      />
      <mesh
        position={[0, 0.62, -f - 0.002]}
        rotation={[0, Math.PI, 0]}
        scale={0.38}
      >
        <shapeGeometry args={[logo]} />
        <meshStandardMaterial
          color="#090b0c"
          metalness={0.25}
          roughness={0.19}
        />
      </mesh>
      <RoundedBox
        args={[0.199, 0.002, 0.053]}
        radius={0.013}
        position={[0, -SE.height / 2 - 0.001, 0]}
      >
        <meshBasicMaterial color="#242930" />
      </RoundedBox>
      <Hole position={JACK} radius={0.0525} />
      {[-0.163, 0.163].map((x) => (
        <Hole
          key={x}
          position={[x, -SE.height / 2 - 0.002, 0]}
          radius={0.009}
        />
      ))}
      {[0, 1].flatMap((row) =>
        Array.from({ length: 5 }, (_, i) => (
          <Hole
            key={`${row}-${i}`}
            position={[
              0.34 + i * 0.064,
              -SE.height / 2 - 0.002,
              (row - 0.5) * 0.055,
            ]}
            radius={0.014}
          />
        )),
      )}
      <Hole position={[-0.433, -SE.height / 2 - 0.002, 0]} radius={0.017} />
      {plug && (
        <group position={JACK}>
          <mesh position={[0, -0.025, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 0.05, 32]} />
            <meshStandardMaterial
              color="#d5d6d7"
              metalness={0.95}
              roughness={0.18}
            />
          </mesh>
          <mesh position={[0, -0.16, 0]}>
            <cylinderGeometry args={[0.067, 0.061, 0.27, 32]} />
            <meshPhysicalMaterial
              color="#f6f6f3"
              roughness={0.3}
              clearcoat={0.4}
            />
          </mesh>
          <mesh position={[0, -0.305, 0]}>
            <cylinderGeometry args={[0.036, 0.031, 0.03, 24]} />
            <meshStandardMaterial color="#eeefeb" roughness={0.5} />
          </mesh>
        </group>
      )}
    </group>
  );
}
