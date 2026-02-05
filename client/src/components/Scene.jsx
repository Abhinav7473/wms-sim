import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import WarehouseFloor from './WarehouseFloor'
import WarehouseStructure from './WarehouseStructure'
import Robot from './Robot'

export default function Scene({ robots }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[25, 25, 25]} fov={60} />
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.2}
      />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[20, 20, 10]} intensity={1} castShadow />
      <directionalLight position={[-20, 10, -10]} intensity={0.3} />
      
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