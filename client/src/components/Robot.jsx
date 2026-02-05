import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

export default function Robot({ position, status, id, current_task }) {
  const meshRef = useRef()
  const groupRef = useRef()
  const [isMoving, setIsMoving] = useState(false)
  
  const color = {
    idle: '#00ff00',
    moving: '#ffaa00',
    picking: '#0088ff',
    error: '#ff0000'
  }[status] || '#ffffff'

  useFrame((state) => {
    if (meshRef.current) {
      if (status === 'moving') {
        // Bounce animation
        meshRef.current.position.y = 0.4 + Math.sin(state.clock.elapsedTime * 5) * 0.12
      } else {
        meshRef.current.position.y = 0.4
      }
    }
  })

  return (
    <group ref={groupRef} position={position}>
      <mesh ref={meshRef}>
        <boxGeometry args={[0.7, 0.7, 0.7]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.7}
          metalness={0.5}
          roughness={0.3}
        />
      </mesh>
      
      <Text
        position={[0, 1.3, 0]}
        fontSize={0.28}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.03}
        outlineColor="#000000"
      >
        {id}
      </Text>
    </group>
  )
}