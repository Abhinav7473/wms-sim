import StorageRack from './StorageRack'
import ZoneMarker from './ZoneMarker'
import ZoneLabel from './ZoneLabel'
import WallBoundary from './WallBoundary'

export default function WarehouseStructure() {
  return (
    <group>
      {/* Receiving Zone */}
      <ZoneMarker position={[-15, 0, 0]} size={[10, 20]} color="#ff4444" />
      <ZoneLabel position={[-15, 0.1, 0]} text="RECEIVING" color="#ff6666" />
      
      {/* Storage Zone */}
      <ZoneMarker position={[0, 0, 0]} size={[20, 30]} color="#4444ff" />
      <ZoneLabel position={[0, 0.1, -12]} text="STORAGE" color="#6666ff" />
      
      {/* Storage Racks */}
      <StorageRack position={[-7, 1.5, -10]} />
      <StorageRack position={[-7, 1.5, -5]} />
      <StorageRack position={[-7, 1.5, 0]} />
      <StorageRack position={[-7, 1.5, 5]} />
      
      <StorageRack position={[0, 1.5, -10]} />
      <StorageRack position={[0, 1.5, -5]} />
      <StorageRack position={[0, 1.5, 5]} />
      <StorageRack position={[0, 1.5, 10]} />
      
      <StorageRack position={[7, 1.5, -10]} />
      <StorageRack position={[7, 1.5, -5]} />
      <StorageRack position={[7, 1.5, 0]} />
      <StorageRack position={[7, 1.5, 5]} />
      
      {/* Picking Zone */}
      <ZoneMarker position={[15, 0, 5]} size={[10, 15]} color="#44ff44" />
      <ZoneLabel position={[15, 0.1, 5]} text="PICKING" color="#66ff66" />
      
      {/* Shipping Zone */}
      <ZoneMarker position={[15, 0, -10]} size={[10, 10]} color="#ffaa00" />
      <ZoneLabel position={[15, 0.1, -10]} text="SHIPPING" color="#ffcc44" />
      
      {/* Walls */}
      <WallBoundary position={[0, 1.5, -17]} size={[50, 3, 0.2]} />
      <WallBoundary position={[0, 1.5, 17]} size={[50, 3, 0.2]} />
      <WallBoundary position={[-25, 1.5, 0]} size={[0.2, 3, 34]} />
      <WallBoundary position={[25, 1.5, 0]} size={[0.2, 3, 34]} />
    </group>
  )
}