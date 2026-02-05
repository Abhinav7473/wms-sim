export default function DeliveryTruck({ position }) {
  return (
    <group position={position} rotation={[0, Math.PI / 4, 0]}>
      {/* Truck body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.5, 1.5, 1.2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      
      {/* Truck cab */}
      <mesh position={[-1.5, 0.9, 0]}>
        <boxGeometry args={[0.8, 1.3, 1.2]} />
        <meshStandardMaterial color="#ff6b6b" />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-1.2, 0.2, 0.7]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-1.2, 0.2, -0.7]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.8, 0.2, 0.7]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[0.8, 0.2, -0.7]} rotation={[0, 0, Math.PI/2]}>
        <cylinderGeometry args={[0.25, 0.25, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Cargo boxes in truck */}
      <mesh position={[0.3, 1.6, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#8b6914" />
      </mesh>
      <mesh position={[-0.2, 1.6, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#a0522d" />
      </mesh>
    </group>
  )
}