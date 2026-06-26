'use client'

import { useRef, useState, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import * as THREE from 'three'

const PLANET_DATA = [
  { id: 'mercury', name: 'Mercury', exhibit: 'I',    color: '#B5B3BB', emissive: '#3a3840', size: 0.13, orbit: 2.4,  speed: 0.50, startAngle: 0.8 },
  { id: 'venus',   name: 'Venus',   exhibit: 'II',   color: '#E8C285', emissive: '#5a4a20', size: 0.20, orbit: 3.5,  speed: 0.38, startAngle: 2.1 },
  { id: 'earth',   name: 'Earth',   exhibit: 'III',  color: '#4B9CD3', emissive: '#1a3a5a', size: 0.22, orbit: 4.8,  speed: 0.30, startAngle: 3.9 },
  { id: 'mars',    name: 'Mars',    exhibit: 'IV',   color: '#C1440E', emissive: '#4a1808', size: 0.15, orbit: 6.3,  speed: 0.24, startAngle: 1.4 },
  { id: 'jupiter', name: 'Jupiter', exhibit: 'V',    color: '#C88B3A', emissive: '#4a3010', size: 0.58, orbit: 10.0, speed: 0.13, startAngle: 5.2 },
  { id: 'saturn',  name: 'Saturn',  exhibit: 'VI',   color: '#E8C878', emissive: '#5a4a18', size: 0.50, orbit: 13.5, speed: 0.09, startAngle: 0.3 },
  { id: 'uranus',  name: 'Uranus',  exhibit: 'VII',  color: '#82D8D8', emissive: '#183838', size: 0.36, orbit: 17.0, speed: 0.06, startAngle: 2.7 },
  { id: 'neptune', name: 'Neptune', exhibit: 'VIII', color: '#4B70DD', emissive: '#0c1a5a', size: 0.34, orbit: 20.5, speed: 0.05, startAngle: 4.5 },
]

type PlanetDatum = typeof PLANET_DATA[0]

function OrbitRing({ radius }: { radius: number }) {
  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = []
    for (let i = 0; i <= 128; i++) {
      const theta = (i / 128) * Math.PI * 2
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius))
    }
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [radius])

  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial color="#2a3a4a" opacity={0.5} transparent />
    </lineLoop>
  )
}

function SceneSun() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (meshRef.current) meshRef.current.rotation.y = t * 0.05
    if (glowRef.current) glowRef.current.scale.setScalar(1.18 + Math.sin(t * 0.4) * 0.03)
  })

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.88, 64, 64]} />
        <meshStandardMaterial
          color="#FF8800"
          emissive="#FF4400"
          emissiveIntensity={3}
          roughness={1}
        />
      </mesh>
      <mesh ref={glowRef} scale={1.18}>
        <sphereGeometry args={[0.88, 16, 16]} />
        <meshStandardMaterial color="#FF6600" transparent opacity={0.08} side={THREE.BackSide} />
      </mesh>
      <mesh scale={1.6}>
        <sphereGeometry args={[0.88, 16, 16]} />
        <meshStandardMaterial color="#FF4400" transparent opacity={0.02} side={THREE.BackSide} />
      </mesh>
      <pointLight position={[0, 0, 0]} intensity={4} color="#FFD060" distance={55} decay={2} />
    </>
  )
}

function SaturnRings({ orbitRadius }: { orbitRadius: number }) {
  const angle = useRef(0.3)
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    angle.current += 0.09 * delta * 0.25
    if (groupRef.current) {
      groupRef.current.position.x = Math.cos(angle.current) * orbitRadius
      groupRef.current.position.z = Math.sin(angle.current) * orbitRadius
      groupRef.current.rotation.y += delta * 0.4
    }
  })

  const ringGeometry = useMemo(() => new THREE.RingGeometry(0.65, 1.05, 64), [])

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2.4, 0, 0]} geometry={ringGeometry}>
        <meshStandardMaterial
          color="#E8D890"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

function PlanetMesh({ data, onNavigate }: { data: PlanetDatum; onNavigate: (id: string) => void }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const angle = useRef(data.startAngle)

  useFrame((_, delta) => {
    angle.current += data.speed * delta * 0.25
    if (meshRef.current) {
      meshRef.current.position.x = Math.cos(angle.current) * data.orbit
      meshRef.current.position.z = Math.sin(angle.current) * data.orbit
      meshRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <mesh
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerOut={() => {
        setHovered(false)
        document.body.style.cursor = 'default'
      }}
      onClick={(e) => {
        e.stopPropagation()
        onNavigate(data.id)
      }}
      scale={hovered ? 1.35 : 1}
    >
      <sphereGeometry args={[data.size, 32, 32]} />
      <meshStandardMaterial
        color={data.color}
        emissive={data.emissive}
        emissiveIntensity={hovered ? 1.5 : 0.2}
        roughness={0.8}
        metalness={0.05}
      />
      {hovered && (
        <Html center distanceFactor={8} style={{ pointerEvents: 'none', zIndex: 10 }}>
          <div style={{
            background: 'rgba(5,8,14,0.92)',
            border: '1px solid rgba(255,180,0,0.35)',
            backdropFilter: 'blur(8px)',
            padding: '7px 14px',
            borderRadius: '3px',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            transform: 'translateY(-12px)',
          }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '8px',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,180,0,0.7)',
              marginBottom: '2px',
            }}>
              Exhibit {data.exhibit}
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              fontWeight: 500,
              color: '#fff',
              letterSpacing: '0.04em',
            }}>
              {data.name}
            </p>
          </div>
        </Html>
      )}
    </mesh>
  )
}

function SolarSystemContent({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <>
      <ambientLight intensity={0.02} />
      <Stars radius={140} depth={70} count={5000} factor={2.5} saturation={0} fade speed={0.15} />
      <SceneSun />
      {PLANET_DATA.map((planet) => (
        <group key={planet.id}>
          <OrbitRing radius={planet.orbit} />
          <PlanetMesh data={planet} onNavigate={onNavigate} />
        </group>
      ))}
      <SaturnRings orbitRadius={13.5} />
      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={60}
        maxPolarAngle={Math.PI * 0.58}
        minPolarAngle={Math.PI * 0.1}
        autoRotate
        autoRotateSpeed={0.22}
        makeDefault
      />
    </>
  )
}

export function SolarSystemScene({ onNavigate }: { onNavigate: (id: string) => void }) {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 14, 30], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <SolarSystemContent onNavigate={onNavigate} />
        </Suspense>
      </Canvas>
    </div>
  )
}
