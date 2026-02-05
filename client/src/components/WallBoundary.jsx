export default function WallBoundary({ position, size }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color="#1a1a2e" 
        transparent 
        opacity={0.4}
      />
    </mesh>
  )
}