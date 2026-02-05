import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Robot({ position, status, id }) {
  const meshRef = useRef()
  
  const color = {
    idle: '#00ff00',
    moving: '#ffaa00',
    picking: '#0088ff',
    error: '#ff0000'
  }[status] || '#ffffff'

  useFrame((state) => {
    if (status === 'moving' && meshRef.current) {
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2
    } else if (meshRef.current) {
      meshRef.current.position.y = position[1]
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.4}
      />
    </mesh>
  )
}