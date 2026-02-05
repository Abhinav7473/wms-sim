import { useGLTF } from '@react-three/drei'

export default function PalletModel({ position, rotation = [0, 0, 0], scale = 0.01 }) {
  const { scene } = useGLTF('/models/Pallet/scene.gltf')
  
  return (
    <primitive 
      object={scene.clone()} 
      position={position} 
      rotation={rotation}
      scale={scale}
    />
  )
}

useGLTF.preload('/models/Pallet/scene.gltf')