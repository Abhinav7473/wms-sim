import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import ForkliftModel from './models/ForkliftModel'

export default function Robot({ position, status, id }) {
  const groupRef = useRef()
  
  const color = {
    idle: '#00ff00',
    moving: '#ffaa00',
    picking: '#0088ff',
    error: '#ff0000'
  }[status] || '#ffffff'

  useFrame((state) => {
    if (groupRef.current && status === 'moving') {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 5) * 0.08
    } else if (groupRef.current) {
      groupRef.current.position.y = position[1]
    }
  })

  return (
    <group ref={groupRef} position={position}>
      {/* Use actual forklift model */}
      <ForkliftModel 
        position={[0, 0, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={0.5}
      />
      
      {/* Status light above */}
      <mesh position={[0, 2, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={2}
        />
      </mesh>
      
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.3}
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