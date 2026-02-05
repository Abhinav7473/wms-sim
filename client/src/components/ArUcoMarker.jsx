import { Text } from '@react-three/drei'

export default function ArUcoMarker({ position, id }) {
  return (
    <group position={[position[0], 0.06, position[2]]}>
      {/* White background */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Black border frame */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[0.32, 0.4, 4]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* ArUco pattern (simplified) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.15, 0.002, -0.15]}>
        <planeGeometry args={[0.12, 0.12]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.15, 0.002, -0.15]}>
        <planeGeometry args={[0.12, 0.12]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0.15]}>
        <planeGeometry args={[0.2, 0.1]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      
      {/* Large ID text */}
      <Text
        position={[0, 0.003, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.25}
        color="#00ff00"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {id}
      </Text>
    </group>
  )
}