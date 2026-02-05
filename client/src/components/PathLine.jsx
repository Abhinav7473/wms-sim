import { Line } from '@react-three/drei'

export default function PathLine({ start, end, color = '#ffaa00' }) {
  const points = [
    [start[0], 0.3, start[2]],
    [end[0], 0.3, end[2]]
  ]
  
  return (
    <Line
      points={points}
      color={color}
      lineWidth={3}
      dashed={true}
      dashScale={2}
    />
  )
}