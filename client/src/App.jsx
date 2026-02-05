import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, PerspectiveCamera } from '@react-three/drei'
import axios from 'axios'
import './App.css'
import * as THREE from 'three'

function Robot({ position, status, id }) {
  const color = {
    idle: '#00ff00',
    moving: '#ffaa00',
    picking: '#0088ff',
    error: '#ff0000'
  }[status] || '#ffffff'

  return (
    <mesh position={position}>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial color={color} />
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
      <PerspectiveCamera makeDefault position={[20, 20, 20]} fov={50} />
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
        label="Receiving"
      />
      
      {/* Storage Zone (Blue) - Center with racks */}
      <ZoneMarker 
        position={[0, 0, 0]} 
        size={[20, 30]} 
        color="#4444ff" 
        label="Storage"
      />
      
      {/* Storage Racks - Grid pattern */}
      {/* Row 1 */}
      <StorageRack position={[-5, 1.5, -8]} size={[3, 3, 0.5]} />
      <StorageRack position={[0, 1.5, -8]} size={[3, 3, 0.5]} />
      <StorageRack position={[5, 1.5, -8]} size={[3, 3, 0.5]} />
      
      {/* Row 2 */}
      <StorageRack position={[-5, 1.5, -4]} size={[3, 3, 0.5]} />
      <StorageRack position={[0, 1.5, -4]} size={[3, 3, 0.5]} />
      <StorageRack position={[5, 1.5, -4]} size={[3, 3, 0.5]} />
      
      {/* Row 3 */}
      <StorageRack position={[-5, 1.5, 0]} size={[3, 3, 0.5]} />
      <StorageRack position={[0, 1.5, 0]} size={[3, 3, 0.5]} />
      <StorageRack position={[5, 1.5, 0]} size={[3, 3, 0.5]} />
      
      {/* Row 4 */}
      <StorageRack position={[-5, 1.5, 4]} size={[3, 3, 0.5]} />
      <StorageRack position={[0, 1.5, 4]} size={[3, 3, 0.5]} />
      <StorageRack position={[5, 1.5, 4]} size={[3, 3, 0.5]} />
      
      {/* Picking Zone (Green) - Right side */}
      <ZoneMarker 
        position={[15, 0, 5]} 
        size={[10, 15]} 
        color="#44ff44" 
        label="Picking"
      />
      
      {/* Shipping Zone (Yellow) - Bottom right */}
      <ZoneMarker 
        position={[15, 0, -10]} 
        size={[10, 10]} 
        color="#ffaa00" 
        label="Shipping"
      />
      
      {/* Warehouse walls */}
      <WallBoundary position={[0, 1.5, -15]} size={[50, 3, 0.2]} />
      <WallBoundary position={[0, 1.5, 15]} size={[50, 3, 0.2]} />
      <WallBoundary position={[-25, 1.5, 0]} size={[0.2, 3, 30]} />
      <WallBoundary position={[25, 1.5, 0]} size={[0.2, 3, 30]} />
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

export default App
