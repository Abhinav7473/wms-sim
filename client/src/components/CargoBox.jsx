export default function CargoBox({ position, size = [0.5, 0.5, 0.5], color = '#8b6914' }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color={color}
        roughness={0.8}
        metalness={0.1}
      />
      {/* Tape/label on box */}
      <mesh position={[0, size[1]/2 + 0.01, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[size[0] * 0.6, size[2] * 0.3]} />
        <meshStandardMaterial color="#ffcc00" />
      </mesh>
    </mesh>
  )
}