'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, MeshDistortMaterial, Sphere } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

function SunMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const coronaRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.04
      meshRef.current.rotation.z = t * 0.01
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.y = -t * 0.02
      coronaRef.current.scale.setScalar(1.15 + Math.sin(t * 0.5) * 0.02)
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.3}>
      {/* Core sun */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 128, 128]} />
        <MeshDistortMaterial
          color="#FF5500"
          emissive="#FF3300"
          emissiveIntensity={0.8}
          distort={0.18}
          speed={2.5}
          roughness={1}
          metalness={0}
        />
      </mesh>

      {/* Inner corona */}
      <mesh ref={coronaRef} scale={1.15}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#FF8800"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer corona halo */}
      <Sphere args={[2, 32, 32]} scale={1.35}>
        <meshStandardMaterial
          color="#FF6600"
          transparent
          opacity={0.025}
          side={THREE.BackSide}
        />
      </Sphere>
    </Float>
  )
}

function SceneLights() {
  return (
    <>
      <pointLight position={[0, 0, 0]} intensity={4} color="#FFB400" distance={20} />
      <ambientLight intensity={0.05} color="#FF6600" />
    </>
  )
}

export function SunScene({ className }: { className?: string }) {
  return (
    <div className={className} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <SunMesh />
          <Stars
            radius={80}
            depth={50}
            count={3000}
            factor={3}
            saturation={0}
            fade
            speed={0.5}
          />
          <EffectComposer>
            <Bloom
              intensity={1.8}
              luminanceThreshold={0.05}
              luminanceSmoothing={0.9}
              radius={0.8}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
