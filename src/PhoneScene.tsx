/* eslint-disable react-hooks/immutability -- Three cameras are intentionally updated imperatively. */
import { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import * as THREE from "three";
import { Phone } from "./Phone";
import { SEModel } from "./SEModel";
import { SE } from "./seGeometry";
function StudioLighting() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[-3, 7, 4]}
        intensity={1.7}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.00005}
        shadow-radius={4}
      />
      <Environment resolution={256}>
        <Lightformer
          position={[-3, 2, 6]}
          rotation={[0, -0.35, -0.45]}
          scale={[0.65, 7, 1]}
          intensity={5}
        />
        <Lightformer position={[4, 0, 5]} rotation={[0, 0.4, 0.3]} scale={[1, 5, 1]} intensity={3} />
        <Lightformer
          position={[-4, 5, 1]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[6, 4, 1]}
          intensity={3}
        />
        <Lightformer position={[3, 3, -4]} scale={[4, 5, 1]} intensity={2} />
        <Lightformer
          position={[0, 6, 5]}
          rotation={[Math.PI / 2, 0, 0]}
          scale={[7, 2, 1]}
          intensity={2}
        />
      </Environment>
    </>
  );
}
function Inspection({ view }: { view: string }) {
  const { camera, size } = useThree();
  useEffect(() => {
    if (camera instanceof THREE.OrthographicCamera) {
      camera.zoom = ["top", "bottom"].includes(view)
        ? size.width / (SE.width * 1.8)
        : Math.min(
            size.height / (SE.height * 1.3),
            size.width / (SE.width * 1.8),
          );
      camera.updateProjectionMatrix();
      if (["top", "bottom"].includes(view))
        camera.up.set(0, 0, view === "top" ? -1 : 1);
      camera.lookAt(0, 0, 0);
    }
  }, [camera, size, view]);
  return (
    <>
      <StudioLighting />
      <SEModel />
    </>
  );
}
export default function PhoneScene(props: { onDrag: (v: boolean) => void }) {
  const view = import.meta.env.DEV
    ? new URLSearchParams(window.location.search).get("view")
    : null;
  const views: Record<string, [number, number, number]> = {
    front: [0, 0, 10],
    back: [0, 0, -10],
    left: [-10, 0, 0],
    right: [10, 0, 0],
    top: [0, 10, 0],
    bottom: [0, -10, 0],
  };
  const inspection = !!view && !!views[view];
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      orthographic={inspection}
      camera={{
        position: inspection ? views[view!] : [0, 0, 11],
        fov: 31,
        near: 0.1,
        far: 80,
      }}
      gl={{ alpha: true, antialias: true }}
      onCreated={({ gl, camera }) => {
        gl.setClearColor(inspection ? "#eeede9" : "#ffffff", inspection ? 1 : 0);
        camera.lookAt(0, 0, 0);
      }}
    >
      {inspection ? (
        <Inspection view={view!} />
      ) : (
        <>
          <StudioLighting />
          <Physics
            interpolate={false}
            gravity={[0, -2.5, 0]}
            timeStep={1 / 120}
            numSolverIterations={32}
          >
            <Phone {...props} />
          </Physics>
        </>
      )}
    </Canvas>
  );
}
