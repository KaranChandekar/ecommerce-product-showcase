"use client";

import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

interface ProductModelProps {
  color: string;
  metalness: number;
  roughness: number;
}

function HeadphoneModel({ color, metalness, roughness }: ProductModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const targetColor = useRef(new THREE.Color(color));
  const currentColor = useRef(new THREE.Color(color));

  useEffect(() => {
    targetColor.current.set(color);
  }, [color]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      currentColor.current.lerp(targetColor.current, delta * 3);
      materialRef.current.color.copy(currentColor.current);
      materialRef.current.metalness += (metalness - materialRef.current.metalness) * delta * 3;
      materialRef.current.roughness += (roughness - materialRef.current.roughness) * delta * 3;
    }
  });

  return (
    <group ref={meshRef} scale={2.2} position={[0, -0.5, 0]}>
      {/* Headband - curved arc */}
      <mesh position={[0, 1.3, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.05, 0.07, 16, 48, Math.PI]} />
        <meshStandardMaterial ref={materialRef} color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      {/* Headband inner padding */}
      <mesh position={[0, 1.82, 0]}>
        <boxGeometry args={[0.8, 0.05, 0.18]} />
        <meshStandardMaterial color="#444" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Headband top accent line */}
      <mesh position={[0, 1.3, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1.05, 0.025, 8, 48, Math.PI]} />
        <meshStandardMaterial color={color} metalness={metalness * 1.2} roughness={roughness * 0.5} emissive={color} emissiveIntensity={0.05} />
      </mesh>

      {/* Left slider arm */}
      <mesh position={[-1.02, 1.05, 0]}>
        <boxGeometry args={[0.06, 0.7, 0.08]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      {/* Left slider notches */}
      {[0, 0.12, 0.24].map((offset) => (
        <mesh key={`ln-${offset}`} position={[-1.07, 0.85 + offset, 0]}>
          <boxGeometry args={[0.015, 0.04, 0.09]} />
          <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Right slider arm */}
      <mesh position={[1.02, 1.05, 0]}>
        <boxGeometry args={[0.06, 0.7, 0.08]} />
        <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
      </mesh>
      {/* Right slider notches */}
      {[0, 0.12, 0.24].map((offset) => (
        <mesh key={`rn-${offset}`} position={[1.07, 0.85 + offset, 0]}>
          <boxGeometry args={[0.015, 0.04, 0.09]} />
          <meshStandardMaterial color="#888" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Left ear cup - outer shell */}
      <group position={[-1.02, 0.55, 0]} rotation={[0, 0, Math.PI * 0.02]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.52, 0.3, 48]} />
          <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
        </mesh>
        {/* Outer face plate */}
        <mesh position={[0, 0, 0.16]} rotation={[0, 0, 0]}>
          <circleGeometry args={[0.52, 48]} />
          <meshStandardMaterial color={color} metalness={metalness * 1.1} roughness={roughness * 0.7} />
        </mesh>
        {/* Brand logo circle on ear cup */}
        <mesh position={[0, 0, 0.165]}>
          <ringGeometry args={[0.15, 0.2, 48]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.05} emissive={color} emissiveIntensity={0.1} />
        </mesh>
        {/* Inner cushion ring */}
        <mesh position={[0, 0, -0.16]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.38, 0.14, 16, 48]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0} roughness={0.95} />
        </mesh>
        {/* Inner driver mesh */}
        <mesh position={[0, 0, -0.16]}>
          <circleGeometry args={[0.28, 48]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.6} />
        </mesh>
      </group>

      {/* Right ear cup - outer shell */}
      <group position={[1.02, 0.55, 0]} rotation={[0, 0, -Math.PI * 0.02]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.55, 0.52, 0.3, 48]} />
          <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
        </mesh>
        <mesh position={[0, 0, 0.16]}>
          <circleGeometry args={[0.52, 48]} />
          <meshStandardMaterial color={color} metalness={metalness * 1.1} roughness={roughness * 0.7} />
        </mesh>
        <mesh position={[0, 0, 0.165]}>
          <ringGeometry args={[0.15, 0.2, 48]} />
          <meshStandardMaterial color={color} metalness={1} roughness={0.05} emissive={color} emissiveIntensity={0.1} />
        </mesh>
        <mesh position={[0, 0, -0.16]}>
          <torusGeometry args={[0.38, 0.14, 16, 48]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0} roughness={0.95} />
        </mesh>
        <mesh position={[0, 0, -0.16]}>
          <circleGeometry args={[0.28, 48]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.6} />
        </mesh>
      </group>
    </group>
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#e8e8e8] border-t-[#c9a96e] rounded-full animate-spin" />
    </div>
  );
}

interface ProductViewer3DProps {
  color: string;
  metalness: number;
  roughness: number;
}

export default function ProductViewer3D({ color, metalness, roughness }: ProductViewer3DProps) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      id="product-hero"
      className="relative w-full h-[500px] md:h-[600px]"
      onPointerDown={() => setHasInteracted(true)}
    >
      {isVisible ? (
        <Suspense fallback={<LoadingSpinner />}>
          <Canvas camera={{ position: [0, 1.5, 5.5], fov: 40 }} dpr={[1, 2]}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 8, 5]} intensity={1.2} castShadow />
            <directionalLight position={[-5, 3, -3]} intensity={0.4} />
            <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.5} />
            <HeadphoneModel color={color} metalness={metalness} roughness={roughness} />
            <ContactShadows position={[0, -1.6, 0]} opacity={0.5} blur={2.5} far={4} />
            <Environment preset="studio" />
            <OrbitControls
              autoRotate={!hasInteracted}
              autoRotateSpeed={4}
              enablePan={false}
              minDistance={4}
              maxDistance={9}
              target={[0, 0.6, 0]}
            />
          </Canvas>
        </Suspense>
      ) : (
        <LoadingSpinner />
      )}

      {/* Rotate hint */}
      {!hasInteracted && isVisible && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sm text-[#1a1a1a]/50 animate-pulse pointer-events-none">
          Click & drag to rotate
        </div>
      )}
    </div>
  );
}
