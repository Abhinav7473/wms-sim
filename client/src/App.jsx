import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, PerspectiveCamera } from '@react-three/drei'
import axios from 'axios'
import './App.css'
import * as THREE from 'three'
import { OrbitControls, Grid, PerspectiveCamera, Text } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function Robot({ position, status, id }) {
  const meshRef = useRef()
  
  const color = {
    idle: '#00ff00',
    moving: '#ffaa00',
    picking: '#0088ff',
    error: '#ff0000'
  }[status] || '#ffffff'

  // Animate moving robots
  useFrame((state) => {
    if (status === 'moving' && meshRef.current) {
      // Gentle bobbing animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[0.8, 0.8, 0.8]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

function WarehouseFloor() {
  return (
    <group>
      <Grid args={[50, 50]} cellSize={1} cellColor="#444444" sectionColor="#666666" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  )
}

function Scene({ robots }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[25, 25, 25]} fov={60} />
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={80}
        maxPolarAngle={Math.PI / 2.2}  // Prevent going below floor
      />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[20, 20, 10]} intensity={1} castShadow />
      <directionalLight position={[-20, 10, -10]} intensity={0.3} />
      
      <WarehouseFloor />
      <WarehouseStructure />
      
      {robots.map(robot => (
        <Robot 
          key={robot.id}
          position={robot.position}
          status={robot.status}
          id={robot.id}
        />
      ))}
    </>
  )
}

function RobotPanel({ robots }) {
  return (
    <div className="robot-panel">
      <h2>Robot Status</h2>
      <div className="robot-list">
        {robots.map(robot => (
          <div key={robot.id} className="robot-card">
            <div className="robot-header">
              <span className="robot-id">{robot.id}</span>
              <span className={`status-badge status-${robot.status}`}>
                {robot.status}
              </span>
            </div>
            <div className="robot-details">
              <div>Battery: {robot.battery}%</div>
              <div>Position: ({robot.position[0].toFixed(1)}, {robot.position[2].toFixed(1)})</div>
              {robot.current_task && <div>Task: {robot.current_task}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [robots, setRobots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/robots/')
        setRobots(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch robots:', err)
        setError('Failed to connect to backend. Make sure FastAPI is running on port 8000.')
        setLoading(false)
        
        setRobots([
          { id: 'R001', position: [0, 0, 0], status: 'idle', battery: 85, current_task: null, aruco_marker_id: 1 },
          { id: 'R002', position: [5, 0, 3], status: 'moving', battery: 72, current_task: 'PICK-A123', aruco_marker_id: 2 },
          { id: 'R003', position: [-3, 0, -2], status: 'picking', battery: 91, current_task: 'PICK-B456', aruco_marker_id: 3 },
        ])
      }
    }

    fetchRobots()
    const interval = setInterval(fetchRobots, 2000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div className="loading">Loading warehouse data...</div>
  }

  return (
    <div className="app">
      <header className="header">
        <h1>WMS Digital Twin</h1>
        <div className="header-stats">
          <span>Active Robots: {robots.length}</span>
          <span>•</span>
          <span>Real-time Sync</span>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          ⚠️ {error} (Using mock data)
        </div>
      )}

      <div className="main-container">
        <div className="canvas-container">
          <Canvas shadows>
            <Scene robots={robots} />
          </Canvas>
        </div>
        
        <RobotPanel robots={robots} />
      </div>
    </div>
  )
}

// Warehouse rack/shelf component
function StorageRack({ position, size = [2, 3, 0.3] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#2a2a3e" />
      {/* Rack shelves */}
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[size[0], 0.1, size[2]]} />
        <meshStandardMaterial color="#3a3a4e" />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[size[0], 0.1, size[2]]} />
        <meshStandardMaterial color="#3a3a4e" />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[size[0], 0.1, size[2]]} />
        <meshStandardMaterial color="#3a3a4e" />
      </mesh>
    </mesh>
  )
}

// Zone marker (colored floor area)
function ZoneMarker({ position, size, color, label }) {
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <planeGeometry args={size} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.2}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Zone border */}
      <lineSegments>
        <edgesGeometry attach="geometry" args={[new THREE.PlaneGeometry(...size)]} />
        <lineBasicMaterial attach="material" color={color} />
      </lineSegments>
    </group>
  )
}

// Complete warehouse layout
function WarehouseStructure() {
  return (
    <group>
      {/* Receiving Zone (Red) - Left side */}
      <ZoneMarker 
        position={[-15, 0, 0]} 
        size={[10, 20]} 
        color="#ff4444" 
      />
      <ZoneLabel position={[-15, 0.1, 0]} text="RECEIVING" color="#ff6666" />
      
      {/* Storage Zone (Blue) - Center with racks */}
      <ZoneMarker 
        position={[0, 0, 0]} 
        size={[20, 30]} 
        color="#4444ff" 
      />
      <ZoneLabel position={[0, 0.1, -12]} text="STORAGE" color="#6666ff" />
      
      {/* Storage Racks - Reorganized for better navigation */}
      {/* Left column */}
      <StorageRack position={[-7, 1.5, -10]} size={[3, 3, 0.5]} />
      <StorageRack position={[-7, 1.5, -5]} size={[3, 3, 0.5]} />
      <StorageRack position={[-7, 1.5, 0]} size={[3, 3, 0.5]} />
      <StorageRack position={[-7, 1.5, 5]} size={[3, 3, 0.5]} />
      
      {/* Center column */}
      <StorageRack position={[0, 1.5, -10]} size={[3, 3, 0.5]} />
      <StorageRack position={[0, 1.5, -5]} size={[3, 3, 0.5]} />
      <StorageRack position={[0, 1.5, 5]} size={[3, 3, 0.5]} />
      <StorageRack position={[0, 1.5, 10]} size={[3, 3, 0.5]} />
      
      {/* Right column */}
      <StorageRack position={[7, 1.5, -10]} size={[3, 3, 0.5]} />
      <StorageRack position={[7, 1.5, -5]} size={[3, 3, 0.5]} />
      <StorageRack position={[7, 1.5, 0]} size={[3, 3, 0.5]} />
      <StorageRack position={[7, 1.5, 5]} size={[3, 3, 0.5]} />
      
      {/* Picking Zone (Green) - Right side */}
      <ZoneMarker 
        position={[15, 0, 5]} 
        size={[10, 15]} 
        color="#44ff44" 
      />
      <ZoneLabel position={[15, 0.1, 5]} text="PICKING" color="#66ff66" />
      
      {/* Shipping Zone (Yellow) - Bottom right */}
      <ZoneMarker 
        position={[15, 0, -10]} 
        size={[10, 10]} 
        color="#ffaa00" 
      />
      <ZoneLabel position={[15, 0.1, -10]} text="SHIPPING" color="#ffcc44" />
      
      {/* Warehouse walls */}
      <WallBoundary position={[0, 1.5, -17]} size={[50, 3, 0.2]} />
      <WallBoundary position={[0, 1.5, 17]} size={[50, 3, 0.2]} />
      <WallBoundary position={[-25, 1.5, 0]} size={[0.2, 3, 34]} />
      <WallBoundary position={[25, 1.5, 0]} size={[0.2, 3, 34]} />
    </group>
  )
}

// Wall component
function WallBoundary({ position, size }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial 
        color="#1a1a2e" 
        transparent 
        opacity={0.4}
        wireframe={false}
      />
    </mesh>
  )
}

// 3D Text label for zones
function ZoneLabel({ position, text, color }) {
  return (
    <Text
      position={position}
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

export default App
