import { Grid } from '@react-three/drei'

export default function WarehouseFloor() {
  return (
    <group>
      <Grid args={[50, 50]} cellSize={1} cellColor="#444444" sectionColor="#666666" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}