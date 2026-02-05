import StorageRack from './StorageRack'
import ZoneMarker from './ZoneMarker'
import ZoneLabel from './ZoneLabel'
import WallBoundary from './WallBoundary'
import ArUcoMarker from './ArUcoMarker'
import TruckModel from './models/TruckModel'
import BoxModel from './models/BoxModel'

export default function WarehouseStructure() {
  // ArUco marker positions (one per storage location)
  const arUcoPositions = [
    { id: 'M01', pos: [-7, 0, -10] },
    { id: 'M02', pos: [-7, 0, -5] },
    { id: 'M03', pos: [-7, 0, 0] },
    { id: 'M04', pos: [-7, 0, 5] },
    { id: 'M05', pos: [0, 0, -10] },
    { id: 'M06', pos: [0, 0, -5] },
    { id: 'M07', pos: [0, 0, 5] },
    { id: 'M08', pos: [0, 0, 10] },
    { id: 'M09', pos: [7, 0, -10] },
    { id: 'M10', pos: [7, 0, -5] },
    { id: 'M11', pos: [7, 0, 0] },
    { id: 'M12', pos: [7, 0, 5] },
  ]

  return (
    <group>
      {/* Zones */}
      <ZoneMarker position={[-15, 0, 0]} size={[10, 20]} color="#ff4444" />
      <ZoneLabel position={[-15, 0.1, 0]} text="RECEIVING" color="#ff6666" />
      
      <ZoneMarker position={[0, 0, 0]} size={[20, 30]} color="#4444ff" />
      <ZoneLabel position={[0, 0.1, -12]} text="STORAGE" color="#6666ff" />
      
      <ZoneMarker position={[15, 0, 5]} size={[10, 15]} color="#44ff44" />
      <ZoneLabel position={[15, 0.1, 5]} text="PICKING" color="#66ff66" />
      
      <ZoneMarker position={[15, 0, -10]} size={[10, 10]} color="#ffaa00" />
      <ZoneLabel position={[15, 0.1, -10]} text="SHIPPING" color="#ffcc44" />
      
      {/* Storage Racks - adjusted Y to sit on ground */}
      <StorageRack position={[-7, 0, -10]} />
      <StorageRack position={[-7, 0, -5]} />
      <StorageRack position={[-7, 0, 0]} />
      <StorageRack position={[-7, 0, 5]} />
      
      <StorageRack position={[0, 0, -10]} />
      <StorageRack position={[0, 0, -5]} />
      <StorageRack position={[0, 0, 5]} />
      <StorageRack position={[0, 0, 10]} />
      
      <StorageRack position={[7, 0, -10]} />
      <StorageRack position={[7, 0, -5]} />
      <StorageRack position={[7, 0, 0]} />
      <StorageRack position={[7, 0, 5]} />
      
      {/* ArUco Markers on floor */}
      {arUcoPositions.map(marker => (
        <ArUcoMarker key={marker.id} position={marker.pos} id={marker.id} />
      ))}

      {/* Receiving zone cargo - using BoxModel */}
      <BoxModel position={[-18, 0.3, 2]} scale={0.015} />
      <BoxModel position={[-16, 0.4, 3]} scale={0.018} />
      <BoxModel position={[-17, 0.35, -2]} scale={0.016} />
      <BoxModel position={[-15, 0.25, 0]} scale={0.012} />

      {/* Picking zone cargo - smaller boxes */}
      <BoxModel position={[13, 0.2, 6]} scale={0.01} />
      <BoxModel position={[14, 0.25, 8]} scale={0.012} />
      <BoxModel position={[16, 0.2, 7]} scale={0.01} />
      
      {/* Delivery Trucks in Shipping zone - MUCH BIGGER */}
      <TruckModel 
        position={[20, 0, -8]} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={0.5}  // 8x bigger!
      />
      <TruckModel 
        position={[20, 0, -13]} 
        rotation={[0, Math.PI / 2, 0]} 
        scale={0.5}  // 8x bigger!
      />

      {/* Walls */}
      <WallBoundary position={[0, 1.5, -17]} size={[50, 3, 0.2]} />
      <WallBoundary position={[0, 1.5, 17]} size={[50, 3, 0.2]} />
      <WallBoundary position={[-25, 1.5, 0]} size={[0.2, 3, 34]} />
      <WallBoundary position={[25, 1.5, 0]} size={[0.2, 3, 34]} />
    </group>
  )
}