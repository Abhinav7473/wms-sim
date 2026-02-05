import { useGLTF } from '@react-three/drei'

export default function ShelfModel({ position, rotation = [0, 0, 0], scale = 1 }) {
  const { scene } = useGLTF('/models/Shelves/scene.gltf')
  
  // Convert single number to array [x, y, z]
  const finalScale = typeof scale === 'number' ? [scale, scale, scale] : scale
  
  return (
    <primitive 
      object={scene.clone()} 
      position={position} 
      rotation={rotation}
      scale={finalScale}
    />
  )
}

useGLTF.preload('/models/Shelves/scene.gltf')