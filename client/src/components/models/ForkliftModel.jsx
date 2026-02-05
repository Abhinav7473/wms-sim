import { useGLTF } from '@react-three/drei'

export default function ForkliftModel({ position, rotation, scale = 0.01, color }) {
  const { scene } = useGLTF('/models/Forklift/scene.gltf')
  
  return (
    <primitive 
      object={scene.clone()} 
      position={position} 
      rotation={rotation}
      scale={scale}
    />
  )
}

// Preload the model
useGLTF.preload('/models/Forklift/scene.gltf')