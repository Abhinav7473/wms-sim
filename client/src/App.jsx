import React, { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Grid, PerspectiveCamera } from '@react-three/drei'
import axios from 'axios'
import './App.css'

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
      <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={50} />
      <OrbitControls 
        enableDamping 
        dampingFactor={0.05}
        minDistance={5}
        maxDistance={50}
      />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      
      <WarehouseFloor />
      
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

export default App
