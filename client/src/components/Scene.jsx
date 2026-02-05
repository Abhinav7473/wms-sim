import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import WarehouseStructure from './WarehouseStructure'
import Robot from './Robot'
import WarehouseFloor from './WarehouseFloor'

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
        enableRotate={true}
        enablePan={true}
        enableZoom={true}
        rotateSpeed={0.5}
        panSpeed={0.8}
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
      <Environment preset="warehouse" />

      <WarehouseFloor />
      <WarehouseStructure />

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