import ShelfModel from './models/ShelfModel'

export default function StorageRack({ position }) {
  return (
    <group position={position}>
      <ShelfModel 
        position={[0, 0, 0]} 
        scale={0.02}  // BIGGER shelves
      />
    </group>
  )
}