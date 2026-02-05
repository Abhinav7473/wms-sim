import StorageRack from './StorageRack'
import ZoneMarker from './ZoneMarker'
import ZoneLabel from './ZoneLabel'
import WallBoundary from './WallBoundary'
import ArUcoMarker from './ArUcoMarker'
import CargoBox from './CargoBox'
import DeliveryTruck from './DeliveryTruck'

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
      
      {/* ArUco Markers on floor */}
      {arUcoPositions.map(marker => (
        <ArUcoMarker key={marker.id} position={marker.pos} id={marker.id} />
      ))}

      {/* Receiving zone cargo (different sizes) */}
      <CargoBox position={[-18, 0.3, 2]} size={[0.6, 0.6, 0.6]} color="#a0522d" />
      <CargoBox position={[-16, 0.4, 3]} size={[0.8, 0.8, 0.5]} color="#8b6914" />
      <CargoBox position={[-17, 0.35, -2]} size={[0.7, 0.7, 0.7]} color="#9a7b4f" />
      <CargoBox position={[-15, 0.25, 0]} size={[0.5, 0.5, 0.5]} color="#a0522d" />

      {/* Picking zone cargo (smaller items) */}
      <CargoBox position={[13, 0.2, 6]} size={[0.4, 0.4, 0.4]} color="#cd853f" />
      <CargoBox position={[14, 0.25, 8]} size={[0.5, 0.5, 0.3]} color="#daa520" />
      <CargoBox position={[16, 0.2, 7]} size={[0.4, 0.4, 0.4]} color="#b8860b" />
      
      {/* Delivery Truck in Shipping zone */}
      <DeliveryTruck position={[17, 0, -8]} />
      <DeliveryTruck position={[17, 0, -13]} />

      {/* Walls */}
      <WallBoundary position={[0, 1.5, -17]} size={[50, 3, 0.2]} />
      <WallBoundary position={[0, 1.5, 17]} size={[50, 3, 0.2]} />
      <WallBoundary position={[-25, 1.5, 0]} size={[0.2, 3, 34]} />
      <WallBoundary position={[25, 1.5, 0]} size={[0.2, 3, 34]} />
    </group>
  )
}