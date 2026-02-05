import { Line } from '@react-three/drei'
import { useMemo } from 'react'

export default function PathLine({ start, end, color = '#ffaa00' }) {
  const points = useMemo(() => {
    const [x1, y1, z1] = start
    const [x2, y2, z2] = end
    
    // Define clear aisle lanes between racks
    const AISLE_LANES = {
      left: -10,      // Left of all racks
      center: 3.5,    // Between rack columns
      right: 10       // Right of all racks
    }
    
    // Rack columns are at x = -7, 0, 7
    // Determine which aisle to use
    const startInLeft = x1 < -7
    const startInCenter = x1 >= -7 && x1 <= 7
    const startInRight = x1 > 7
    
    const endInLeft = x2 < -7
    const endInCenter = x2 >= -7 && x2 <= 7
    const endInRight = x2 > 7
    
    const path = []
    
    // Case 1: Both in same zone - direct path
    if ((startInLeft && endInLeft) || (startInRight && endInRight)) {
      path.push([x1, 0.3, z1])
      path.push([x2, 0.3, z2])
    }
    // Case 2: Start in left/right, end in center (or vice versa)
    else if ((startInLeft && endInCenter) || (endInLeft && startInCenter)) {
      const aisle = AISLE_LANES.left
      path.push([x1, 0.3, z1])
      path.push([x1, 0.3, aisle])  // Move to aisle
      path.push([x2, 0.3, aisle])  // Travel along aisle
      path.push([x2, 0.3, z2])     // Move to destination
    }
    else if ((startInRight && endInCenter) || (endInRight && startInCenter)) {
      const aisle = AISLE_LANES.right
      path.push([x1, 0.3, z1])
      path.push([x1, 0.3, aisle])  // Move to aisle
      path.push([x2, 0.3, aisle])  // Travel along aisle
      path.push([x2, 0.3, z2])     // Move to destination
    }
    // Case 3: Crossing between left and right zones
    else if ((startInLeft && endInRight) || (startInRight && endInLeft)) {
      const aisle = z1 < 0 ? AISLE_LANES.left : AISLE_LANES.right
      path.push([x1, 0.3, z1])
      path.push([x1, 0.3, aisle])
      path.push([x2, 0.3, aisle])
      path.push([x2, 0.3, z2])
    }
    // Default: rectangular path
    else {
      path.push([x1, 0.3, z1])
      path.push([x1, 0.3, z2])
      path.push([x2, 0.3, z2])
    }
    
    return path
  }, [start, end])

  return (
    <Line
      points={points}
      color={color}
      lineWidth={2.5}
      dashed={true}
      dashScale={2}
      dashSize={0.4}
      gapSize={0.3}
      transparent={true}
      opacity={0.5}
    />
  )
}