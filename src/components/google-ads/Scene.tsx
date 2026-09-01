"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Html, Line } from "@react-three/drei";
import * as THREE from "three";

const ACCENT = "#60a5fa";
const ACCENT_DIM = "#2563eb";
const PANEL = "#0e1424";

function CameraRig({ enabled }: { enabled: boolean }) {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 6));

  // R3F's render loop is imperative by design: mutating the Three.js camera
  // object in-place here (instead of via React state) is what keeps this
  // running at 60fps without triggering component re-renders.
  /* eslint-disable react-hooks/immutability */
  useFrame(() => {
    if (enabled) {
      target.current.x = pointer.x * 0.9;
      target.current.y = pointer.y * 0.5 + 0.2;
    } else {
      target.current.x = 0;
      target.current.y = 0.2;
    }
    camera.position.x += (target.current.x - camera.position.x) * 0.03;
    camera.position.y += (target.current.y - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  /* eslint-enable react-hooks/immutability */

  return null;
}

function ChartBars() {
  const heights = useMemo(
    () => [0.4, 0.7, 0.55, 0.9, 0.75, 1.1, 0.95],
    []
  );
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((child, i) => {
      const target = heights[i] * (0.85 + Math.sin(t * 0.6 + i) * 0.15);
      child.scale.y += (target - child.scale.y) * 0.06;
      child.position.y = child.scale.y / 2;
    });
  });

  return (
    <group ref={group} position={[-1.05, -0.55, 0.09]}>
      {heights.map((h, i) => (
        <mesh key={i} position={[i * 0.32, h / 2, 0]} scale={[1, h, 1]}>
          <boxGeometry args={[0.18, 1, 0.02]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT_DIM}
            emissiveIntensity={0.5}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function DashboardPanel() {
  return (
    <group position={[0.4, -0.3, -0.3]} rotation={[0.05, -0.28, 0]}>
      <RoundedBox args={[3.2, 2, 0.12]} radius={0.08} smoothness={4}>
        <meshStandardMaterial
          color={PANEL}
          roughness={0.35}
          metalness={0.2}
        />
      </RoundedBox>
      <ChartBars />
      <Html
        position={[-1.05, 0.68, 0.1]}
        transform
        distanceFactor={4.2}
        occlude={false}
        style={{ pointerEvents: "none", whiteSpace: "nowrap" }}
      >
        <p className="text-[13px] font-semibold text-[#f4f6fb]">
          Campaign performance
        </p>
        <p className="mt-0.5 text-[11px] text-[#60a5fa]">
          Conversions trending up
        </p>
      </Html>
    </group>
  );
}

function FloatingCard({
  position,
  rotation = [0, 0, 0],
  eyebrow,
  title,
  offset = 0,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  eyebrow: string;
  title: string;
  offset?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const base = useMemo(() => new THREE.Vector3(...position), [position]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime() + offset;
    group.current.position.y = base.y + Math.sin(t * 0.6) * 0.12;
    group.current.rotation.z = rotation[2] + Math.sin(t * 0.4) * 0.02;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      <RoundedBox args={[1.5, 0.65, 0.06]} radius={0.06} smoothness={4}>
        <meshStandardMaterial color="#101a30" roughness={0.4} metalness={0.15} />
      </RoundedBox>
      <mesh position={[0, 0, 0.031]}>
        <planeGeometry args={[1.5, 0.03]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} />
      </mesh>
      <Html
        position={[-0.65, 0.02, 0.07]}
        transform
        distanceFactor={4.2}
        occlude={false}
        style={{ pointerEvents: "none", width: "220px" }}
      >
        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#60a5fa]">
          {eyebrow}
        </p>
        <p className="mt-1 text-[13px] leading-snug text-[#f4f6fb]">
          {title}
        </p>
      </Html>
    </group>
  );
}

function Coin() {
  const mesh = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.y = Math.sin(t * 0.35) * 0.6 + 0.3;
    mesh.current.position.y = 0.9 + Math.sin(t * 0.5) * 0.08;
  });

  return (
    <group ref={mesh} position={[1.9, 0.9, 0.6]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.34, 0.34, 0.06, 48]} />
        <meshStandardMaterial
          color="#1d2942"
          emissive={ACCENT_DIM}
          emissiveIntensity={0.35}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>
      <Html
        position={[0, 0.04, 0]}
        transform
        distanceFactor={3.2}
        occlude={false}
        style={{ pointerEvents: "none" }}
      >
        <p className="text-[13px] font-bold tracking-wide text-[#60a5fa]">
          CPC
        </p>
      </Html>
    </group>
  );
}

function CursorClick() {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const cycle = t % 3;
    if (group.current) {
      group.current.position.x = -0.55 + Math.sin(t * 0.3) * 0.08;
      group.current.position.y = 0.62 + Math.cos(t * 0.3) * 0.05;
    }
    if (ring.current) {
      const pulse = cycle < 0.4 ? cycle / 0.4 : 0;
      const scale = 1 + pulse * 0.8;
      ring.current.scale.setScalar(scale);
      const mat = ring.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.6 - pulse * 0.6);
    }
  });

  return (
    <group ref={group} position={[-0.55, 0.62, 0.9]}>
      <mesh>
        <circleGeometry args={[0.05, 24]} />
        <meshBasicMaterial color={ACCENT} toneMapped={false} />
      </mesh>
      <mesh ref={ring}>
        <ringGeometry args={[0.07, 0.085, 32]} />
        <meshBasicMaterial color={ACCENT} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

function ConnectingLines() {
  const points = useMemo(
    () => [
      new THREE.Vector3(-2.3, 1.1, 0.4),
      new THREE.Vector3(-0.6, 0.55, 0.6),
      new THREE.Vector3(0.4, -0.3, -0.2),
      new THREE.Vector3(1.55, -1.05, 1.3),
    ],
    []
  );

  return (
    <Line
      points={points}
      color={ACCENT}
      transparent
      opacity={0.18}
      lineWidth={1}
    />
  );
}

export default function Scene({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0.2, 6], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 5]} intensity={1.1} color="#dbe6ff" />
      <pointLight position={[-3, -2, 2]} intensity={0.4} color={ACCENT} />

      <CameraRig enabled={!reducedMotion} />
      <ConnectingLines />
      <DashboardPanel />
      <Coin />
      <CursorClick />

      <FloatingCard
        position={[-2.3, 1.1, 0.4]}
        rotation={[0, 0.3, 0.05]}
        eyebrow="Search ad"
        title="emergency plumber near me"
        offset={0}
      />
      <FloatingCard
        position={[-1.4, -1.15, 1.1]}
        rotation={[0, 0.2, -0.03]}
        eyebrow="Keyword"
        title="Sponsored · High intent"
        offset={1.4}
      />
      <FloatingCard
        position={[1.55, -1.05, 1.3]}
        rotation={[0, -0.35, 0.04]}
        eyebrow="Result"
        title="Conversion recorded"
        offset={2.6}
      />
    </Canvas>
  );
}
