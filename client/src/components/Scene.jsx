import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei'
import StorageRack from './StorageRack'
import Robot from './Robot'
import Floor from './Floor'
import ZoneLabel from './ZoneLabel'
import TruckModel from './models/TruckModel'

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
      />

      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 20, 10]} intensity={1} castShadow />
      <Environment preset="warehouse" />

      <Floor />

      {/* Zone Labels */}
      <ZoneLabel position={[0, 0.1, 15]} text="RECEIVING" color="#4CAF50" />
      <ZoneLabel position={[0, 0.1, 0]} text="STORAGE" color="#2196F3" />
      <ZoneLabel position={[0, 0.1, -15]} text="SHIPPING" color="#FF9800" />

      {/* Storage Racks - Groups of 3 */}
      {[-12, -4, 4, 12].map(x => 
        [-6, 2].map(z => (
          <group key={`rack-group-${x}-${z}`} position={[x, 0, z]}>
            <StorageRack position={[-2, 0, 0]} />
            <StorageRack position={[0, 0, 0]} />
            <StorageRack position={[2, 0, 0]} />
          </group>
        ))
      )}

      {/* TRUCKS at Shipping - BIGGER and MORE VISIBLE */}
      <TruckModel 
        position={[-12, 0, -16]} 
        rotation={[0, 0, 0]} 
        scale={0.05}  // Much bigger
      />
      <TruckModel 
        position={[-4, 0, -16]} 
        rotation={[0, 0, 0]} 
        scale={0.05}
      />
      <TruckModel 
        position={[4, 0, -16]} 
        rotation={[0, 0, 0]} 
        scale={0.05}
      />
      <TruckModel 
        position={[12, 0, -16]} 
        rotation={[0, 0, 0]} 
        scale={0.05}
      />

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