import { Text } from '@react-three/drei'

export default function ZoneLabel({ position, text, color }) {
  return (
    <Text
      position={[position[0], position[1] + 10, position[2]]}
      fontSize={1.5}
      color={color}
      anchorX="center"
      anchorY="middle"
      outlineWidth={0.1}
      outlineColor="#000000"
    >
      {text}
    </Text>
  )
}