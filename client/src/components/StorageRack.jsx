function ShelfItems({ rackPosition, shelfY }) {
  const items = []
  for (let i = -1; i <= 1; i += 0.7) {
    items.push(
      <mesh key={i} position={[rackPosition[0] + i, rackPosition[1] + shelfY, rackPosition[2]]}>
        <boxGeometry args={[0.3, 0.3, 0.3]} />
        <meshStandardMaterial 
          color="#8b4513" 
          roughness={0.8}
        />
      </mesh>
    )
  }
  return <>{items}</>
}

export default function StorageRack({ position, size = [3, 3, 0.5] }) {
  return (
    <group position={position}>
      {/* Main rack structure */}
      <mesh>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#2a2a3e" />
      </mesh>
      
      {/* Shelves */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[size[0], 0.1, size[2]]} />
        <meshStandardMaterial color="#3a3a4e" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[size[0], 0.1, size[2]]} />
        <meshStandardMaterial color="#3a3a4e" />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[size[0], 0.1, size[2]]} />
        <meshStandardMaterial color="#3a3a4e" />
      </mesh>
      
      {/* Items on shelves */}
      <ShelfItems rackPosition={position} shelfY={-0.8} />
      <ShelfItems rackPosition={position} shelfY={0.2} />
      <ShelfItems rackPosition={position} shelfY={1.2} />
    </group>
  )
}