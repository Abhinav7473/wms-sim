import { useGLTF } from '@react-three/drei'

export default function TruckModel({ position, rotation = [0, 0, 0], scale = 0.01 }) {
  const { scene } = useGLTF('/models/Truck/scene.gltf')
  
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

useGLTF.preload('/models/Truck/scene.gltf')