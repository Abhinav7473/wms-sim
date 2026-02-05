function ShelfItems({ shelfY }) {
  const items = []
  const boxSize = 0.22
  
  // Place boxes at different x positions along the shelf width
  for (let i = -1; i <= 1; i += 0.7) {
    items.push(
      <mesh 
        key={i} 
        position={[i * 0.8, shelfY + 0.12, -0.05]} // Position relative to shelf
      >
        <boxGeometry args={[boxSize, boxSize, boxSize]} />
        <meshStandardMaterial 
          color="#8b6914"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    )
  }
  return <>{items}</>
}

export default function StorageRack({ position, size = [3, 3, 0.5] }) {
  return (
    <group position={position}>
      {/* Back panel */}
      <mesh position={[0, 0, -0.25]}>
        <boxGeometry args={[size[0], size[1], 0.05]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      
      {/* Bottom shelf */}
      <mesh position={[0, -1.2, 0]}>
        <boxGeometry args={[size[0], 0.08, size[2]]} />
        <meshStandardMaterial color="#3a3a4e" />
      </mesh>
      <ShelfItems shelfY={-1.2} />
      
      {/* Middle shelf */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[size[0], 0.08, size[2]]} />
        <meshStandardMaterial color="#3a3a4e" />
      </mesh>
      <ShelfItems shelfY={-0.3} />
      
      {/* Top shelf */}
      <mesh position={[0, 0.6, 0]}>
        <boxGeometry args={[size[0], 0.08, size[2]]} />
        <meshStandardMaterial color="#3a3a4e" />
      </mesh>
      <ShelfItems shelfY={0.6} />
      
      {/* Side supports */}
      <mesh position={[-size[0]/2, 0, 0]}>
        <boxGeometry args={[0.1, size[1], size[2]]} />
        <meshStandardMaterial color="#2a2a3e" />
      </mesh>
      <mesh position={[size[0]/2, 0, 0]}>
        <boxGeometry args={[0.1, size[1], size[2]]} />
        <meshStandardMaterial color="#2a2a3e" />
      </mesh>
    </group>
  )
}