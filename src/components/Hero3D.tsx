import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Sparkles, Html } from '@react-three/drei';

interface Hero3DProps {
  onNavigate?: (path: string) => void;
}

const Hero3D: React.FC<Hero3DProps> = ({ onNavigate }) => {
  const [hovered, setHovered] = useState<string | null>(null);

  const handlePointerOver = (name: string) => {
    document.body.style.cursor = 'pointer';
    setHovered(name);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
    setHovered(null);
  };

  const handleClick = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="pink" />

      {/* Shiny Particle Effect */}
      <Sparkles count={200} scale={[12, 12, 12]} size={4} speed={0.4} opacity={0.6} color="#fff" />
      <Sparkles count={100} scale={[10, 10, 10]} size={8} speed={0.3} opacity={0.5} color="#ffd700" />
      <Sparkles count={50} scale={[8, 8, 8]} size={12} speed={0.2} opacity={0.4} color="#f3b1cd" />

      <group position={[0, -0.5, 0]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>

          {/* Cream Jar (Left) -> Skincare */}
          <group
            position={[-1.2, 0, 0.5]}
            rotation={[0.2, 0.5, 0]}
            scale={hovered === 'skincare' ? 1.1 : 1}
            onPointerOver={() => handlePointerOver('skincare')}
            onPointerOut={handlePointerOut}
            onClick={() => handleClick('/products')}
          >
            {/* Jar Body */}
            <mesh position={[0, 0, 0]}>
              <cylinderGeometry args={[0.6, 0.6, 0.8, 32]} />
              <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.1} />
            </mesh>
            {/* Lid */}
            <mesh position={[0, 0.5, 0]}>
              <cylinderGeometry args={[0.62, 0.62, 0.2, 32]} />
              <meshStandardMaterial color="#e3a7c0" roughness={0.3} metalness={0.5} />
            </mesh>
            {/* Label decoration */}
            <mesh position={[0, 0, 0.61]} rotation={[0, 0, 0]}>
              <planeGeometry args={[0.8, 0.4]} />
              <meshStandardMaterial color="#bad5f0" />
            </mesh>
            {hovered === 'skincare' && (
              <Html position={[0, 1.2, 0]} center distanceFactor={10}>
                <div style={{ background: 'rgba(255,255,255,0.8)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                  Skincare
                </div>
              </Html>
            )}
          </group>

          {/* Perfume Bottle (Center/Back) -> Perfumes */}
          <group
            position={[0, 0.5, -0.5]}
            rotation={[0, -0.2, 0]}
            scale={hovered === 'perfume' ? 1.1 : 1}
            onPointerOver={() => handlePointerOver('perfume')}
            onPointerOut={handlePointerOut}
            onClick={() => handleClick('/products')}
          >
            {/* Bottle Body */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[1, 1.4, 0.4]} />
              <meshPhysicalMaterial
                color="#f3b1cd"
                transmission={0.5}
                opacity={0.8}
                transparent
                roughness={0}
                metalness={0.1}
              />
            </mesh>
            {/* Neck */}
            <mesh position={[0, 0.8, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.2, 16]} />
              <meshStandardMaterial color="gold" metalness={1} roughness={0.2} />
            </mesh>
            {/* Cap */}
            <mesh position={[0, 1.1, 0]}>
              <sphereGeometry args={[0.25, 32, 32]} />
              <meshStandardMaterial color="white" roughness={0.1} />
            </mesh>
            {/* Liquid inside (simulated) */}
            <mesh position={[0, -0.1, 0]}>
              <boxGeometry args={[0.9, 1.1, 0.3]} />
              <meshStandardMaterial color="#ffccdd" transparent opacity={0.6} />
            </mesh>
            {hovered === 'perfume' && (
              <Html position={[0, 1.8, 0]} center distanceFactor={10}>
                <div style={{ background: 'rgba(255,255,255,0.8)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                  Perfumes
                </div>
              </Html>
            )}
          </group>

          {/* Gift Box (Right) -> Accessories */}
          <group
            position={[1.3, -0.2, 0.5]}
            rotation={[0.1, -0.4, 0.1]}
            scale={hovered === 'gift' ? 1.1 : 1}
            onPointerOver={() => handlePointerOver('gift')}
            onPointerOut={handlePointerOut}
            onClick={() => handleClick('/products')}
          >
            {/* Box Body */}
            <mesh>
              <boxGeometry args={[0.9, 0.9, 0.9]} />
              <meshStandardMaterial color="#c2d5a8" />
            </mesh>
            {/* Ribbon Vertical */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.95, 0.95, 0.2]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Ribbon Horizontal */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.2, 0.95, 0.95]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Bow (Simple spheres) */}
            <mesh position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.25, 16, 16]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            {hovered === 'gift' && (
              <Html position={[0, 1.2, 0]} center distanceFactor={10}>
                <div style={{ background: 'rgba(255,255,255,0.8)', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold' }}>
                  Gifts
                </div>
              </Html>
            )}
          </group>

        </Float>

        {/* Ground Shadows */}
        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
      </group>

      <OrbitControls enableZoom={false} enablePan={false} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2} />
    </Canvas>
  );
};

export default Hero3D;
