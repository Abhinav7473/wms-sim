import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import WarehouseStructure from './WarehouseStructure'
import Robot from './Robot'
import Floor from './Floor'

export default function Scene({ robots }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[35, 25, 35]} fov={60} />
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={10}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.2}
        enableRotate={true}    // ✅ Enable rotation
        enablePan={true}        // ✅ Enable panning
        enableZoom={true}       // ✅ Enable zoom
        rotateSpeed={0.5}       // Adjust rotation sensitivity
        panSpeed={0.8}          // Adjust pan sensitivity
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
      <Environment preset="warehouse" />

      <Floor />
      <WarehouseStructure />

      {/* FORKLIFTS (Robots) */}
      {robots.map(robot => (
        <Robot 
          key={robot.id}
          position={robot.position}
          status={robot.status}
          id={robot.id}
        />
      ))}
    </>
  )
}